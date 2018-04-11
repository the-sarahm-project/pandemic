const cities = {
  Algiers: {
    name: "Algiers",
    coords: [31.4966, 9.0527],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Cairo", "Istanbul", "Madrid", "Paris"]
  },
  Atlanta: {
    name: "Atlanta",
    coords: [36.7322, -96.0644],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Chicago", "Miami", "Washington"]
  },
  Baghdad: {
    name: "Baghdad",
    coords: [37.5728, 48.7793],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Cairo", "Istanbul", "Karachi", "Riyadh", "Tehran"]
  },
  Bangkok: {
    name: "Bangkok",
    coords: [13.0607, 101.5137],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Chennai", "HoChiMinhCity", "HongKong", "Jakarta", "Kolkata"]
  },
  Beijing: {
    name: "Beijing",
    coords: [55.2744, 118.3887],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Seoul", "Shanghai"]
  },
  Bogota: {
    name: "Bogota",
    coords: [0.8706, -77.7832],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["BuenosAires", "Lima", "MexicoCity", "Miami", "SaoPaulo"]
  },
  BuenosAires: {
    name: "Buenos Aires",
    coords: [-36.7455, -59.5020],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Bogota", "SaoPaulo"]
  },
  Cairo: {
    name: "Cairo",
    coords: [28.4518, 29.4434],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Algiers", "Baghdad", "Istanbul", "Khartoum", "Riyadh"]
  },
  Chennai: {
    name: "Chennai",
    coords: [3.3297, 89.2090],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Bangkok", "Delhi", "Jakarta", "Kolkata", "Mumbai"]
  },
  Chicago: {
    name: "Chicago",
    coords: [48.8691, -110.3033],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Atlanta", "LosAngeles", "MexicoCity", "Montreal", "SanFrancisco"]
  },
  Delhi: {
    name: "Delhi",
    coords: [44.9260, 82.4193],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Chennai", "Karachi", "Kolkata", "Mumbai", "Tehran"]
  },
  Essen: {
    name: "Essen",
    coords: [61.2903, 5.3608],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["London", "Milan", "Paris", "StPetersburg"]
  },
  HoChiMinhCity: {
    name: "Ho Chi Minh City",
    coords: [0.0418, 117.1576],
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
    coords: [-11.3934, 105.7319],
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
    coords: [29.6503, 67.2848],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Baghdad", "Delhi", "Mumbai", "Riyadh", "Tehran"]
  },
  Khartoum: {
    name: "Khartoum",
    coords: [7.6679, 29.0912],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Cairo", "Johannesburg", "Kinshasa", "Lagos"]
  },
  Kinshasa: {
    name: "Kinshasa",
    coords: [-12.3052, 14.5459],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Johannesburg", "Khartoum", "Lagos"]
  },
  Kolkata: {
    name: "Kolkata",
    coords: [36.4527, 99.0967],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Bangkok", "Chennai", "Delhi", "HongKong"]
  },
  Lagos: {
    name: "Lagos",
    coords: [8.4103, 6.6357],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Khartoum", "Kinshasa", "SaoPaulo"]
  },
  Lima: {
    name: "Lima",
    coords: [-19.9703, -87.2149],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Bogota", "MexicoCity", "Santiago"]
  },
  London: {
    name: "London",
    coords: [58.4870, -16.9024],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Essen", "Madrid", "NewYork", "Paris"]
  },
  LosAngeles: {
    name: "Los Angeles",
    coords: [34.7027, -127.0877],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Chicago", "MexicoCity", "SanFrancisco", "Sydney"]
  },
  Madrid: {
    name: "Madrid",
    coords: [40.9442, -16.5213],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Algiers", "NewYork", "London", "Paris", "SaoPaulo"]
  },
  Manila: {
    name: "Manila",
    coords: [2.4662, 141.3303],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["HoChiMinhCity", "HongKong", "SanFrancisco", "Sydney", "Taipei"]
  },
  MexicoCity: {
    name: "Mexico City",
    coords: [14.0998, -106.8728],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Bogota", "Chicago", "Lima", "LosAngeles", "Miami"]
  },
  Miami: {
    name: "Miami",
    coords: [24.3726, -81.7361],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Atlanta", "Bogota", "MexicoCity", "Washington"]
  },
  Milan: {
    name: "Milan",
    coords: [53.3709, 19.3381],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Essen", "Istanbul", "Paris"]
  },
  Montreal: {
    name: "Montreal",
    coords: [52.3361, -81.9119],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Chicago", "NewYork", "Washington"]
  },
  Moscow: {
    name: "Moscow",
    coords: [58.0669, 44.8264],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Istanbul", "StPetersburg", "Tehran"]
  },
  Mumbai: {
    name: "Mumbai",
    coords: [14.2443, 74.3576],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Chennai", "Delhi", "Karachi"]
  },
  NewYork: {
    name: "New York",
    coords: [51.3620, -58.0056],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["London", "Madrid", "Montreal", "Washington"]
  },
  Osaka: {
    name: "Osaka",
    coords: [33.6748, 153.1076],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Taipei", "Tokyo"]
  },
  Paris: {
    name: "Paris",
    coords: [48.7676, 0.5295],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Algiers", "Essen", "Madrid", "Milan", "London"]
  },
  Riyadh: {
    name: "Riyadh",
    coords: [19.2549, 51.5061],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Baghdad", "Cairo", "Karachi"]
  },
  SanFrancisco: {
    name: "San Francisco",
    coords: [48.0722, -133.4158],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Chicago", "LosAngeles", "Manila", "Tokyo"]
  },
  Santiago: {
    name: "Santiago",
    coords: [-47.0188, -87.5369],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["Lima"]
  },
  SaoPaulo: {
    name: "Sao Paulo",
    coords: [-24.0178, -48.5135],
    icon: "yellowIcon",
    researchStation: false,
    neighbors: ["BuenosAires", "Bogota", "Lagos", "Madrid"]
  },
  Seoul: {
    name: "Seoul",
    coords: [55.1968, 137.1115],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Beijing", "Shanghai", "Tokyo"]
  },
  Shanghai: {
    name: "Shanghai",
    coords: [41.0036, 123.2248],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Beijing", "HongKong", "Seoul", "Taipei", "Tokyo"]
  },
  StPetersburg: {
    name: "St. Petersburg",
    coords: [62.4456, 29.1819],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Essen", "Istanbul", "Moscow"]
  },
  Sydney: {
    name: "Sydney",
    coords: [-34.4263, 154.3381],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Jakarta", "LosAngeles", "Manila"]
  },
  Taipei: {
    name: "Taipei",
    coords: [25.8282, 134.8264],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["HongKong", "Manila", "Osaka", "Shanghai"]
  },
  Tehran: {
    name: "Tehran",
    coords: [53.8713, 64.8529],
    icon: "blackIcon",
    researchStation: false,
    neighbors: ["Baghdad", "Delhi", "Karachi", "Moscow"]
  },
  Tokyo: {
    name: "Tokyo",
    coords: [47.0154, 156.9748],
    icon: "redIcon",
    researchStation: false,
    neighbors: ["Osaka", "SanFrancisco", "Seoul", "Shanghai"]
  },
  Washington: {
    name: "Washington",
    coords: [37.5973, -71.0260],
    icon: "blueIcon",
    researchStation: false,
    neighbors: ["Atlanta", "Miami", "Montreal", "NewYork"]
  }
};

export default cities;
