//game state PER GAME. The root of Firestore is going to have a game ID key, and this will be its value.
const gameState = {
  cities,
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
  unusedInfectionCards,
  trashedInfectionCards: {},
  unusedCityCards,
  remainingEpidemicCards: 6, //4 - 6 depending on level
  remainingEventCards: {
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
      active: true,
      roll: "",
      currentCity: "Atlanta",
      currentHand: {}
    },
    2: {
      name: "",
      active: false,
      roll: "",
      currentCity: "Atlanta",
      currentHand: {}
    },
    3: {
      name: "",
      active: false,
      roll: "",
      currentCity: "Atlanta",
      currentHand: {}
    },
    4: {
      name: "",
      active: false,
      roll: "",
      currentCity: "Atlanta",
      currentHand: {}
    }
  }
}

const cities = {
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
    neighbors: ["Cairo", "Instanbul", "Madrid", "Paris"]
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
    researchStation: false,
    neighbors: ["Chicago", "Miami", "Washington"]
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
    researchStation: false,
    neighbors: ["Cairo", "Karachi", "Istanbul", "Tehran"]
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
    researchStation: false,
    neighbors: ["Chennai", "HoChiMinhCity", "HongKong", "Jakarta", "Kolkata"]
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
    researchStation: false,
    neighbors: ["Seoul", "Shanghai"]
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
    researchStation: false,
    neighbors: ["BuenosAires", "Lima", "MexicoCity","Miami","SaoPaolo"]
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
    researchStation: false,
    neighbors: ["Bogota","SaoPaolo"]
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
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
    researchStation: false,
    neighbors: []
  }
}

const unusedInfectionCards = {
  Algiers: {
    name: "Algiers",
    color: "black",
    neighbors: []
  },
  Atlanta: {
    name: "Atlanta",
    color: "blue"
  },
  Baghdad: {
    name: "Baghdad",
    color: "black"
  },
  Bangkok: {
    name: "Bangkok",
    color: "red"
  },
  Beijing: {
    name: "Beijing",
    color: "red"
  },
  Bogota: {
    name: "Bogota",
    color: "yellow"
  },
  BuenosAires: {
    name: "Buenos Aries",
    color: "yellow"
  },
  Cairo: {
    name: "Cairo",
    color: "black"
  },
  Chennai: {
    name: "Chennai",
    color: "black"
  },
  Chicago: {
    name: "Chicago",
    color: "blue"
  },
  Delhi: {
    name: "Delhi",
    color: "black"
  },
  Essen: {
    name: "Essen",
    color: "blue"
  },
  HoChiMinhCity: {
    name: "Ho Chi Minh City",
    color: "red"
  },
  HongKong: {
    name: "Hong Kong",
    color: "red"
  },
  Istanbul: {
    name: "Istanbul",
    color: "black"
  },
  Jakarta: {
    name: "Jakarta",
    color: "red"
  },
  Johannesburg: {
    name: "Johannesburg",
    color: "yellow"
  },
  Karachi: {
    name: "Karachi",
    color: "black"
  },
  Khartoum: {
    name: "Khartoum",
    color: "yellow"
  },
  Kinshasa: {
    name: "Kinshasa",
    color: "yellow"
  },
  Kolkata: {
    name: "Kolkata",
    color: "black"
  },
  Lagos: {
    name: "Lagos",
    color: "yellow"
  },
  Lima: {
    name: "Lima",
    color: "yellow"
  },
  London: {
    name: "London",
    color: "blue"
  },
  LosAngeles: {
    name: "Los Angeles",
    color: "yellow"
  },
  Madrid: {
    name: "Madrid",
    color: "blue"
  },
  Manila: {
    name: "Manila",
    color: "red"
  },
  MexicoCity: {
    name: "Mexico City",
    color: "yellow"
  },
  Miami: {
    name: "Miami",
    color: "yellow"
  },
  Milan: {
    name: "Milan",
    color: "blue"
  },
  Montreal: {
    name: "Montreal",
    color: "blue"
  },
  Moscow: {
    name: "Moscow",
    color: "black"
  },
  Mumbai: {
    name: "Mumbai",
    color: "black"
  },
  NewYork: {
    name: "New York",
    color: "blue"
  },
  Osaka: {
    name: "Osaka",
    color: "red"
  },
  Paris: {
    name: "Paris",
    color: "blue"
  },
  Riyadh: {
    name: "Riyadh",
    color: "black"
  },
  SanFrancisco: {
    name: "San Francisco",
    color: "blue"
  },
  Santiago: {
    name: "Santiago",
    color: "yellow"
  },
  SaoPaulo: {
    name: "Sao Paulo",
    color: "yellow"
  },
  Seoul: {
    name: "Seoul",
    color: "red"
  },
  Shanghai: {
    name: "Shanghai",
    color: "red"
  },
  StPetersburg: {
    name: "St. Petersburg",
    color: "black"
  },
  Sydney: {
    name: "Sydney",
    color: "red"
  },
  Taipei: {
    name: "Taipei",
    color: "red"
  },
  Tehran: {
    name: "Tehran",
    color: "black"
  },
  Tokyo: {
    name: "Tokyo",
    color: "red"
  },
  Washington: {
    name: "Washington",
    color: "blue"
  }
}

