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
    unusedCityCards = games.ytQnw2I0gonsoYXo6M02.unusedCityCards;
    players = games.ytQnw2I0gonsoYXo6M02.players;
    unusedEventCards = games.ytQnw2I0gonsoYXo6M02.unusedEventCards;
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
      width="wide"
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
)};

const mapStateToProps = (state) => ({
  games: state.firestore.data.games
});

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(SidebarCards);
