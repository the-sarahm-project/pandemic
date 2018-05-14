import { doc, cities, unusedInfectionCards, unusedCityCards } from './index';

export const dummyState = {
  firestore: {
    data: {
      games: {
        [doc]: {
          epidemicCards: {
            EyaG5AHp7pJDUJtug6og: {
              name: 'Epidemic'
            },
            EyaG5AHp7pJDUJtug6oh: {
              name: 'Epidemic'
            },
            EyaG5AHp7pJDUJtug6oi: {
              name: 'Epidemic'
            },
            EyaG5AHp7pJDUJtug6oj: {
              name: 'Epidemic'
            }
          },
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
              currentCity: "Atlanta",
              currentHand: []
            },
            2: {
              name: "",
              active: false,
              role: "",
              currentCity: "Atlanta",
              currentHand: []
            },
            3: {
              name: "",
              active: false,
              role: "",
              currentCity: "Atlanta",
              currentHand: []
            },
            4: {
              name: "",
              active: false,
              role: "",
              currentCity: "Atlanta",
              currentHand: []
            }
          },
          cities: {
            ...cities,
            Algiers: {
              ...cities.Algiers,
              researchStation: true
            },
            Beijing: {
              ...cities.Beijing,
              researchStation: true
            }
          },
          unusedInfectionCards,
          unusedCityCards,
          infectionRate: 0, //the infection rate marker
          numOutbreaks: 0, //the outbreak rate marker
          remainingResearchStations: 6,
          currentTurn: 1,
          numPlayers: 4,
          difficultyLevel: 4,
          redDiseaseCubes: 24,
          blueDiseaseCubes: 24,
          yellowDiseaseCubes: 24,
          blackDiseaseCubes: 24,
          redCureMarker: false,
          blueCureMarker: false,
          yellowCureMarker: false,
          blackCureMarker: false,
        }
      }
    }
  }
};
