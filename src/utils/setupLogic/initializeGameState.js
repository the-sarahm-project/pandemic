/*
Certain collections will still need to be added in later:
usedCityCards
usedDiseaseCubes
usedEventCards
*/

import { shuffle } from 'lodash';
import { collections } from './index';

const init = (db, numPlayers, difficultyLevel) => {
  const game = db.collection('games').doc();
  game.set({
    infectionRate: 0, //the infection rate marker
    numOutbreaks: 0, //the outbreak rate marker
    remainingResearchStations: 6,
    currentTurn: Math.floor(Math.random() * numPlayers) + 1,
    numPlayers,
    difficultyLevel,
    redDiseaseCubes: 24,
    blueDiseaseCubes: 24,
    yellowDiseaseCubes: 24,
    blackDiseaseCubes: 24,
    redCureMarker: false,
    blueCureMarker: false,
    yellowCureMarker: false,
    blackCureMarker: false,
  });
  const unusedEventCards = Object.keys(collections.unusedEventCards);
  const cities = Object.keys(collections.cities);
  const unusedInfectionCards = Object.keys(collections.unusedInfectionCards);
  const unusedCityCards = Object.keys(collections.unusedCityCards);
  addRemainingEpidemicCards(game, difficultyLevel);
  addUnusedEventCards(game, unusedEventCards);
  addPlayers(game, numPlayers);
  addCities(game, cities);
  addUnusedInfectionCards(game, unusedInfectionCards);
  addUnusedCityCards(game, unusedCityCards);
  return game.id;
};

const addRemainingEpidemicCards = (game, difficultyLevel) => {
  for (let i = 0; i < difficultyLevel; i++) {
    game.collection('epidemicCards').add({
      name: 'Epidemic'
    });
  }
};

const addUnusedEventCards = (game, unusedEventCards) => {
  unusedEventCards.forEach(unusedEventCard => {
    game.collection('unusedEventCards').doc(unusedEventCard).set(collections.unusedEventCards[unusedEventCard]);
  });
};

const addPlayers = (game, numPlayers) => {
  //existing roles in the game (7 total)
  const roles = ['Contingency Planner', 'Dispatcher', 'Medic', 'Operations Expert', 'Quarantine Specialist', 'Researcher', 'Scientist'];
  const gameRoles = shuffle(roles);
  for (let i = 1; i <= numPlayers; i++) {
    const player = {
      name: "",
      role: gameRoles[i],
      currentCity: "Atlanta",
      currentHand: [],
      isMoving: false
    };
    game.collection('players').doc(`${i}`).set(player);
  }
};

const addCities = (game, cities) => {
  cities.forEach(city => {
    game.collection('cities').doc(city).set({ ...collections.cities[city],
      red: 0,
      blue: 0,
      yellow: 0,
      black: 0
    });
  });
};

const addUnusedInfectionCards = (game, unusedInfectionCards) => {
  let insertOrder = 1;
  shuffle(unusedInfectionCards).forEach(unusedInfectionCard => {
    game.collection('unusedInfectionCards').doc(unusedInfectionCard).set({ ...collections.unusedInfectionCards[unusedInfectionCard],
      insertOrder: insertOrder++
    });
  });
};

const addUnusedCityCards = (game, unusedCityCards) => {
  unusedCityCards.forEach(unusedCityCard => {
    game.collection('unusedCityCards').doc(unusedCityCard).set(collections.unusedCityCards[unusedCityCard]);
  });
};

export default init;
