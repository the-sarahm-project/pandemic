import React from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { ResearchStation } from './index';
import { iconContainer, getCities } from '../utils';

export const CityMarkers = ({ cities }) => {
  let cityMarkers = [];
  let researchStations = [];
  if (isLoaded(cities)) {
    for (const city of Object.values(cities)) {
      cityMarkers.push(<Marker key={city.coords} position={city.coords} icon={iconContainer[city.color]} />);
      if (city.researchStation) {
        researchStations.push(<ResearchStation key={city.coords} coords={city.coords} />);
      }
    }
  }
  return (
    <div>
      {cityMarkers}
      {researchStations}
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

