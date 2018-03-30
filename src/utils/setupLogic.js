import shuffle from 'lodash.shuffle';

let gameState = db.collection('games').doc('gameState');

//pass in the game state, the number of players, the difficulty level
function async setupLogic(gameState, numPlayers, difficultyLevel) {
  //Watch as one research station is placed in Atlanta.
  gameState.collection('cities').doc('Atlanta').update(
  "researchStation", true);

  //Watch as outbreaks and cure markers are placed (automatic)

  //Watch as the infection rate marker is placed.
  gameState.update('infectionRate', 2);

  //Watch as the Infection cards are flipped. & Watch as cities are infected with disease cubes.
  await flipInfectionCards(gameState, 3);
  await flipInfectionCards(gameState, 2);
  await flipInfectionCards(gameState, 1);

  //Watch as the Epidemic cards are shuffled into the Player Deck.
  await createPlayerDeck(gameState, difficultyLevel);

  //Watch as cards are distributed according to the number of players. && Watch as each player receives a role. & Watch as the player pawns are placed in Atlanta.
  await locationAndRolePlacement(gameState, numPlayers);

  //See my own hand and if host chooses, everyone else's current hand.

  //Be able to see how many cards are in the discard pile (possibly inspect/search through them).

  //See who is automatically selected to go first.

}

async function flipInfectionCards(gameState, num) {
  gameState.collection('unusedInfectionCards').get()
  .then(cardSnapshots => {
    let firstThree = cardSnapshots.docs.filter((snapshot, i) => i < 3);
    return firstThree.map(card => card.data());
  })
  .tap(cards => {
    return Promise.all(cards.map(card => gameState.collection('cities').doc(card.name).collection('cubes').doc(card.color).update('count', num)));
  })
  .tap(cards => {
    return Promise.all(cards.map(card => gameState.collection('trashedInfectionCards').doc(card.name).set(card)))
  })
  .then(cards => {
    return Promise.all(cards.map(card => gameState.collection('unusedInfectionCards').doc(card.name).delete()));
  })
  .catch(console.error);
}

async function locationAndRolePlacement(gameState, numPlayers) {
  gameState.collection('players').get()
  .then(playerSnapshots => playerSnapshots.docs.map(player => player.data()))
  .tap(players => {
    return Promise.all(players.map(player => {
      gameState.collection('players').doc(player.name).update('currentCity', 'Atlanta');
    }))
  })
  .tap(players => {
    const gameRoles = shuffle(roles);
    return players.map((player, i) => assignRole(gameRoles[i], player))
  })
  .tap(players => {

  })
  .catch(console.error);
}

const roles = ["Contingency Planner", "Dispatcher", "Medic", "Operations Expert", "Quarantine Specialist", "Researcher", "Scientist"];

function assignRole(role, player) {
  gameState.collection('players').doc(player.name).update('role', role);
}

function createPlayerDeck(gameState, numPlayers) {
  var numEpidemicCards = 4;
  var playerDeck = [];
  if (difficultyLevel === 'Introductory') {
    numEpidemicCards = 4;
  }
  else if (difficultyLevel === 'Standard') {
    numEpidemicCards = 5;
  }
  else if (difficultyLevel === 'Heroic') {
    numEpidemicCards = 6;
  }
  //separate the cards in numEpidemicCards pile.
  //shuffle those cards with the epidemic card.
  //put them back together as your new deck.
  const cities = gameState.collection('unusedCityCards').get();
  const events = gameState.collection('unusedEventCards').get();
  const epidemics = gameState.collection('epidemicCards').get();
  Promise.all([cities, events, epidemics])
  .then(arr => Promise.all(arr.map(cardSnapshots => cardSnapshots.docs)))
  .spread((cities, events, epidemics) => {
    cities.forEach(city => playerDeck.push(city.ref));
    events.forEach(event => playerDeck.push(event.ref));

    const epCards = epidemics.splice(numEpidemicCards, 6 - numEpidemicCards).map(epidemic => epidemic.ref);

    playerDeck = splitShuffle(playerDeck, numEpidemicCards, epCards);
    return gameState.set({playerDeck}, {merge: true});
  })
  .catch(console.error);
}

function splitShuffle(playerDeck, numPiles, epCards) {
  playerDeck = shuffle(playerDeck);
  const separatePiles = [];
  playerDeck.forEach((card, i) => {
    separatePiles[i % numPiles].push(card);
  })
  return separatePiles.map((pile, i) => playerDeck = shuffle(pile.push(epCards[i]))).reduce((accum, curr) => accum.concat(curr), []);
}
