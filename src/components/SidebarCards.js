import React from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import PlayerMenu from './PlayerMenu';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import SetName from './SetName';
import history from '../history';

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
      <SetName />
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
  const doc = history.location.pathname.slice(1);
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
