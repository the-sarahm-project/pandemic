import { shuffle } from 'lodash';
/*--------------- MISC HELPER FUNCTIONS ----------------------*/

//get data (object) from a snapshot (object) through its docs (array)
export function getSnapshotData(snapshots) {
  return snapshots.docs.map(card => card.data());
}

//get docs (array) from a collection's snapshots (object)
export function getCollectionDocs(gameState, collectionName) {
  return gameState.collection(collectionName).get().then(snapshots => snapshots.docs).catch(console.error);
}

//add a research station to a city & subtract number of stations
export async function addResearchStation(gameState, cityName) {
  await gameState.collection('cities').doc(cityName).update('researchStation', true);
  await gameState.get().then(gameDoc => gameDoc.data()).then(gameData => gameState.update('remainingResearchStations', gameData.remainingResearchStations - 1));
}

//move the document to a collection
function addTo(gameState, cityRef, cityData, collection) {
  return gameState.collection(collection).doc(cityRef).set(cityData);
}

//delete the document from a collection
function removeFrom(gameState, cityRef, collection) {
  return gameState.collection(collection).doc(cityRef).delete();
}

/*-----------------INFECT FIRST 9 CITIES ---------------------*/

//flip 1 infection card a certain number of cubes, passing in the game state, the name of the city's document in its reference, the city's data object, and the number of cubes
function addCubes(gameState, docName, cityData, num) {
  return gameState.collection('cities').doc(docName).update(cityData.color, num);
}

//infect one city - obtain the reference name. Add the cubes to that city, add the card to the trashed pile and remove the card from the unused pile.
async function infectOne(gameState, cityData, num) {
  const docName = cityData.name.replace(/\W/g, '');
  await addCubes(gameState, docName, cityData, num);
  await addTo(gameState, docName, cityData, 'trashedInfectionCards');
  await removeFrom(gameState, docName, 'unusedInfectionCards');
}

//container function to flip a number of infection cards. Obtain the first 3 that were inputted.
export async function flipInfectionCards(gameState, num) {
  let snapshots = await gameState.collection('unusedInfectionCards').orderBy('insertOrder', 'desc').limit(3).get();
  let data = await getSnapshotData(snapshots);
  await Promise.all(data.map(data => infectOne(gameState, data, num)));
}

/*-------------  PLAYER: LOCATION, ROLE, CURRENT HAND ---------------*/

//Place players in Atlanta and add their roles
export async function locationAndRolePlacement(gameState, numPlayers) {
  //get the data for the players in the game
  let players = await gameState.collection('players').get().then(getSnapshotData);
  let playersDocs = await getCollectionDocs(gameState, 'players');
  return {players, playersDocs};
}

//distribute cards to each player depending on the number of players
export async function distributeCards(gameState, playerDeck, players, playersDocs) {
  const numPlayers = Object.keys(players).length;
  const numCards = cardsPerPlayer(numPlayers);
  for (let i = 0; i < numPlayers; i++) {
    let currentHand = [];
    for (let j = 0; j < numCards; j++) {
      currentHand.push(playerDeck.pop());
    }
    await playersDocs[i].ref.set({currentHand}, {merge: true});
  }
}

//calculate how many cards per player we're getting
function cardsPerPlayer(numPlayers) {
  if (numPlayers === 2 ) return 4;
  if (numPlayers === 3) return 3;
  if (numPlayers === 4) return 2;
}

/*-------------------CREATE PLAYER DECK ----------------------*/

export async function createPlayerDeck(gameState, players, difficultyLevel, playersDocs) {
  let playerDeck = [];

  //get the docs to get their references
  const cities = await getCollectionDocs(gameState, 'unusedCityCards');
  const events = await getCollectionDocs(gameState, 'unusedEventCards');

  //add the city and event cards into the deck, and shuffle the deck.
  cities.forEach(city => playerDeck.push(city.ref));
  events.forEach(event => playerDeck.push(event.ref));
  playerDeck = shuffle(playerDeck);

  //distribute x number of cards to each player
  await distributeCards(gameState, playerDeck, players, playersDocs);

  const epidemics = await getCollectionDocs(gameState, 'epidemicCards');
  //difficulty level is 4, 5, 6 to represent number of epidemic cards
  const epCards = epidemics.slice(0, difficultyLevel).map(epidemic => epidemic.ref);

  playerDeck = splitShuffle(playerDeck, difficultyLevel, epCards);
  await gameState.set({playerDeck}, {merge: true});
}

//separate the cards in numEpidemicCards pile.
//shuffle those cards with the epidemic card.
//put them back together as your new deck.
function splitShuffle(playerDeck, numPiles, epCards) {
  const separatePiles = [];
  playerDeck.forEach((card, i) => {
    separatePiles[i % numPiles] = separatePiles[i % numPiles] || [];
    separatePiles[i % numPiles].push(card);
  });

  return separatePiles.map((pile, i) => {
    pile.push(epCards[i]);
    return shuffle(pile);
  }).reduce((accum, curr) => accum.concat(curr), []);
}
