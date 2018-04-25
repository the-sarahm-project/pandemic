const cities = {
  Algiers: {
    name: "Algiers",
    coords: [31.4966, 9.0527],
    researchStation: false,
    neighbors: ["Cairo", "Istanbul", "Madrid", "Paris"],
    color: "black"
  },
  Atlanta: {
    name: "Atlanta",
    coords: [36.7322, -96.0644],
    researchStation: false,
    neighbors: ["Chicago", "Miami", "Washington"],
    color: "blue"
  },
  Baghdad: {
    name: "Baghdad",
    coords: [37.5728, 48.7793],
    researchStation: false,
    neighbors: ["Cairo", "Istanbul", "Karachi", "Riyadh", "Tehran"],
    color: "black"
  },
  Bangkok: {
    name: "Bangkok",
    coords: [13.0607, 101.5137],
    researchStation: false,
    neighbors: ["Chennai", "HoChiMinhCity", "HongKong", "Jakarta", "Kolkata"],
    color: "red"
  },
  Beijing: {
    name: "Beijing",
    coords: [55.2744, 118.3887],
    researchStation: false,
    neighbors: ["Seoul", "Shanghai"],
    color: "red"
  },
  Bogota: {
    name: "Bogota",
    coords: [0.8706, -77.7832],
    researchStation: false,
    neighbors: ["BuenosAires", "Lima", "MexicoCity", "Miami", "SaoPaulo"],
    color: "yellow"
  },
  BuenosAires: {
    name: "Buenos Aires",
    coords: [-36.7455, -59.5020],
    researchStation: false,
    neighbors: ["Bogota", "SaoPaulo"],
    color: "yellow"
  },
  Cairo: {
    name: "Cairo",
    coords: [28.4518, 29.4434],
    researchStation: false,
    neighbors: ["Algiers", "Baghdad", "Istanbul", "Khartoum", "Riyadh"],
    color: "black"
  },
  Chennai: {
    name: "Chennai",
    coords: [3.3297, 89.2090],
    researchStation: false,
    neighbors: ["Bangkok", "Delhi", "Jakarta", "Kolkata", "Mumbai"],
    color: "black"
  },
  Chicago: {
    name: "Chicago",
    coords: [48.8691, -110.3033],
    researchStation: false,
    neighbors: ["Atlanta", "LosAngeles", "MexicoCity", "Montreal", "SanFrancisco"],
    color: "blue"
  },
  Delhi: {
    name: "Delhi",
    coords: [44.9260, 82.4193],
    researchStation: false,
    neighbors: ["Chennai", "Karachi", "Kolkata", "Mumbai", "Tehran"],
    color: "black"
  },
  Essen: {
    name: "Essen",
    coords: [61.2903, 5.3608],
    researchStation: false,
    neighbors: ["London", "Milan", "Paris", "StPetersburg"],
    color: "blue"
  },
  HoChiMinhCity: {
    name: "Ho Chi Minh City",
    coords: [0.0418, 117.1576],
    researchStation: false,
    neighbors: ["Bangkok", "HongKong", "Jakarta", "Manila"],
    color: "red"
  },
  HongKong: {
    name: "Hong Kong",
    coords: [22.3964, 114.1095],
    researchStation: false,
    neighbors: ["Bangkok", "HoChiMinhCity", "Kolkata", "Manila", "Shanghai", "Taipei"],
    color: "red"
  },
  Istanbul: {
    name: "Istanbul",
    coords: [41.0082, 28.9784],
    researchStation: false,
    neighbors: ["Algiers", "Baghdad", "Cairo", "Milan", "Moscow", "StPetersburg"],
    color: "black"
  },
  Jakarta: {
    name: "Jakarta",
    coords: [-11.3934, 105.7319],
    researchStation: false,
    neighbors: ["Bangkok", "Chennai", "HoChiMinhCity", "Sydney"],
    color: "red"
  },
  Johannesburg: {
    name: "Johannesburg",
    coords: [-26.2041, 28.0473],
    researchStation: false,
    neighbors: ["Khartoum", "Kinshasa"],
    color: "yellow"
  },
  Karachi: {
    name: "Karachi",
    coords: [29.6503, 67.2848],
    researchStation: false,
    neighbors: ["Baghdad", "Delhi", "Mumbai", "Riyadh", "Tehran"],
    color: "black"
  },
  Khartoum: {
    name: "Khartoum",
    coords: [7.6679, 29.0912],
    researchStation: false,
    neighbors: ["Cairo", "Johannesburg", "Kinshasa", "Lagos"],
    color: "yellow"
  },
  Kinshasa: {
    name: "Kinshasa",
    coords: [-12.3052, 14.5459],
    researchStation: false,
    neighbors: ["Johannesburg", "Khartoum", "Lagos"],
    color: "yellow"
  },
  Kolkata: {
    name: "Kolkata",
    coords: [36.4527, 99.0967],
    researchStation: false,
    neighbors: ["Bangkok", "Chennai", "Delhi", "HongKong"],
    color: "black"
  },
  Lagos: {
    name: "Lagos",
    coords: [8.4103, 6.6357],
    researchStation: false,
    neighbors: ["Khartoum", "Kinshasa", "SaoPaulo"],
    color: "yellow"
  },
  Lima: {
    name: "Lima",
    coords: [-19.9703, -87.2149],
    researchStation: false,
    neighbors: ["Bogota", "MexicoCity", "Santiago"],
    color: "yellow"
  },
  London: {
    name: "London",
    coords: [58.4870, -16.9024],
    researchStation: false,
    neighbors: ["Essen", "Madrid", "NewYork", "Paris"],
    color: "blue"
  },
  LosAngeles: {
    name: "Los Angeles",
    coords: [34.7027, -127.0877],
    researchStation: false,
    neighbors: ["Chicago", "MexicoCity", "SanFrancisco", "Sydney"],
    color: "yellow"
  },
  Madrid: {
    name: "Madrid",
    coords: [40.9442, -16.5213],
    researchStation: false,
    neighbors: ["Algiers", "NewYork", "London", "Paris", "SaoPaulo"],
    color: "blue"
  },
  Manila: {
    name: "Manila",
    coords: [2.4662, 141.3303],
    researchStation: false,
    neighbors: ["HoChiMinhCity", "HongKong", "SanFrancisco", "Sydney", "Taipei"],
    color: "red"
  },
  MexicoCity: {
    name: "Mexico City",
    coords: [14.0998, -106.8728],
    researchStation: false,
    neighbors: ["Bogota", "Chicago", "Lima", "LosAngeles", "Miami"],
    color: "yellow"
  },
  Miami: {
    name: "Miami",
    coords: [24.3726, -81.7361],
    researchStation: false,
    neighbors: ["Atlanta", "Bogota", "MexicoCity", "Washington"],
    color: "yellow"
  },
  Milan: {
    name: "Milan",
    coords: [53.3709, 19.3381],
    researchStation: false,
    neighbors: ["Essen", "Istanbul", "Paris"],
    color: "blue"
  },
  Montreal: {
    name: "Montreal",
    coords: [52.3361, -81.9119],
    researchStation: false,
    neighbors: ["Chicago", "NewYork", "Washington"],
    color: "blue"
  },
  Moscow: {
    name: "Moscow",
    coords: [58.0669, 44.8264],
    researchStation: false,
    neighbors: ["Istanbul", "StPetersburg", "Tehran"],
    color: "black"
  },
  Mumbai: {
    name: "Mumbai",
    coords: [14.2443, 74.3576],
    researchStation: false,
    neighbors: ["Chennai", "Delhi", "Karachi"],
    color: "black"
  },
  NewYork: {
    name: "New York",
    coords: [51.3620, -58.0056],
    researchStation: false,
    neighbors: ["London", "Madrid", "Montreal", "Washington"],
    color: "blue"
  },
  Osaka: {
    name: "Osaka",
    coords: [33.6748, 153.1076],
    researchStation: false,
    neighbors: ["Taipei", "Tokyo"],
    color: "red"
  },
  Paris: {
    name: "Paris",
    coords: [48.7676, 0.5295],
    researchStation: false,
    neighbors: ["Algiers", "Essen", "Madrid", "Milan", "London"],
    color: "blue"
  },
  Riyadh: {
    name: "Riyadh",
    coords: [19.2549, 51.5061],
    researchStation: false,
    neighbors: ["Baghdad", "Cairo", "Karachi"],
    color: "black"
  },
  SanFrancisco: {
    name: "San Francisco",
    coords: [48.0722, -133.4158],
    researchStation: false,
    neighbors: ["Chicago", "LosAngeles", "Manila", "Tokyo"],
    color: "blue"
  },
  Santiago: {
    name: "Santiago",
    coords: [-40.0188, -87.5369],
    researchStation: false,
    neighbors: ["Lima"],
    color: "yellow"
  },
  SaoPaulo: {
    name: "Sao Paulo",
    coords: [-24.0178, -48.5135],
    researchStation: false,
    neighbors: ["BuenosAires", "Bogota", "Lagos", "Madrid"],
    color: "yellow"
  },
  Seoul: {
    name: "Seoul",
    coords: [55.1968, 137.1115],
    researchStation: false,
    neighbors: ["Beijing", "Shanghai", "Tokyo"],
    color: "red"
  },
  Shanghai: {
    name: "Shanghai",
    coords: [41.0036, 123.2248],
    researchStation: false,
    neighbors: ["Beijing", "HongKong", "Seoul", "Taipei", "Tokyo"],
    color: "red"
  },
  StPetersburg: {
    name: "St. Petersburg",
    coords: [62.4456, 29.1819],
    researchStation: false,
    neighbors: ["Essen", "Istanbul", "Moscow"],
    color: "blue"
  },
  Sydney: {
    name: "Sydney",
    coords: [-34.4263, 154.3381],
    researchStation: false,
    neighbors: ["Jakarta", "LosAngeles", "Manila"],
    color: "red"
  },
  Taipei: {
    name: "Taipei",
    coords: [25.8282, 134.8264],
    researchStation: false,
    neighbors: ["HongKong", "Manila", "Osaka", "Shanghai"],
    color: "red"
  },
  Tehran: {
    name: "Tehran",
    coords: [53.8713, 64.8529],
    researchStation: false,
    neighbors: ["Baghdad", "Delhi", "Karachi", "Moscow"],
    color: "black"
  },
  Tokyo: {
    name: "Tokyo",
    coords: [47.0154, 156.9748],
    researchStation: false,
    neighbors: ["Osaka", "SanFrancisco", "Seoul", "Shanghai"],
    color: "red"
  },
  Washington: {
    name: "Washington",
    coords: [37.5973, -71.0260],
    researchStation: false,
    neighbors: ["Atlanta", "Miami", "Montreal", "NewYork"],
    color: "blue"
  }
};

export default cities;
