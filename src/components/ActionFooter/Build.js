import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { buildResearchStation, getOwnCityId, getBuildDisabled, getCurrentTurn, getActionsRemaining, getNextTurn, getOnClick, getOwnId, tooManyCards } from '../../utils';

export const Build = ({ ownCityId, buildButtonDisabled, ownId, actionsRemaining, nextTurn, checkClicked, currentTurn, tooManyCards }) => {
  const build = () => buildResearchStation(ownCityId, ownId, actionsRemaining, nextTurn);
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
    ownCityId: getOwnCityId(state),
    buildButtonDisabled: getBuildDisabled(state),
    ownId: getOwnId(),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state),
    currentTurn: getCurrentTurn(state),
    tooManyCards: tooManyCards(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Build);
