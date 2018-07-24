import React from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import PlayerMenu from './PlayerMenu';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import SetName from './SetName';
import { getUnusedCityCards, getPlayers, getUnusedEventCards } from '../utils';

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
  return {
    unusedCityCards: getUnusedCityCards(state),
    players: getPlayers(state),
    unusedEventCards: getUnusedEventCards(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(SidebarCards);
