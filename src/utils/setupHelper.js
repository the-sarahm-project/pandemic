/*--------- MISC HELPER FUNCTIONS ----------------------*/
//get data from a snapshot
export function getSnapshotData(snapshots) {
  return snapshots.docs.map(card => card.data());
}

//get docs from a collection
export function getCollectionDocs(gameState, collectionName) {
  return gameState.collection(collectionName).get().then(snapshots => snapshots.docs)
}

//add a research station to a city
function addResearchStation(cityName) {
  gameState.collection('cities').doc(cityName).update(
    "researchStation", true);
}

/*------------INFECT FIRST 9 CITIES ---------------------*/

//flip 1 infection card a certain number of cubes. --- > will this just be a field instead of a collection of cubes?
function addCubes(gameState, cityData, num) {
  return gameState.collection('cities').doc(cityData.name).collection('cubes').doc(cityData.color).update('count', num);
}

//move the card to the trashed Infection Cards pile
function addToTrashed(gameState, cityData) {
  return gameState.collection('trashedInfectionCards').doc(cityData.name).set(cityData);
}

//delete the card from unused
function removeFromUnused(gameState, cityData) {
  return gameState.collection('unusedCityCards').doc(cityData.name).delete();
}

//infect one city
async function infectOne(gameState, cityData, num) {
  await addCubes(gameState, cityData, num);
  await addToTrashed(gameState, cityData);
  await removeFromUnused(gameState, cityData);
}

export async function flipInfectionCards(gameState, num) {
  let snapshots = await gameState.collection('unusedInfectionCards').limit(3).get();
  let data = await getSnapshotData(snapshots);
  await Promise.all(data.map(data => infectOne(gameState, data, num)));
}

/*----------------- PLAYER DECK SETUP -------------------*/
//setting up player deck
export function getNumCards(difficultyLevel) {
  if (difficultyLevel === 'Introductory') {
    return 4;
  }
  else if (difficultyLevel === 'Standard') {
    return 5;
  }
  else if (difficultyLevel === 'Heroic') {
    return 6;
  }
}


/*-------------  PLAYER: LOCATION, ROLE, CARDS ---------*/
//existing roles in the game (7 total)
const roles = ["Contingency Planner", "Dispatcher", "Medic", "Operations Expert", "Quarantine Specialist", "Researcher", "Scientist"];

//assign a role to a player
function assignRole(role, player) {
  gameState.collection('players').doc(player.name).update('role', role);
}

//Place players in Atlanta and add their roles
async function locationAndRolePlacement(gameState, numPlayers) {
  //get the data for the players in the game
  let players = await gameState.collection('players').get().then(getSnapshotData);

  //update each player's location to Atlanta
  await players.forEach(player => gameState.collection('players').doc(player.name).update('currentCity', 'Atlanta'));

  //shuffle the roles & assign them
  const gameRoles = shuffle(roles);
  await players.forEach((player, i) => assignRole(gameRoles[i], player));

  return players;
}

//distribute cards to each player depending on the number of players
export async function distributeCards(playerDeck, players) {
  const numPlayers = Object.keys(players);
  const numCards = cardsPerPlayer(numPlayers);

  for (let i = 0; i < numPlayers; i++) {
    let currentHand = [];
    for (let j = 0; i < numCards; j++) {
      currentHand.push(playerDeck.pop());
    }
    await gameState.collection('players').doc(player.name).set({currentHand}, {merge: true})
  }
}

//calculate how many cards per player we're getting
function cardsPerPlayer(numPlayers) {
  if (numPlayers === 2 ) return 4;
  if (numPlayers === 3) return 3;
  if (numPlayers === 4) return 2;
}
