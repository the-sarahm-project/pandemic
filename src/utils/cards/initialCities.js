const cities = {
  Algiers: {
    name: "Algiers",
    coords: [36.7538, 3.0588],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Cairo", "Istanbul", "Madrid", "Paris"]
  },
  Atlanta: {
    name: "Atlanta",
    coords: [33.7490, -84.3880],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Chicago", "Miami", "Washington"]
  },
  Baghdad: {
    name: "Baghdad",
    coords: [33.3128, 44.3615],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Cairo", "Istanbul", "Karachi", "Riyadh", "Tehran"]
  },
  Bangkok: {
    name: "Bangkok",
    coords: [13.7563, 100.5018],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Chennai", "HoChiMinhCity", "HongKong", "Jakarta", "Kolkata"]
  },
  Beijing: {
    name: "Beijing",
    coords: [39.9042, 116.4074],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Seoul", "Shanghai"]
  },
  Bogota: {
    name: "Bogota",
    coords: [4.7110, -74.0721],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["BuenosAires", "Lima", "MexicoCity", "Miami", "SaoPaulo"]
  },
  BuenosAires: {
    name: "Buenos Aires",
    coords: [-34.6037, -58.3816],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Bogota", "SaoPaulo"]
  },
  Cairo: {
    name: "Cairo",
    coords: [30.0444, 31.2357],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Algiers", "Baghdad", "Istanbul", "Khartoum", "Riyadh"]
  },
  Chennai: {
    name: "Chennai",
    coords: [13.0827, 80.2707],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Bangkok", "Delhi", "Jakarta", "Kolkata", "Mumbai"]
  },
  Chicago: {
    name: "Chicago",
    coords: [41.8781, -87.6298],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Atlanta", "LosAngeles", "MexicoCity", "Montreal", "SanFrancisco"]
  },
  Delhi: {
    name: "Delhi",
    coords: [28.644800, 77.216721],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Chennai", "Karachi", "Kolkata", "Mumbai", "Tehran"]
  },
  Essen: {
    name: "Essen",
    coords: [51.4556, 7.0116],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["London", "Milan", "Paris", "StPetersburg"]
  },
  HoChiMinhCity: {
    name: "Ho Chi Minh City",
    coords: [10.8231, 106.6297],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Bangkok", "HongKong", "Jakarta", "Manila"]
  },
  HongKong: {
    name: "Hong Kong",
    coords: [22.3964, 114.1095],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Bangkok", "HoChiMinhCity", "Kolkata", "Manila", "Shanghai", "Taipei"]
  },
  Istanbul: {
    name: "Istanbul",
    coords: [41.0082, 28.9784],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Algiers", "Baghdad", "Cairo", "Milan", "Moscow", "StPetersburg"]
  },
  Jakarta: {
    name: "Jakarta",
    coords: [-6.1751, 106.8650],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Bangkok", "Chennai", "HoChiMinhCity", "Sydney"]
  },
  Johannesburg: {
    name: "Johannesburg",
    coords: [-26.2041, 28.0473],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Khartoum", "Kinshasa"]
  },
  Karachi: {
    name: "Karachi",
    coords: [25.0700, 67.2848],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Baghdad", "Delhi", "Mumbai", "Riyadh", "Tehran"]
  },
  Khartoum: {
    name: "Khartoum",
    coords: [15.5007, 32.5599],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Cairo", "Johannesburg", "Kinshasa", "Lagos"]
  },
  Kinshasa: {
    name: "Kinshasa",
    coords: [-4.4419, 15.2663],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Johannesburg", "Khartoum", "Lagos"]
  },
  Kolkata: {
    name: "Kolkata",
    coords: [22.5726, 88.3639],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Bangkok", "Chennai", "Delhi", "HongKong"]
  },
  Lagos: {
    name: "Lagos",
    coords: [6.5244, 3.3792],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Khartoum", "Kinshasa", "SaoPaulo"]
  },
  Lima: {
    name: "Lima",
    coords: [-12.0464, -77.0428],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Bogota", "MexicoCity", "Santiago"]
  },
  London: {
    name: "London",
    coords: [51.5074, -0.1278],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Essen", "Madrid", "NewYork", "Paris"]
  },
  LosAngeles: {
    name: "Los Angeles",
    coords: [34.0522, -118.2437],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Chicago", "MexicoCity", "SanFrancisco", "Sydney"]
  },
  Madrid: {
    name: "Madrid",
    coords: [40.4168, -3.7038],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Algiers", "NewYork", "London", "Paris", "SaoPaulo"]
  },
  Manila: {
    name: "Manila",
    coords: [14.5995, 120.9842],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["HoChiMinhCity", "HongKong", "SanFrancisco", "Sydney", "Taipei"]
  },
  MexicoCity: {
    name: "Mexico City",
    coords: [19.4326, -99.1332],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Bogota", "Chicago", "Lima", "LosAngeles", "Miami"]
  },
  Miami: {
    name: "Miami",
    coords: [25.7617, -80.1918],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Atlanta", "Bogota", "MexicoCity", "Washington"]
  },
  Milan: {
    name: "Milan",
    coords: [45.4642, 9.1900],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Essen", "Istanbul", "Paris"]
  },
  Montreal: {
    name: "Montreal",
    coords: [45.5017, -73.5673],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Chicago", "NewYork", "Washington"]
  },
  Moscow: {
    name: "Moscow",
    coords: [55.7558, 37.6173],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Istanbul", "StPetersburg", "Tehran"]
  },
  Mumbai: {
    name: "Mumbai",
    coords: [19.0760, 72.8777],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Chennai", "Delhi", "Karachi"]
  },
  NewYork: {
    name: "New York",
    coords: [40.7128, -74.0060],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["London", "Madrid", "Montreal", "Washington"]
  },
  Osaka: {
    name: "Osaka",
    coords: [34.6937, 135.5022],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Taipei", "Tokyo"]
  },
  Paris: {
    name: "Paris",
    coords: [48.8566, 2.3522],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Algiers", "Essen", "Madrid", "Milan", "London"]
  },
  Riyadh: {
    name: "Riyadh",
    coords: [24.7136, 46.6753],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Baghdad", "Cairo", "Karachi"]
  },
  SanFrancisco: {
    name: "San Francisco",
    coords: [37.7749, -122.4194],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Chicago", "LosAngeles", "Manila", "Tokyo"]
  },
  Santiago: {
    name: "Santiago",
    coords: [-33.4489, -70.6693],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Lima"]
  },
  SaoPaulo: {
    name: "Sao Paulo",
    coords: [-23.5505, -46.6333],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["BuenosAires", "Bogota", "Lagos", "Madrid"]
  },
  Seoul: {
    name: "Seoul",
    coords: [37.5665, 126.9780],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Beijing", "Shanghai", "Tokyo"]
  },
  Shanghai: {
    name: "Shanghai",
    coords: [31.2304, 121.4737],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Beijing", "HongKong", "Seoul", "Taipei", "Tokyo"]
  },
  StPetersburg: {
    name: "St. Petersburg",
    coords: [59.9343, 30.3351],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Essen", "Istanbul", "Moscow"]
  },
  Sydney: {
    name: "Sydney",
    coords: [-33.8688, 151.2093],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Jakarta", "LosAngeles", "Manila"]
  },
  Taipei: {
    name: "Taipei",
    coords: [25.0330, 121.5654],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["HongKong", "Manila", "Osaka", "Shanghai"]
  },
  Tehran: {
    name: "Tehran",
    coords: [35.6892, 51.3890],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Baghdad", "Delhi", "Karachi", "Moscow"]
  },
  Tokyo: {
    name: "Tokyo",
    coords: [35.6895, 139.6917],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Osaka", "SanFrancisco", "Seoul", "Shanghai"]
  },
  Washington: {
    name: "Washington",
    coords: [38.9072, -77.0369],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Atlanta", "Miami", "Montreal", "NewYork"]
  }
};

export default cities;
