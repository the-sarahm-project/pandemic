import React from 'react';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { Marker } from 'react-leaflet';
import { getCurrentPlayer, getNeighbors, getCities, iconContainer, getCurrentTurn, changeCurrentCity, getActionsRemaining, getNextActivePlayer } from '../utils';

function CityHighlightMarker({cities, currentTurn, currentPlayer, neighbors, firestore, actionsRemaining, nextActivePlayer }) {
  return (
    isLoaded(currentPlayer) && currentPlayer.isMoving && isLoaded(neighbors) && isLoaded(cities) && neighbors.map(neighbor => {
      return (
        <Marker
          position={cities[neighbor].coords}
          key={neighbor}
          icon={iconContainer.highlight}
          zIndexOffset={1001}
          onClick={() => changeCurrentCity(firestore, currentTurn, neighbor, actionsRemaining, nextActivePlayer)}
        />
      );
    })
  );
}

const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state),
    currentPlayer: getCurrentPlayer(state),
    neighbors: getNeighbors(state),
    cities: getCities(state),
    actionsRemaining: getActionsRemaining(state),
    nextActivePlayer: getNextActivePlayer(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CityHighlightMarker);
