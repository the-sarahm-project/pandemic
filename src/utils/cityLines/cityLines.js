import React from 'react';
import L from 'leaflet';
import { Polyline } from 'react-leaflet';

const drawLines = (cities) => {
  const lines = [];
  for (city of cities) {
    for (neighbor of city.neigbors) {
      let cityA = new L.LatLng(city.coords);
      let cityB = new L.LatLng(neighbor.coords);
      lines.push(
        <Polyline positions={[cityA, cityB]} color='white' weight={3} opacity={0.5} smoothFactor={1}/>
      )
    }
  }
  return lines;
}

export default drawLines;
