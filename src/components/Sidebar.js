import React from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import PlayerMenu from './PlayerMenu';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { connect } from 'react-redux';

const SidebarCards = (props) => {
  const { games } = props;
  let unusedCityCards = {}, players = {}, unusedEventCards = {};
  if (games) {
    unusedCityCards = games['9irA2eJaPOcagTs53dkV'].unusedCityCards;
    players = games['9irA2eJaPOcagTs53dkV'].players;
    unusedEventCards = games['9irA2eJaPOcagTs53dkV'].unusedEventCards;
  }
  const playerKeys = Object.keys(players);
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
        games && unusedCityCards && playerKeys.map(playerKey => (
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

const mapStateToProps = (state) => ({
  games: state.firestore.data.games
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(SidebarCards);
