import React from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { playerIconContainer, getCities, getPlayers, getIsDispatching, getDispatchTarget } from '../utils';

const PlayerMarkers = ({ cities, players }) => {
  return (
    isLoaded(cities) && isLoaded(players) &&
    Object.keys(players).map(playerKey => {
      const [latitude, longitude] = cities[players[playerKey].currentCity].coords;
      return (
        <Marker
          key={playerKey}
          id={playerKey}
          position={[latitude + 3, longitude]}
          icon={playerIconContainer[players[playerKey].role]}
          zIndexOffset={1000}
        />
      );
    })
  );
};

const mapStateToProps = (state) => {
  return {
    cities: getCities(state),
    players: getPlayers(state),
    isDispatching: getIsDispatching(state),
    dispatchTarget: getDispatchTarget(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerMarkers);

