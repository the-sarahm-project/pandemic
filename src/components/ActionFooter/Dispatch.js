import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react/dist/commonjs';
import { dispatch, getCurrentTurn, getActionsRemaining, getOnClick, getIsDispatching, tooManyCards, getDispatchTarget, getIsMoving } from '../../utils';

export const Dispatch = ({ actionsRemaining, currentTurn, isDispatching, tooManyCards, dispatchTarget, isMoving }) => {
  const setDispatching = () => dispatch(dispatchTarget, isDispatching);
  return (
    <Button
      className="action-button dispatch-button"
      onClick={getOnClick(actionsRemaining, currentTurn, setDispatching, tooManyCards, isMoving)}
      positive={isDispatching || Boolean(dispatchTarget)}
    >
      <Icon className="dispatch-icon action-icon" name="travel" size="large" />
      <div className="dispatch-text action-text">Dispatch</div>
    </Button>
  );
};

export const mapStateToProps = (state) => {
  return {
    actionsRemaining: getActionsRemaining(state),
    currentTurn: getCurrentTurn(state),
    isDispatching: getIsDispatching(state),
    tooManyCards: tooManyCards(state),
    dispatchTarget: getDispatchTarget(state),
    isMoving: getIsMoving(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Dispatch);
