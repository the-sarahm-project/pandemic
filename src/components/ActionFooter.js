import React from 'react';
import { Sidebar, Icon, Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ChoosePlayerModal } from './index';
import { doc, movePlayer, setCityResearchStation, shareKnowledgeDisabled, shareKnowledge } from '../utils';

const ActionFooter = ({ currentTurn, neighbors, cities, firestore, currentCity, playersInSameCity, currentPlayer }) => {
  return (
    <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
      <div className="action-container">
        <Button className="action-button move-button" onClick={() => movePlayer(firestore, currentTurn, neighbors)}>
          <div className="move-icons">
            <Icon className="car-icon action-icon" name="car" size="big" />/
            <Icon className="plane-icon action-icon" name="plane" size="big" />
          </div>
          <div className="move-text action-text">Move</div>
        </Button>
        <Button className="action-button build-button" onClick={() => setCityResearchStation(firestore, currentTurn, cities, currentCity)}>
          <Icon className="building-icon action-icon" name="building" size="big" />
          <div className="build-text action-text">Build</div>
        </Button>
        <ChoosePlayerModal
          ModalTrigger={(
            <Button
              className="action-button share-button"
              disabled={shareKnowledgeDisabled(playersInSameCity, currentCity, currentPlayer)}
            >
              <Icon className="share-icon action-icon" name="gift" size="big" />
              <div className="share-text action-text">Share</div>
            </Button>)}
          players={playersInSameCity}
          action={shareKnowledge.bind(this, firestore, currentTurn, currentCity)}
          disabled={shareKnowledgeDisabled.bind(this, playersInSameCity, currentCity, currentPlayer)}
        />
        <Button className="action-button treat-button" >
          <Icon className="treat-icon action-icon" name="medkit" size="big" />
          <div className="treat-text action-text">Treat</div>
        </Button>
        <Button className="action-button cure-button">
          <Icon className="cure-icon action-icon" name="lab" size="big" />
          <div className="cure-text action-text">Cure</div>
        </Button>
      </div>
    </Sidebar>
  );
};

const mapStateToProps = (state) => {
  const game = state.firestore.data.games && state.firestore.data.games[doc];
  const currentTurn = game && game.currentTurn;
  const cities = game && game.cities;
  const players = game && game.players;
  const currentPlayer = players && players[currentTurn];
  const currentCity = players && currentTurn && players[currentTurn].currentCity;
  const playersInSameCity = players && Object.entries(players).filter(player =>
    player[1].currentCity === currentCity && Number(player[0]) !== currentTurn
  );
  const neighbors = currentTurn && cities[currentCity].neighbors;
  return {
    currentTurn,
    neighbors,
    cities,
    currentCity,
    playersInSameCity,
    currentPlayer
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(ActionFooter);
