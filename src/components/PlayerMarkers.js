import React from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { playerIconContainer } from '../utils';
import history from '../history';

const PlayerMarkers = ({ cities, players }) => {
  return (
    isLoaded(cities) && isLoaded(players) &&
    Object.keys(players).map(playerKey => {
      const [latitude, longitude] = cities[players[playerKey].currentCity].coords;
      return (
        <Marker
          position={[latitude + 3, longitude]}
          key={playerKey}
          icon={playerIconContainer[players[playerKey].role]}
          zIndexOffset={1000}
        />
      );
    })
  );
};

const mapStateToProps = (state) => {
  const doc = history.location.pathname.slice(1);
  const game = state.firestore.data.games && state.firestore.data.games[doc];
  const cities = game && game.cities;
  const players = game && game.players;
  return {
    cities,
    players
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(PlayerMarkers);

