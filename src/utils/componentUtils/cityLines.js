import React from 'react';
import L from 'leaflet';
import { Polyline } from 'react-leaflet';
import { initialCities } from '../index';

export const drawNeighborLines = (lines, boundaryCities) => {
  const visitedCities = {};
  for (const [cityKey, city] of Object.entries(initialCities)) {
    if (boundaryCities.includes(cityKey)) continue;
    visitedCities[cityKey] = true;
    for (const neighbor of city.neighbors) {
      if (visitedCities[neighbor]) continue; //prevent double lines
      let cityA = new L.LatLng(...city.coords);
      let cityB = new L.LatLng(...initialCities[neighbor].coords);
      lines.push(
        <Polyline positions={[cityA, cityB]} key={[...city.coords, ...initialCities[neighbor].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />
      );
    }
  }
};

//Draw lines that should go beyond east/western boundary rather than across the continents
export const drawBoundaryLines = (lines, boundaryCities) => {
  const cityCoords = {};
  const newCityCoords = {};
  for (const city of boundaryCities) {
    cityCoords[city] = new L.LatLng(...initialCities[city].coords);
    if (city === 'SanFrancisco' || city === 'LosAngeles') {
      newCityCoords[city] = new L.LatLng(initialCities[city].coords[0], initialCities[city].coords[1] + 360);
    } else {
      newCityCoords[city] = new L.LatLng(initialCities[city].coords[0], initialCities[city].coords[1] - 360);
    }
  }
  lines = lines.concat([
    <Polyline positions={[cityCoords['Sydney'], newCityCoords['LosAngeles']]} key={[...initialCities['Sydney'].coords, ...initialCities['LosAngeles'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['LosAngeles'], newCityCoords['Sydney']]} key={[...initialCities['LosAngeles'].coords, ...initialCities['Sydney'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['SanFrancisco'], newCityCoords['Tokyo']]} key={[...initialCities['SanFrancisco'].coords, ...initialCities['Tokyo'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['SanFrancisco'], newCityCoords['Manila']]} key={[...initialCities['SanFrancisco'].coords, ...initialCities['Manila'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['Tokyo'], newCityCoords['SanFrancisco']]} key={[...initialCities['Tokyo'].coords, ...initialCities['SanFrancisco'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['Manila'], newCityCoords['SanFrancisco']]} key={[...initialCities['Manila'].coords, ...initialCities['SanFrancisco'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['Manila'], cityCoords['Sydney']]} key={[...initialCities['Manila'].coords, ...initialCities['Sydney'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
    <Polyline positions={[cityCoords['LosAngeles'], cityCoords['SanFrancisco']]} key={[...initialCities['LosAngeles'].coords, ...initialCities['SanFrancisco'].coords].toString()} color='red' weight={3} opacity={0.5} smoothFactor={1} />,
  ]);
  return lines;
};
