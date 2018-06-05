import React from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { ResearchStation, DiseaseCube } from './index';
import { iconContainer, getCities, getDiseaseCubes } from '../utils';

export const CityMarkers = ({ cities }) => {
  return (
    <div>
      {isLoaded(cities) && Object.values(cities).map(city => {
        const cubes = getDiseaseCubes(city);
        return (
          <div key={city.coords}>
            <Marker position={city.coords} icon={iconContainer[city.color]} />
            {city.researchStation && <ResearchStation coords={city.coords} researchStation={city.researchStation} />}
            {cubes.map(cube => {
              return <DiseaseCube key={`${city.coords}-${cube}`} coords={city.coords} cube={cube} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    cities: getCities(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CityMarkers);

