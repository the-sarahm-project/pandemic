import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { movePlayer, getCurrentTurn, getIsMoving, getOnClick, getActionsRemaining, getCurrentHand } from '../../utils';

export const Move = ({ actionsRemaining, currentTurn, isMoving, currentHand }) => {
  const move = async () => movePlayer(currentTurn, isMoving);
  return (
    <Button
      className="action-button move-button"
      onClick={getOnClick(actionsRemaining, currentTurn, move, currentHand)}
    >
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
    isMoving: getIsMoving(state),
    actionsRemaining: getActionsRemaining(state),
    currentHand: getCurrentHand(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Move);
