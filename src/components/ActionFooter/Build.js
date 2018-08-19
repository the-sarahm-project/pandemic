import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { buildResearchStation, getBuildDisabled, getCurrentTurn, getActionsRemaining, getNextTurn, getOnClick, tooManyCards, getSelf } from '../../utils';

export const Build = ({ buildButtonDisabled, actionsRemaining, nextTurn, checkClicked, currentTurn, tooManyCards, self }) => {
  const build = () => buildResearchStation(self, actionsRemaining, nextTurn);
  return (
    <Button
      className="action-button build-button"
      disabled={buildButtonDisabled}
      onClick={() => checkClicked(getOnClick(actionsRemaining, currentTurn, build, tooManyCards))}
    >
      <Icon className="build-icon action-icon" name="building" size="big" />
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
    self: getSelf(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Build);
