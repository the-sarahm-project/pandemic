import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { movePlayer, getCurrentTurn, getIsMoving, getOnClick, getActionsRemaining, tooManyCards } from '../../utils';

export const Move = ({ actionsRemaining, currentTurn, isMoving, tooManyCards }) => {
  const move = async () => movePlayer(currentTurn, isMoving);
  return (
    <Button
      className="action-button move-button"
      onClick={getOnClick(actionsRemaining, currentTurn, move, tooManyCards)}
    >
      <div style={{display: 'flex'}} className="move-icons">
        <Icon className="car-icon action-icon" name="car" size="big" />
          <span style={{
            fontSize: 'xx-large',
            marginTop: '6px',
            marginLeft: '2px',
            display: 'inline-block'
          }}>
            /
          </span>
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
    tooManyCards: tooManyCards(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Move);
