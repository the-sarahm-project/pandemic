import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { ChooseCardModal } from '../index';
import { doc, setCityResearchStation, researchStationButtonDisabled } from '../../utils';

const Build = ({ currentTurn, firestore, buildDisabled, currentCity, unusedCityCards, sameColorCityCards }) => {
  return (
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
  );
};

export default Build;

// const mapStateToProps = (state) => {
//   const game = state.firestore.data.games && state.firestore.data.games[doc];
//   const currentTurn = game && game.currentTurn;
//   const cities = game && game.cities;
//   const players = game && game.players;
//   const unusedCityCards = game && game.unusedCityCards;
//   const remainingResearchStations = game && game.remainingResearchStations;
//   const currentPlayer = players && players[currentTurn];
//   const currentCityId = players && currentTurn && players[currentTurn].currentCity;
//   const currentHand = currentPlayer && currentPlayer.currentHand;
//   const currentCity = cities && cities[currentCityId];
//   const buildDisabled = researchStationButtonDisabled(remainingResearchStations, currentCity, currentHand, unusedCityCards);
//   const sameColorCityCards = currentHand && currentHand.filter(card => unusedCityCards[card.id].color === currentCity.color );
//   return {
//     currentTurn,
//     buildDisabled,
//     currentCity,
//     unusedCityCards,
//     sameColorCityCards
//   };
// };

// export default compose(
//   firestoreConnect(),
//   connect(mapStateToProps)
// )(Build);
