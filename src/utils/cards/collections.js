import { unusedInfectionCards, unusedCityCards, cities, cubes } from './index';

const collections = {
  cureMarkers: { //whether or not you have a cure
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
  unusedEventCards: {
    ResilientPopulation: {
      name: 'Resilient Population'
    },
    Airlift: {
      name: 'Airlift'
    },
    Forecast: {
      name: 'Forecast'
    },
    OneQuietNight: {
      name: 'One Quiet Night'
    },
    GovernmentGrant: {
      name: 'Government Grant'
    }
  },
  players: {
    1: {
      name: "",
      active: false,
      role: "",
      currentCity: "Atlanta"
    },
    2: {
      name: "",
      active: false,
      role: "",
      currentCity: "Atlanta"
    },
    3: {
      name: "",
      active: false,
      role: "",
      currentCity: "Atlanta"
    },
    4: {
      name: "",
      active: false,
      role: "",
      currentCity: "Atlanta"
    }
  },
  unusedInfectionCards,
  unusedCityCards,
  cities,
};

export default collections;
