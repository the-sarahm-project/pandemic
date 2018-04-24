import React from 'react';
import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { doc } from './utils';

const PlayerIcon = L.Icon.extend({
  options: {
    iconSize: [50, 50]
  }
});

const playerIconContainer = {
  'Contingency Planner': new PlayerIcon({ iconUrl: 'assets/images/cont_planner.png' }),
  Dispatcher: new PlayerIcon({ iconUrl: 'assets/images/dispatcher.png' }),
  Medic: new PlayerIcon({ iconUrl: 'assets/images/medic.png' }),
  'Operations Expert': new PlayerIcon({ iconUrl: 'assets/images/ops_expert.png' }),
  'Quarantine Specialist': new PlayerIcon({ iconUrl: 'assets/images/quar_spec.png' }),
  Researcher: new PlayerIcon({ iconUrl: 'assets/images/researcher.png' }),
  Scientist: new PlayerIcon({ iconUrl: 'assets/images/scientist.png' }),
};

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

