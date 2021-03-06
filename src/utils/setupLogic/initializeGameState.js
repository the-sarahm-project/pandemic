/*
Certain collections will still need to be added in later:
usedCityCards
usedDiseaseCubes
usedEventCards
*/

import { shuffle } from 'lodash';
import { collections } from './index';

const init = async (db, numPlayers, difficultyLevel) => {
  const game = await db.collection('games').doc();
  const unusedEventCards = Object.entries(collections.unusedEventCards);
  const cities = Object.entries(collections.cities);
  const unusedInfectionCards = Object.entries(collections.unusedInfectionCards);
  const unusedCityCards = Object.entries(collections.unusedCityCards);
  await setGameFields(game, numPlayers, difficultyLevel);
  await addRemainingEpidemicCards(game, difficultyLevel);
  await addUnusedEventCards(game, unusedEventCards);
  await addPlayers(game, numPlayers);
  await addCities(game, cities);
  await addUnusedInfectionCards(game, unusedInfectionCards);
  await addUnusedCityCards(game, unusedCityCards);
  return game.id;
};

const setGameFields = async (game, numPlayers, difficultyLevel) => {
  await game.set({
    actionsRemaining: 4,
    id: game.id,
    infectionRate: 0, //the infection rate marker
    numOutbreaks: 0, //the outbreak rate marker
    remainingResearchStations: 6,
    currentTurn: 1,
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
    governmentGrant: false,
    cpaction: false,
    quarantineCities: {},
    resilientPopulationModal: false
  });
};

const addRemainingEpidemicCards = async (game, difficultyLevel) => {
  const addEpidemicCards = new Array(difficultyLevel).fill();
  const epidemicCardsCollection = game.collection('epidemicCards');
  await Promise.all(addEpidemicCards.map((_, index) => {
    return epidemicCardsCollection.doc(`Epidemic${index}`).set({ name: 'Epidemic'});
  }));
};

const addUnusedEventCards = async (game, unusedEventCards) => {
  const unusedEventCardsCollection = game.collection('unusedEventCards');
  await Promise.all(unusedEventCards.map(unusedEventCard => {
    const [ eventCardKey, eventCardValue ] = unusedEventCard;
    return unusedEventCardsCollection.doc(eventCardKey).set(eventCardValue);
  }));
};

const addPlayers = async (game, numPlayers) => {
  //existing roles in the game (7 total)
  const roles = ['Contingency Planner', 'Dispatcher', 'Medic', 'Operations Expert', 'Quarantine Specialist', 'Researcher', 'Scientist'];
  const gameRoles = shuffle(roles);
  const playersCollection = game.collection('players');
  const newPlayer = {
    id: -1,
    name: "",
    role: "",
    currentCity: "Atlanta",
    currentHand: [],
    isMoving: false,
    active: false,
    uid: null
  };
  const players = new Array(numPlayers).fill(newPlayer);
  await Promise.all(players.map((player, index) => {
    let hasOESpecial = false;
    if (gameRoles[index] === 'Operations Expert') {
      hasOESpecial = true;
    } else if (gameRoles[index] === 'Medic') {
      game.update({ medicCurrentCity: 'Atlanta'});
    } else if (gameRoles[index] === 'Dispatcher') {
      game.update({ dispatchTarget: null });
    } else if (gameRoles[index] === 'Quarantine Specialist') {
      game.update({ quarantineCities: { Atlanta: true, Washington: true, Chicago: true, Miami: true }});
    }
    return playersCollection.doc(`${index + 1}`).set({
      ...player,
      id: index + 1,
      role: gameRoles[index],
      hasOESpecial
    });
  }));
};

const addCities = async (game, cities) => {
  await Promise.all(cities.map(city => {
    const [ cityKey, cityValue ] = city;
    return game.collection('cities').doc(cityKey).set(cityValue);
  }));
};

const addUnusedInfectionCards = async (game, unusedInfectionCards) => {
  let insertOrder = 0;
  const unusedInfectionCardsCollection = game.collection('unusedInfectionCards');
  const shuffledCards = shuffle(unusedInfectionCards);
  await Promise.all(shuffledCards.map(unusedInfectionCard => {
    const [ unusedInfectionCardKey, unusedInfectionCardValue ] = unusedInfectionCard;
    return unusedInfectionCardsCollection.doc(unusedInfectionCardKey).set({
      ...unusedInfectionCardValue,
      insertOrder: insertOrder++
    });
  }));
};

const addUnusedCityCards = async (game, unusedCityCards) => {
  const unusedCityCardsCollection = game.collection('unusedCityCards');
  await Promise.all(unusedCityCards.map(unusedCityCard => {
    const [ unusedCityCardKey, unusedCityCardValue ] = unusedCityCard;
    return unusedCityCardsCollection.doc(unusedCityCardKey).set(unusedCityCardValue);
  }));
};

// const addOneToGameCode = code => {
//   const newVal = (parseInt(code, 36) + 1) % 1679616; // 1679615 combinations of 4 letters/numbers.
//   return newVal.toString(36).padStart(4, 0); // fill with zeroes.
// };

export default init;
