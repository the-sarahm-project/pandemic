import React from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { ResearchStation } from './index';
import { doc, iconContainer } from '../utils';

const CityMarkers = ({ cities }) => {
  return (
    isLoaded(cities) &&
    Object.keys(cities).map(city => (
      <div key={cities[city].coords}>
        <Marker position={cities[city].coords} icon={iconContainer[cities[city].icon]} />
        {cities[city].researchStation && <ResearchStation coords={cities[city].coords} />}
      </div>
    ))
  );
};

const mapStateToProps = (state) => {
  const game = state.firestore.data.games && state.firestore.data.games[doc];
  const cities = game && game.cities;
  return {
    cities
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CityMarkers);

