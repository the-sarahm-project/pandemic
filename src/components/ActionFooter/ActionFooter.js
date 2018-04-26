import React from 'react';
import { Sidebar, Icon, Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ChoosePlayerModal, ChooseCardModal } from '../index';
import { doc, movePlayer, setCityResearchStation, shareKnowledgePlayers, shareKnowledge, researchStationButtonDisabled } from '../../utils';

const ActionFooter = ({ currentTurn, neighbors, firestore, sharePlayers, buildDisabled, currentCity, unusedCityCards, sameColorCityCards, shareDisabled }) => {
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
        <ChooseCardModal
          ModalTrigger={(
            <Button
              className="action-button build-button"
              disabled={buildDisabled}
              style={{height: '100%'}}
            >
              <Icon className="building-icon action-icon" name="building" size="big" />
              <div className="build-text action-text">Build</div>
            </Button>
          )}
          disabled={buildDisabled}
          cards={sameColorCityCards}
          action={setCityResearchStation.bind(this, firestore, currentTurn, currentCity, unusedCityCards)}
        />
        <ChoosePlayerModal
          ModalTrigger={(
            <Button
              className="action-button share-button"
              disabled={shareDisabled}
            >
              <Icon className="share-icon action-icon" name="gift" size="big" />
              <div className="share-text action-text">Share</div>
            </Button>)}
          disabled={shareDisabled}
          players={sharePlayers}
          action={shareKnowledge.bind(this, firestore, currentTurn, currentCity)}
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
  const currentCityId = players && currentTurn && players[currentTurn].currentCity;
  const playersInSameCity = players && Object.entries(players).filter(player =>
    player[1].currentCity === currentCityId && Number(player[0]) !== currentTurn
  );
  const neighbors = currentTurn && cities[currentCityId].neighbors;
  const sharePlayers = shareKnowledgePlayers(playersInSameCity, currentCityId, currentPlayer);
  const remainingResearchStations = game && game.remainingResearchStations;
  const currentHand = currentPlayer && currentPlayer.currentHand;
  const unusedCityCards = game && game.unusedCityCards;
  const currentCity = cities && cities[currentCityId];
  const buildDisabled = researchStationButtonDisabled(remainingResearchStations, currentCity, currentHand, unusedCityCards);
  const shareDisabled = sharePlayers && !sharePlayers.length;
  const sameColorCityCards = currentHand && currentHand.filter(card => unusedCityCards[card.id].color === currentCity.color );
  return {
    currentTurn,
    neighbors,
    sharePlayers,
    buildDisabled,
    currentCity,
    unusedCityCards,
    sameColorCityCards,
    shareDisabled
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(ActionFooter);
