import L from 'leaflet';

export const Icon = L.Icon.extend({
  options: {
    iconSize: [30, 30]
  }
});

export const highlightIcon = L.Icon.extend({
  options: {
    iconSize: [50, 50]
  }
});

export const iconContainer = {
  red: new Icon({ iconUrl: 'https://lh5.ggpht.com/JUGn9I-kMM3LriNMpdUA6Z1_NZksTHCndCJ7SqSG0CkF6P-rBHUS91_aAiWfNpKSoQ=w300' }),
  blue: new Icon({ iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Blue_dot.png' }),
  yellow: new Icon({ iconUrl: 'https://lh3.googleusercontent.com/nmIfOaurHcAvlxd6OksvTYkF1thhsEnpxV2x0PvJ8zTxS-uAX0r7BWQxM20XTL6SrQ' }),
  black: new Icon({ iconUrl: 'https://totalsororitymove.com/wp-content/uploads/user_avatars/blackball.png' }),
  'highlight': new highlightIcon({iconUrl: 'assets/images/city_sel.png'})
};

export const addCubes = diseaseCubes => {
  let totalCount = 0, cubes = [];
  for (const [color, num] of diseaseCubes) {
    for (let i = 0; i < num; i++) {
      cubes.push([color, totalCount++]);
    }
  }
  return cubes;
};

export const getCityDiseaseCubes = city => {
  let diseaseCubes = [];
  if (city.red) diseaseCubes.push(['red', city.red]);
  if (city.blue) diseaseCubes.push(['blue', city.blue]);
  if (city.yellow) diseaseCubes.push(['yellow', city.yellow]);
  if (city.black) diseaseCubes.push(['black', city.black]);
  return addCubes(diseaseCubes);
};
