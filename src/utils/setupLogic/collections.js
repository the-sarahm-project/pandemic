import cities from './cities';
import unusedInfectionCards from './unusedInfectionCards';
import unusedCityCards from './unusedCityCards';

const collections = {
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
  cities
};

export default collections;
