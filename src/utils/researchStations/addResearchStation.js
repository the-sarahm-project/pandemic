import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

const addResearchStation = (coords) => {
  const ResearchStationIcon = L.Icon.extend({
    options: {
      iconSize: [50, 50]
    }
  })
  const researchStationUrl = 'https://vignette.wikia.nocookie.net/sqmegapolis/images/8/82/Nuclear_Research_Center_%28Old%29.png/revision/latest?cb=20130515084457';
  return <Marker position={coords} icon={new ResearchStationIcon({iconUrl: researchStationUrl})} />
}

export default addResearchStation
