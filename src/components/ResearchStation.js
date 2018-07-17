import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

const ResearchStation = ({ coords }) => {
  const ResearchStationIcon = L.Icon.extend({
    options: {
      iconSize: [50, 50]
    }
  });
  const researchStationUrl = 'assets/images/station.png';
  return <Marker position={coords} icon={new ResearchStationIcon({iconUrl: researchStationUrl})} />;
};

export default ResearchStation;
