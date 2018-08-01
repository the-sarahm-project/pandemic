import React from 'react';
import { Marker } from 'react-leaflet';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCurrentPlayer, getNeighbors, getCities, iconContainer, getCurrentTurn, changeCurrentHandCity, getActionsRemaining, getNextTurn, getCurrentHand } from '../utils';

const CurrentHandHighlightMarker = ({ currentPlayer, neighbors, cities, currentTurn, actionsRemaining, nextTurn, currentHand }) => {
  const isNeighbor = cardRefId => neighbors.find(neighbor => neighbor === cardRefId);
  const isCurrentCity = cardRefId => cardRefId === currentPlayer.currentCity;
  const isCityCard = cardRefId => cities[cardRefId];
  return (
    currentPlayer.isMoving && currentPlayer.currentHand.reduce((markers, cardRef) => {
      if (!isNeighbor(cardRef.id) && !isCurrentCity(cardRef.id) && isCityCard(cardRef.id)) {
        markers.push(
          <Marker
            position={cities[cardRef.id].coords}
            key={cardRef.id}
            icon={iconContainer.highlight}
            zIndexOffset={1001}
            onClick={() => changeCurrentHandCity(currentTurn, cardRef.id, currentHand, actionsRemaining, nextTurn)}
          />
        );
      }
      return markers;
    }, [])
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlayer: getCurrentPlayer(state),
    neighbors: getNeighbors(state),
    cities: getCities(state),
    currentTurn: getCurrentTurn(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state),
    currentHand: getCurrentHand(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(CurrentHandHighlightMarker);
