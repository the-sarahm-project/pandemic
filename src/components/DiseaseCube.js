

import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

const DiseaseCube = ({ coords, cube }) => {
  const [color, num] = cube;
  const DiseaseCubeIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
      className: `disease-cube-${num}`,
    },
  });
  const DiseaseCubeUrl = `assets/images/cube_${color}.png`;
  return (
    <Marker
      className='disease-cube'
      position={coords}
      icon={new DiseaseCubeIcon({iconUrl: DiseaseCubeUrl})}
      zIndexOffset={1001} //because playerMarker zIndexOffset is 1000
    />
  );
};

export default DiseaseCube;
