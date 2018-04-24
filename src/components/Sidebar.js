import React from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import PlayerMenu from './PlayerMenu';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { doc } from './utils';

const SidebarCards = ({ unusedCityCards, players, unusedEventCards }) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="right"
      visible={true}
      icon="labeled"
      inverted
      vertical
    >
      {
        isLoaded(unusedCityCards) && isLoaded(players) && isLoaded(unusedEventCards) && Object.keys(players).map(playerKey => (
          <PlayerMenu
            key={playerKey}
            playerKey={playerKey}
            players={players}
            unusedCityCards={unusedCityCards}
            unusedEventCards={unusedEventCards}
          />
        ))
      }
    </Sidebar>
  );
};

const mapStateToProps = (state) => {
  const game = state.firestore.data.games && state.firestore.data.games[doc];
  const unusedCityCards = game && game.unusedCityCards;
  const players = game && game.players;
  const unusedEventCards = game && game.unusedEventCards;
  return {
    unusedCityCards,
    players,
    unusedEventCards
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(SidebarCards);
