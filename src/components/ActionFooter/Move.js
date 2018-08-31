import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { movePlayer, getCurrentTurn, getIsMoving, getOnClick, getActionsRemaining, tooManyCards, getDispatching, getSelf, isCurrentTurn } from '../../utils';

export const Move = ({ self, actionsRemaining, currentTurn, isMoving, tooManyCards, dispatching }) => {
  const move = async () => movePlayer(currentTurn, isMoving);
  return (
    <Button
      className="action-button move-button"
      onClick={getOnClick(actionsRemaining, currentTurn, move, tooManyCards, dispatching)}
      positive={self.isMoving}
      disabled={!isCurrentTurn(currentTurn)}
    >
      <div style={{display: 'flex'}} className="move-icons">
        <Icon className="car-icon action-icon" name="car" size="large" />
          <span style={{
            fontSize: 'x-large',
            marginTop: '3px',
            marginLeft: '2px',
            display: 'inline-block'
          }}>
            /
          </span>
        <Icon className="plane-icon action-icon" name="plane" size="large" />
      </div>
      <div className="move-text action-text">Move</div>
    </Button>
  );
};

export const mapStateToProps = (state) => {
  return {
    self: getSelf(state),
    currentTurn: getCurrentTurn(state),
    isMoving: getIsMoving(state),
    actionsRemaining: getActionsRemaining(state),
    tooManyCards: tooManyCards(state),
    dispatching: getDispatching(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Move);
