import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { treatDisease, getCurrentCity } from '../../utils';

export const TreatButton = ({ firestore, currentCity, disease = [] }) => {
  return (
    <Button
      className="action-button treat-button"
      disabled={!disease.length}
      onClick={() => treatDisease({ firestore, currentCity, disease })}
    >
      <Icon className="treat-icon action-icon" name="medkit" size="big" />
      <div className="treat-text action-text">Treat</div>
    </Button>
  );
};

export const mapStateToProps = (state) => {
  return {
    currentCity: getCurrentCity(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(TreatButton);
