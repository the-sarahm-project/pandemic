

import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

const DiseaseCube = ({ color, coords }) => {
  const DiseaseCubeIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30]
    }
  });
  const DiseaseCubeUrl = `assets/images/cube_${color}.png`;
  return (
    <Marker
      position={coords}
      icon={new DiseaseCubeIcon({iconUrl: DiseaseCubeUrl})}
      zIndexOffset={200}
    />
  );
};

export default DiseaseCube;
