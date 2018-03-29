import shuffle from 'lodash.shuffle';

let gameState = db.collection('gameId').doc('gameState');

function async setupLogic() {
  //Watch as one research station is placed in Atlanta.
  gameState.collection('cities').doc('Atlanta').update(
  "researchStation", true);

  //Watch as outbreaks and cure markers are placed (automatic)

  //Watch as the infection rate marker is placed.
  gameState.infectionRate.set(2);

  //Watch as the Infection cards are flipped. & Watch as cities are infected with disease cubes.
  await flipInfectionCards(gameState, 3);
  await flipInfectionCards(gameState, 2);
  await flipInfectionCards(gameState, 1);

  //Watch as each player receives a role. & Watch as the player pawns are placed in Atlanta.
  await locationAndRolePlacement(gameState);

  //Watch as the Epidemic cards are shuffled into the Player Deck.

  //Watch as cards are distributed according to the number of players.

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

async function locationAndRolePlacement(gameState) {
  gameState.collection('players').get()
  .then(playerSnapshots => playerSnapshots.docs.map(player => player.data()))
  .tap(players => {
    return Promise.all(players.map(player => {
      gameState.collection('players').doc(player.name).update('currentCity', 'Atlanta');
    }))
  })
  .then(players => {
    const gameRoles = shuffle(roles);
    return players.map((player, i) => assignRole(gameRoles[i], player))
  })
  .catch(console.error);
}

const roles = ["Contingency Planner", "Dispatcher", "Medic", "Operations Expert", "Quarantine Specialist", "Researcher", "Scientist"];

function assignRole(role, player) {
  gameState.collection('players').doc(player.name).update('role', role);
}
