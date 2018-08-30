import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { ChooseCardModal } from '../index';
import { cureDisease, getCurrentTurn, getCureDisabled, getSelf, getMaxSameColorCityCards, getActionsRemaining, getNextTurn, isCurrentTurn, getOnClick, tooManyCards, getDispatching, getUnusedCityCards } from '../../utils';

export const Cure = ({ currentTurn, cureDisabled, self, maxSameColorCityCards, actionsRemaining, nextTurn, tooManyCards, dispatching, unusedCityCards }) => {
  maxSameColorCityCards = maxSameColorCityCards[1]; // 0 is color
  const cure = () => cureDisease(self, unusedCityCards, actionsRemaining, nextTurn, maxSameColorCityCards);
  return (
    maxSameColorCityCards.length === 5 || (self.role === 'Scientist' && maxSameColorCityCards.length === 4) ?
    <Button
      className="action-button cure-button"
      disabled={!isCurrentTurn(currentTurn) || cureDisabled}
      style={{height: '100%'}}
      onClick={getOnClick(actionsRemaining, currentTurn, cure, tooManyCards, dispatching)}
    >
      <Icon className="lab-icon action-icon" name="lab" size="large" />
      <div className="cure-text action-text">Cure</div>
    </Button>
    : <ChooseCardModal
      ModalTrigger={(
        <Button
          className="action-button cure-button"
          disabled={cureDisabled}
          style={{height: '100%'}}
        >
          <Icon className="lab-icon action-icon" name="lab" size="large" />
          <div className="cure-text action-text">Cure</div>
        </Button>
      )}
      actionsRemaining={actionsRemaining}
      disabled={cureDisabled}
      cards={maxSameColorCityCards}
      action={cureDisease.bind(this, self, actionsRemaining, nextTurn)}
      clickable={actionsRemaining && isCurrentTurn(currentTurn) && !tooManyCards && !dispatching}
    />
  );
};

export const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state),
    cureDisabled: getCureDisabled(state),
    maxSameColorCityCards: getMaxSameColorCityCards(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state),
    self: getSelf(state),
    tooManyCards: tooManyCards(state),
    dispatching: getDispatching(state),
    unusedCityCards: getUnusedCityCards(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Cure);
