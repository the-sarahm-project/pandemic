import shuffle from 'lodash.shuffle';
import {flipInfectionCards, getSnapshotData, addResearchStation, locationAndRolePlacement, getCollectionDocs, distributeCards} from './setupHelper';

let gameState = db.collection('games').doc('gameState');

//pass in the game state, the number of players, the difficulty level
function async setupLogic(gameState, numPlayers, difficultyLevel) {
  //Watch as one research station is placed in Atlanta.
  addResearchStation('Atlanta');

  //Watch as outbreaks and cure markers are placed (automatic)

  //Watch as the infection rate marker is placed.
  gameState.update('infectionRate', 2);

  //Watch as the Infection cards are flipped. & Watch as cities are infected with disease cubes.
  await flipInfectionCards(gameState, 3);
  await flipInfectionCards(gameState, 2);
  await flipInfectionCards(gameState, 1);

  //Watch as each player receives a role. & Watch as the player pawns are placed in Atlanta.
  let players = await locationAndRolePlacement(gameState, numPlayers);

  //Watch as cards are distributed according to the number of players.


  //Watch as the Epidemic cards are shuffled into the Player Deck.
  await createPlayerDeck(gameState, players, difficultyLevel);

  //See my own hand and if host chooses, everyone else's current hand. (automatic)

  //Be able to see how many cards are in the discard pile (possibly inspect/search through them).

  //See who is automatically selected to go first.

}

function createPlayerDeck(gameState, players, difficultyLevel) {
  const numPlayers = Object.keys(players), numEpidemicCards = getNumCards(difficultyLevel);
  let playerDeck = [];

  //get the docs to get their references
  const cities = await getCollectionDocs(gameState, 'unusedCityCards');
  const events = await getCollectionDocs(gameState, 'unusedEventCards');

  //add the city and event cards into the deck, and shuffle the deck.
  cities.forEach(city => playerDeck.push(city.ref));
  events.forEach(event => playerDeck.push(event.ref));
  playerDeck = shuffle(playerDeck);

  //distribute x number of cards to each player
  await distributeCards(playerDeck, players);

  const epidemics = await getCollectionDocs(gameState, 'epidemicCards');
  const epCards = epidemics.slice(0, numEpidemicCards).map(epidemic => epidemic.ref);

  playerDeck = splitShuffle(playerDeck, numEpidemicCards, epCards);
  return gameState.set({playerDeck}, {merge: true});
}

//separate the cards in numEpidemicCards pile.
//shuffle those cards with the epidemic card.
//put them back together as your new deck.
function splitShuffle(playerDeck, numPiles, epCards) {
  const separatePiles = [];
  playerDeck.forEach((card, i) => {
    separatePiles[i % numPiles].push(card);
  })
  return separatePiles.map((pile, i) => playerDeck = shuffle(pile.push(epCards[i]))).reduce((accum, curr) => accum.concat(curr), []);
}

//reduce the call to 1 card and then i can just call it a number of times
// change refs to '/cities/Atlanta/...etc'
//add cubes as fields, like black: 0, etc. directly on the city.
