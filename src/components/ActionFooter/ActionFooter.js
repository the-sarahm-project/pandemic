import React from 'react';
import { Sidebar, Icon, Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ChoosePlayerModal, ChooseCardModal } from '../index';
import { doc, setCityResearchStation, shareKnowledgePlayers, shareKnowledge, researchStationButtonDisabled } from '../../utils';
import { MoveContainer, BuildContainer, ShareContainer } from './index';

const ActionFooter = ({ currentTurn, firestore, sharePlayers, buildDisabled, currentCity, unusedCityCards, sameColorCityCards, shareDisabled }) => {
  return (
    <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
      <div className="action-container">
        <MoveContainer />
        <BuildContainer />
        <ShareContainer />
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

export default ActionFooter;
// const mapStateToProps = (state) => {
//   const game = state.firestore.data.games && state.firestore.data.games[doc];
//   const currentTurn = game && game.currentTurn;
//   const cities = game && game.cities;
//   const players = game && game.players;
//   const currentPlayer = players && players[currentTurn];
//   const currentCityId = players && currentTurn && players[currentTurn].currentCity;
//   const playersInSameCity = players && Object.entries(players).filter(player =>
//     player[1].currentCity === currentCityId && Number(player[0]) !== currentTurn
//   );
//   const neighbors = currentTurn && cities[currentCityId].neighbors;
//   const sharePlayers = shareKnowledgePlayers(playersInSameCity, currentCityId, currentPlayer);
//   const remainingResearchStations = game && game.remainingResearchStations;
//   const currentHand = currentPlayer && currentPlayer.currentHand;
//   const unusedCityCards = game && game.unusedCityCards;
//   const currentCity = cities && cities[currentCityId];
//   const buildDisabled = researchStationButtonDisabled(remainingResearchStations, currentCity, currentHand, unusedCityCards);
//   const shareDisabled = sharePlayers && !sharePlayers.length;
//   const sameColorCityCards = currentHand && currentHand.filter(card => unusedCityCards[card.id].color === currentCity.color );
//   return {
//     currentTurn,
//     neighbors,
//     sharePlayers,
//     buildDisabled,
//     currentCity,
//     unusedCityCards,
//     sameColorCityCards,
//     shareDisabled
//   };
// };

// export default compose(
//   firestoreConnect(),
//   connect(mapStateToProps)
// )(ActionFooter);
