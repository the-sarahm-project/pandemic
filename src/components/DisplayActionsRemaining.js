import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getActionsRemaining, getSelf, getCurrentPlayer } from '../utils';

const DisplayActionsRemaining = ({ actionsRemaining, self, currentPlayer }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0
      }}
    >
      <div>{`Your Name: ${self.name}`}</div>
      <div>{`Current Turn: ${currentPlayer.name}`}</div>
      <div>{`Actions Remaining: ${actionsRemaining}`}</div>
    </div>
  );
};

export const mapStateToProps = (state) => {
  return {
    actionsRemaining: getActionsRemaining(state),
    self: getSelf(state),
    currentPlayer: getCurrentPlayer(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(DisplayActionsRemaining);
