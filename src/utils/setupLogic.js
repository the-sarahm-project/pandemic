import {flipInfectionCards, getSnapshotData, addResearchStation, locationAndRolePlacement, getCollectionDocs, distributeCards, createPlayerDeck} from './setupHelper';

//let gameState = db.collection('games').doc('gameState');

//pass in the game state, the number of players, the difficulty level
async function setupLogic(gameState, numPlayers, difficultyLevel) {
  //Watch as one research station is placed in Atlanta.
  addResearchStation(gameState, 'Atlanta');

  //Watch as outbreaks and cure markers are placed (automatic)

  //Watch as the infection rate marker is placed.
  gameState.update('infectionRate', 2);

  //Watch as the Infection cards are flipped. & Watch as cities are infected with disease cubes.
  await flipInfectionCards(gameState, 3);
  await flipInfectionCards(gameState, 2);
  await flipInfectionCards(gameState, 1);

  //Watch as each player receives a role. & Watch as the player pawns are placed in Atlanta.
  let players = await locationAndRolePlacement(gameState, numPlayers);

  //Watch as cards are distributed according to the number of players. && Watch as the Epidemic cards are shuffled into the Player Deck.
  await createPlayerDeck(gameState, players, difficultyLevel);

  //See my own hand and if host chooses, everyone else's current hand. (automatic)

  //Be able to see how many cards are in the discard pile (possibly inspect/search through them).

  //See who is automatically selected to go first.

}

//add cubes as fields, like black: 0, etc. directly on the city.

export default setupLogic;
