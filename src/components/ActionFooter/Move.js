import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { movePlayer, getCurrentTurn, getActionsRemaining, getNextActivePlayer } from '../../utils';

export const Move = ({ currentTurn, firestore, actionsRemaining, nextActivePlayer }) => {
  return (
    <Button className="action-button move-button" onClick={() => movePlayer(firestore, currentTurn, actionsRemaining, nextActivePlayer)}>
      <div className="move-icons">
        <Icon className="car-icon action-icon" name="car" size="big" />/
        <Icon className="plane-icon action-icon" name="plane" size="big" />
      </div>
      <div className="move-text action-text">Move</div>
    </Button>
  );
};

export const mapStateToProps = (state) => {
  return {
    currentTurn: getCurrentTurn(state),
    actionsRemaining: getActionsRemaining(state),
    nextActivePlayer: getNextActivePlayer(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Move);
