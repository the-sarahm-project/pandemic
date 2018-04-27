import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Build, Cure, Move, Share, Treat } from './index';
import { doc, shareKnowledgePlayers, researchStationButtonDisabled } from '../../utils';

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

export const BuildContainer = compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Build);

export const CureContainer = compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Cure);

export const MoveContainer = compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Move);

export const ShareContainer = compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Share);

export const TreatContainer = compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Treat);
