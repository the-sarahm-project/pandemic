import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { treatDisease, getCurrentCity, getActionsRemaining, getNextTurn } from '../../utils';

export const TreatButton = ({ firestore, currentCity, disease = '', actionsRemaining, nextTurn, checkClicked }) => {
  return (
    <Button
      className="action-button treat-button"
      disabled={!disease}
      onClick={() => checkClicked(() => treatDisease({ firestore, currentCity, actionsRemaining, nextTurn }, disease.toString()))}
    >
      <Icon className="treat-icon action-icon" name="medkit" size="big" />
      <div className="treat-text action-text">Treat</div>
    </Button>
  );
};

export const mapStateToProps = (state) => {
  return {
    currentCity: getCurrentCity(state),
    actionsRemaining: getActionsRemaining(state),
    nextTurn: getNextTurn(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(TreatButton);
