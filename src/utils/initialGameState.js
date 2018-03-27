//game state PER GAME. The root of Firestore is going to have a game ID key, and this will be its value.
const gameState = {
  cities: {
    Algiers: {
      name: "Algiers",
      coords: [36.7538, 3.0588],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false,
      neighbors: []
    },
    Atlanta: {
      name: "Atlanta",
      coords: [33.7490, -84.3880],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Baghdad: {
      name: "Baghdad",
      coords: [33.3128, 44.3615],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Bangkok: {
      name: "Bangkok",
      coords: [13.7563, 100.5018],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Beijing: {
      name: "Beijing",
      coords: [39.9042, 116.4074],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Bogota: {
      name: "Bogota",
      coords: [4.7110, -74.0721],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    BuenosAires: {
      name: "Buenos Aries",
      coords: [-34.6037, -58.3816],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Cairo: {
      name: "Cairo",
      coords: [30.0444, 31.2357],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Chennai: {
      name: "Chennai",
      coords: [13.0827, 80.2707],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Chicago: {
      name: "Chicago",
      coords: [41.8781, -87.6298],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Delhi: {
      name: "Delhi",
      coords: [28.644800, 77.216721],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Essen: {
      name: "Essen",
      coords: [51.4556, 7.0116],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    HoChiMinhCity: {
      name: "Ho Chi Minh City",
      coords: [10.8231, 106.6297],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    HongKong: {
      name: "Hong Kong",
      coords: [22.3964, 114.1095],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Istanbul: {
      name: "Istanbul",
      coords: [41.0082, 28.9784],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Jakarta: {
      name: "Jakarta",
      coords: [-6.1751, 106.8650],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Johannesburg: {
      name: "Johannesburg",
      coords: [-26.2041, 28.0473],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Karachi: {
      name: "Karachi",
      coords: [25.0700, 67.2848],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Khartoum: {
      name: "Khartoum",
      coords: [15.5007, 32.5599],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Kinshasa: {
      name: "Kinshasa",
      coords: [-4.4419, 15.2663],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Kolkata: {
      name: "Kolkata",
      coords: [22.5726, 88.3639],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Lagos: {
      name: "Lagos",
      coords: [6.5244, 3.3792],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Lima: {
      name: "Lima",
      coords: [-12.0464, -77.0428],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    London: {
      name: "London",
      coords: [51.5074, -0.1278],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    LosAngeles: {
      name: "Los Angeles",
      coords: [34.0522, -118.2437],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Madrid: {
      name: "Madrid",
      coords: [40.4168, -3.7038],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Manila: {
      name: "Manila",
      coords: [14.5995, 120.9842],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    MexicoCity: {
      name: "Mexico City",
      coords: [19.4326, -99.1332],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Miami: {
      name: "Miami",
      coords: [25.7617, -80.1918],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Milan: {
      name: "Milan",
      coords: [45.4642, 9.1900],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Montreal: {
      name: "Montreal",
      coords: [45.5017, -73.5673],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Moscow: {
      name: "Moscow",
      coords: [55.7558, 37.6173],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Mumbai: {
      name: "Mumbai",
      coords: [19.0760, 72.8777],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    NewYork: {
      name: "New York",
      coords: [40.7128, -74.0060],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Osaka: {
      name: "Osaka",
      coords: [34.6937, 135.5022],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Paris: {
      name: "Paris",
      coords: [48.8566, 2.3522],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Riyadh: {
      name: "Riyadh",
      coords: [24.7136, 46.6753],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    SanFrancisco: {
      name: "San Francisco",
      coords: [37.7749, -122.4194],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Santiago: {
      name: "Santiago",
      coords: [-33.4489, -70.6693],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    SaoPaulo: {
      name: "Sao Paulo",
      coords: [-23.5505, -46.6333],
      icon: "yellowIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Seoul: {
      name: "Seoul",
      coords: [37.5665, 126.9780],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Shanghai: {
      name: "Shanghai",
      coords: [31.2304, 121.4737],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    StPetersburg: {
      name: "St. Petersburg",
      coords: [59.9343, 30.3351],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Sydney: {
      name: "Sydney",
      coords: [-33.8688, 151.2093],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Taipei: {
      name: "Taipei",
      coords: [25.0330, 121.5654],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Tehran: {
      name: "Tehran",
      coords: [35.6892, 51.3890],
      icon: "blackIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Tokyo: {
      name: "Tokyo",
      coords: [35.6895, 139.6917],
      icon: "redIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    },
    Washington: {
      name: "Washington",
      coords: [38.9072, -77.0369],
      icon: "blueIcon",
      cubes: {
        red: 0,
        blue: 0,
        yellow: 0,
        black: 0
      },
      researchStation: false
    }
  },
  infectionRate: 0, //the infection rate marker
  numOutbreaks: 0, //the outbreak rate marker
  curesMarker: { //whether or not you have a cure
    red: false,
    blue: false,
    yellow: false,
    black: false
  },
  remainingResearchStations: 6,
  unusedDiseaseCubes: {
    red: 24,
    blue: 24,
    yellow: 24,
    black: 24
  }, //number of disease cubes left
  unusedInfectionCards: {
    //infectioncards
  },
  trashedInfectionCards: {},
  remainingCityCards: 48,
  remainingEpidemicCards: 6, //4 - 6 depending on level
  remainingEventCards: 5,
  users: {
    1: {
      active: false,
      roll: '???',
      currentCity: 'Atlanta',

    }
  },


}

//Will the player cards and infection cards be an array of cards?
//Number of players will dictate number of cards per player.