const unusedCityCards = {
  Algiers: {
    name: "Algiers",
    color: "black",
  },
  Atlanta: {
    name: "Atlanta",
    color: "blue"
  },
  Baghdad: {
    name: "Baghdad",
    color: "black"
  },
  Bangkok: {
    name: "Bangkok",
    color: "red"
  },
  Beijing: {
    name: "Beijing",
    color: "red"
  },
  Bogota: {
    name: "Bogota",
    color: "yellow"
  },
  BuenosAires: {
    name: "Buenos Aries",
    color: "yellow"
  },
  Cairo: {
    name: "Cairo",
    color: "black"
  },
  Chennai: {
    name: "Chennai",
    color: "black"
  },
  Chicago: {
    name: "Chicago",
    color: "blue"
  },
  Delhi: {
    name: "Delhi",
    color: "black"
  },
  Essen: {
    name: "Essen",
    color: "blue"
  },
  HoChiMinhCity: {
    name: "Ho Chi Minh City",
    color: "red"
  },
  HongKong: {
    name: "Hong Kong",
    color: "red"
  },
  Istanbul: {
    name: "Istanbul",
    color: "black"
  },
  Jakarta: {
    name: "Jakarta",
    color: "red"
  },
  Johannesburg: {
    name: "Johannesburg",
    color: "yellow"
  },
  Karachi: {
    name: "Karachi",
    color: "black"
  },
  Khartoum: {
    name: "Khartoum",
    color: "yellow"
  },
  Kinshasa: {
    name: "Kinshasa",
    color: "yellow"
  },
  Kolkata: {
    name: "Kolkata",
    color: "black"
  },
  Lagos: {
    name: "Lagos",
    color: "yellow"
  },
  Lima: {
    name: "Lima",
    color: "yellow"
  },
  London: {
    name: "London",
    color: "blue"
  },
  LosAngeles: {
    name: "Los Angeles",
    color: "yellow"
  },
  Madrid: {
    name: "Madrid",
    color: "blue"
  },
  Manila: {
    name: "Manila",
    color: "red"
  },
  MexicoCity: {
    name: "Mexico City",
    color: "yellow"
  },
  Miami: {
    name: "Miami",
    color: "yellow"
  },
  Milan: {
    name: "Milan",
    color: "blue"
  },
  Montreal: {
    name: "Montreal",
    color: "blue"
  },
  Moscow: {
    name: "Moscow",
    color: "black"
  },
  Mumbai: {
    name: "Mumbai",
    color: "black"
  },
  NewYork: {
    name: "New York",
    color: "blue"
  },
  Osaka: {
    name: "Osaka",
    color: "red"
  },
  Paris: {
    name: "Paris",
    color: "blue"
  },
  Riyadh: {
    name: "Riyadh",
    color: "black"
  },
  SanFrancisco: {
    name: "San Francisco",
    color: "blue"
  },
  Santiago: {
    name: "Santiago",
    color: "yellow"
  },
  SaoPaulo: {
    name: "Sao Paulo",
    color: "yellow"
  },
  Seoul: {
    name: "Seoul",
    color: "red"
  },
  Shanghai: {
    name: "Shanghai",
    color: "red"
  },
  StPetersburg: {
    name: "St. Petersburg",
    color: "black"
  },
  Sydney: {
    name: "Sydney",
    color: "red"
  },
  Taipei: {
    name: "Taipei",
    color: "red"
  },
  Tehran: {
    name: "Tehran",
    color: "black"
  },
  Tokyo: {
    name: "Tokyo",
    color: "red"
  },
  Washington: {
    name: "Washington",
    color: "blue"
  }
}
//Will the player cards and infection cards be an array of cards?
//Number of players will dictate number of cards per player.
