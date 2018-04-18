/*
Certain collections will still need to be added in later:
usedCityCards
usedDiseaseCubes
usedEventCards
*/

import { shuffle } from 'lodash';

const init = (db, collections, numPlayers, difficultyLevel) => {
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
  const players = Object.keys(collections.players);
  const cities = Object.keys(collections.cities);
  const unusedInfectionCards = Object.keys(collections.unusedInfectionCards);
  const unusedCityCards = Object.keys(collections.unusedCityCards);

  //add remainingEpidemicCards
  for (let i=0;i<difficultyLevel;i++) {
    game.collection('epidemicCards').add({name: 'Epidemic'});
  }

  //add unusedEventCards
  unusedEventCards.forEach(unusedEventCard => {
    game.collection('unusedEventCards').doc(unusedEventCard).set(collections.unusedEventCards[unusedEventCard]);
  });

  //add players
  players.forEach(player => {
    game.collection('players').doc(player).set(collections.players[player]);
  });

  //add cities with cube counters
  cities.forEach(city => {
    game.collection('cities').doc(city).set({...collections.cities[city], red: 0, blue: 0, yellow: 0, black: 0});
  });

  //add unusedInfectionCards
  let insertOrder = 1;
  shuffle(unusedInfectionCards).forEach(unusedInfectionCard => {
    game.collection('unusedInfectionCards').doc(unusedInfectionCard).set({...collections.unusedInfectionCards[unusedInfectionCard], insertOrder: insertOrder++});
  });

  //add unusedCityCards
  unusedCityCards.forEach(unusedCityCard => {
    game.collection('unusedCityCards').doc(unusedCityCard).set(collections.unusedCityCards[unusedCityCard]);
  });
};

export default init;
