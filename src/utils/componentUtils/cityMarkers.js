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
  blue: new Icon({ iconUrl: 'http://lobelpost.com/v17/files/stacks-image-12a7505.png' }),
  yellow: new Icon({ iconUrl: 'https://lh3.googleusercontent.com/nmIfOaurHcAvlxd6OksvTYkF1thhsEnpxV2x0PvJ8zTxS-uAX0r7BWQxM20XTL6SrQ' }),
  black: new Icon({ iconUrl: 'https://totalsororitymove.com/wp-content/uploads/user_avatars/blackball.png' }),
  'highlight': new highlightIcon({iconUrl: 'assets/images/city_sel.png'})
};

export const getCubeCoords = (cityCoords, cubeNum, totalCubes) => {
  let [latitude, longitude] = cityCoords;
  const fraction = 3; // arbitrary based on size of cube.
  if (cubeNum < totalCubes / 2) { // first half of cubes
    if (cubeNum < totalCubes / 4) { // top right quadrant.
      latitude += fraction;
      longitude += fraction;
    } else { // bottom right quadrant
      latitude -= fraction;
      longitude += fraction;
    }
  } else { // second half of cubes
    if (cubeNum < 3 * totalCubes / 4) { // bottom left quadrant
      latitude -= fraction;
      longitude -= fraction;
    } else { // top left quadrant
      latitude += fraction;
      longitude -= fraction;
    }
  }
  return [latitude, longitude];
};

export const getDiseaseCubes = city => {
  const cubes = [];
  const colors = ['red', 'blue', 'yellow', 'black'];
  let totalCount = 0;
  for (const color of colors) {
    totalCount = addCube(cubes, color, city[color], totalCount);
  }
  return cubes;
};

export const addCube = (cubes, color, count, totalCount) => {
  for (let i = 0; i < count; i++) {
    cubes.push([color, totalCount++]);
  }
  return totalCount;
};
