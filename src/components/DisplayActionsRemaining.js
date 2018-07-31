import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getActionsRemaining } from '../utils';

const DisplayActionsRemaining = ({ actionsRemaining }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0
      }}
    >
      {`Actions Remaining: ${actionsRemaining}`}
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    actionsRemaining: getActionsRemaining(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(DisplayActionsRemaining);
