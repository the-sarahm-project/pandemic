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

// cubeCoords offset is based on LatLng, so distance is stretched on the map.
// Need to find a way to get pixel distance in React.
export const getCubeCoords = (cityCoords, cubeNum, totalCubes) => {
  let [latitude, longitude] = cityCoords;
  const offset = 3; // arbitrary based on size of cube.
  if (cubeNum < totalCubes / 2) { // first half of cubes
    if (cubeNum < totalCubes / 4) { // top right quadrant.
      latitude += offset;
      longitude += offset;
    } else { // bottom right quadrant
      latitude -= offset;
      longitude += offset;
    }
  } else { // second half of cubes
    if (cubeNum < 3 * totalCubes / 4) { // bottom left quadrant
      latitude -= offset;
      longitude -= offset;
    } else { // top left quadrant
      latitude += offset;
      longitude -= offset;
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
