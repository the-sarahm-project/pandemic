import React from 'react';
import { Marker } from 'react-leaflet';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentPlayer, getNeighbors, getCities, iconContainer } from '../utils';

const CurrentHandHighlightMarker = ({ firestore, currentPlayer, neighbors, cities }) => {
  const availableCities = currentPlayer && currentPlayer.currentHand.filter(cardRef => !neighbors.find(neighbor => cardRef.id === neighbor.id));
  console.log('current player', availableCities, neighbors);
  return (
    isLoaded(currentPlayer) && currentPlayer.isMoving && availableCities.map(cardRef => {
      return (
        <Marker
          position={cities[cardRef.id].coords}
          key={cardRef.id}
          icon={iconContainer.highlight}
          onClick={() => console.log('woohoo cards!')}
        />
      );
    })
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: getCurrentPlayer(state),
    neighbors: getNeighbors(state),
    cities: getCities(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CurrentHandHighlightMarker);
