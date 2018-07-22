import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { buildResearchStation, getCurrentCityId, getBuildDisabled, getCurrentTurn, getActionsRemaining, getNextTurn } from '../../utils';

export const Build = ({ firestore, currentCityId, buildButtonDisabled, currentTurn, actionsRemaining, nextTurn, checkClicked }) => {
  return (
    <Button
      className="action-button build-button"
      disabled={buildButtonDisabled}
      onClick={() => checkClicked(() => buildResearchStation(firestore, currentCityId, currentTurn, actionsRemaining, nextTurn))}
    >
      <Icon className="build-icon action-icon" name="building" size="big" />
      <div className="build-text action-text">Build</div>
    </Button>
  );
};

export const mapStateToProps = (state) => {
  return {
    currentCityId: getCurrentCityId(state),
    buildButtonDisabled: getBuildDisabled(state),
    currentTurn: getCurrentTurn(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Build);
