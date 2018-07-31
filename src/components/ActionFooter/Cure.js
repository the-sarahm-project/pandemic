import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { ChooseCardModal } from '../index';
import { cureDisease, getCurrentTurn, getCureDisabled, getOwnCity, getMaxSameColorCityCards, getActionsRemaining, getNextTurn, getOwnId, isCurrentTurn } from '../../utils';

export const Cure = ({ currentTurn, cureDisabled, ownCity, maxSameColorCityCards, actionsRemaining, nextTurn, ownId }) => {
  return (
    <ChooseCardModal
      ModalTrigger={(
        <Button
          className="action-button cure-button"
          disabled={cureDisabled}
          style={{height: '100%'}}
        >
          <Icon className="lab-icon action-icon" name="lab" size="big" />
          <div className="cure-text action-text">Cure</div>
        </Button>
      )}
      disabled={cureDisabled}
      cards={maxSameColorCityCards}
      action={cureDisease.bind(this, ownId, ownCity, actionsRemaining, nextTurn)}
      clickable={isCurrentTurn(currentTurn)}
    />
  );
};

export const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state),
    cureDisabled: getCureDisabled(state),
    ownCity: getOwnCity(state),
    maxSameColorCityCards: getMaxSameColorCityCards(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state),
    ownId: getOwnId()
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Cure);
