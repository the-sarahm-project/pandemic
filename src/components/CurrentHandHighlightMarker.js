import React from 'react';
import { Marker } from 'react-leaflet';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentPlayer, getNeighbors, getCities, iconContainer, getCurrentTurn, changeCurrentHandCity } from '../utils';

const CurrentHandHighlightMarker = ({ firestore, currentPlayer, neighbors, cities, currentTurn }) => {
  const availableCities = currentPlayer && currentPlayer.currentHand.filter(cardRef => !neighbors.find(neighbor => cardRef.id === neighbor) && !!cities[cardRef.id] && cardRef.id !== currentPlayer.currentCity);
  return (
    isLoaded(currentPlayer) && isLoaded(cities) && currentPlayer.isMoving && availableCities.map(cardRef => {
      return (
        <Marker
          position={cities[cardRef.id].coords}
          key={cardRef.id}
          icon={iconContainer.highlight}
          zIndexOffset={1001}
          onClick={() => changeCurrentHandCity(firestore, currentTurn, cardRef.id)}
        />
      );
    })
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: getCurrentPlayer(state),
    neighbors: getNeighbors(state),
    cities: getCities(state),
    currentTurn: getCurrentTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CurrentHandHighlightMarker);
