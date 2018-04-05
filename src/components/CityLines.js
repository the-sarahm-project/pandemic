import React from 'react';
import L from 'leaflet';
import { Polyline } from 'react-leaflet';
import { cities } from '../utils/cards';

const CityLines = () => {
  const boundaryCities = ['Sydney','Manila','Tokyo','SanFrancisco','LosAngeles'];
  const visitedCities = {};
  let lines = [];
  for (let [cityKey, city] of Object.entries(cities)) {
    if (boundaryCities.includes(cityKey)) continue;
    visitedCities[cityKey] = true;
    for (let neighbor of city.neighbors) {
      if (visitedCities[neighbor]) continue; //prevent double lines
      let cityA = new L.LatLng(...city.coords);
      let cityB = new L.LatLng(...cities[neighbor].coords);
      lines.push(
        <Polyline positions={[cityA, cityB]} key={[...city.coords, ...cities[neighbor].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />
      );
    }
  }
  lines = drawBoundaryLines(lines, cities, boundaryCities);
  return lines;
};

//Draw lines that should go beyond east/western boundary rather than across the continents
const drawBoundaryLines = (lines, cities, boundaryCities) => {
  const cityCoords = {};
  const newCityCoords = {};
  for (let city of boundaryCities) {
    cityCoords[city] = new L.LatLng(...cities[city].coords);
    if (city === 'SanFrancisco' || city === 'LosAngeles') {
      newCityCoords[city] = new L.LatLng(cities[city].coords[0], cities[city].coords[1] + 360);
    } else {
      newCityCoords[city] = new L.LatLng(cities[city].coords[0], cities[city].coords[1] - 360);
    }
  }
  lines = lines.concat([
    <Polyline positions={[cityCoords['Sydney'], newCityCoords['LosAngeles']]} key={[...cities['Sydney'].coords, ...cities['LosAngeles'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['LosAngeles'], newCityCoords['Sydney']]} key={[...cities['LosAngeles'].coords, ...cities['Sydney'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['SanFrancisco'], newCityCoords['Tokyo']]} key={[...cities['SanFrancisco'].coords, ...cities['Tokyo'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['SanFrancisco'], newCityCoords['Manila']]} key={[...cities['SanFrancisco'].coords, ...cities['Manila'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['Tokyo'], newCityCoords['SanFrancisco']]} key={[...cities['Tokyo'].coords, ...cities['SanFrancisco'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['Manila'], newCityCoords['SanFrancisco']]} key={[...cities['Manila'].coords, ...cities['SanFrancisco'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
  ]);
  return lines;
};

export default CityLines;
