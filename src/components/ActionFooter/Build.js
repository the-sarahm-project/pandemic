import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { ChooseCardModal } from '../index';
import { setCityResearchStation, getCurrentTurn, getBuildDisabled, getCurrentCity, getUnusedCityCards, getSameColorCityCards } from '../../utils';

export const Build = ({ currentTurn, firestore, buildDisabled, currentCity, unusedCityCards, sameColorCityCards }) => {
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

export const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state),
    buildDisabled: getBuildDisabled(state),
    currentCity: getCurrentCity(state),
    unusedCityCards: getUnusedCityCards(state),
    sameColorCityCards: getSameColorCityCards(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Build);
