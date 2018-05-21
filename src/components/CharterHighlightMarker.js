import React from 'react';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { Marker } from 'react-leaflet';
import { iconContainer, getCurrentTurn, getCurrentPlayer, getCities, changeCurrentCity } from '../utils';
import { connect } from 'react-redux';
import { compose } from 'redux';

const CharterHighlightMarker = ({ currentTurn, currentPlayer, cities, firestore }) => {
  let citiesMarkers = [];
  if (isLoaded(currentPlayer) && currentPlayer.isMoving && isLoaded(cities)) {
    for (let cityKey in cities) {
      let city = cities[cityKey];
      citiesMarkers.push(
        <Marker
        position={city.coords}
        key={city.id}
        icon={iconContainer.highlight}
        zIndexOffset={1001}
        onClick={() => changeCurrentCity(firestore, currentTurn, city.id)}
       />
      );
    }
  }
  return (
    <div>
      {citiesMarkers}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: getCurrentPlayer(state),
    cities: getCities(state),
    currentTurn: getCurrentTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CharterHighlightMarker);
