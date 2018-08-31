import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { buildResearchStation, getBuildDisabled, getCurrentTurn, getActionsRemaining, getNextTurn, getOnClick, tooManyCards, getSelf, getDispatching, getUnusedCityCards, isCurrentTurn } from '../../utils';

export const Build = ({ buildButtonDisabled, actionsRemaining, nextTurn, checkClicked, currentTurn, tooManyCards, self, dispatching, unusedCityCards }) => {
  const build = () => buildResearchStation(self, unusedCityCards, actionsRemaining, nextTurn);
  return (
    <Button
      className="action-button build-button"
      disabled={!isCurrentTurn(currentTurn) || buildButtonDisabled}
      onClick={() => checkClicked(getOnClick(actionsRemaining, currentTurn, build, tooManyCards, dispatching))}
    >
      <Icon className="build-icon action-icon" name="building" size="large" />
      <div className="build-text action-text">Build</div>
    </Button>
  );
};

export const mapStateToProps = (state) => {
  return {
    buildButtonDisabled: getBuildDisabled(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state),
    currentTurn: getCurrentTurn(state),
    tooManyCards: tooManyCards(state),
    self: getSelf(state),
    dispatching: getDispatching(state),
    unusedCityCards: getUnusedCityCards(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Build);
