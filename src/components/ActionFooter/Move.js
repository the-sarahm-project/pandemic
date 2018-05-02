import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Icon, Button } from 'semantic-ui-react';
import { movePlayer, getCurrentTurn, getNeighbors } from '../../utils';

export const Move = ({ currentTurn, neighbors, firestore }) => {
  return (
    <Button className="action-button move-button" onClick={() => movePlayer(firestore, currentTurn, neighbors)}>
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
    neighbors: getNeighbors(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Move);
