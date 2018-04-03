import React from 'react';
import L from 'leaflet';
import { Polyline } from 'react-leaflet';
import { cities } from '../cards';

const CityLines = () => {
  let cityKeys = Object.keys(cities)
  const lines = [];
  for (let cityKey of cityKeys) {
    let city = cities[cityKey]
    for (let neighbor of city.neighbors) {
      let cityA = new L.LatLng(...city.coords);
      let cityB = new L.LatLng(...cities[neighbor].coords);
      lines.push(
        <Polyline positions={[cityA, cityB]} key={[...city.coords, ...cities[neighbor].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1}/>
      )
    }
  }
  return lines;
}

export default CityLines;
