//game state PER GAME. The root of Firestore is going to have a game ID key, and this will be its value.
const gameState = {
  cities: {

  },
  infectionRate: 0,  //the infection rate marker
  numOutbreaks: 0, //the outbreak rate marker
  curesMarker: { //whether or not you have a cure
    red: false,
    blue: false,
    yellow: false,
    black: false
  },
  unusedDiseaseCubes: {
    red: 24,
    blue: 24,
    yellow: 24,
    black: 24
  }, //number of disease cubes left
  unusedInfectionCards: 48,
  trashedInfectionCards: 0,
  remainingCityCards: 48,
  remainingEpidemicCards: 6, //4 - 6 depending on level
  remainingEventCards: 5,
  users: {

  }
}

//Will the player cards and infection cards be an array of cards?
//Number of players will dictate number of cards per player.
