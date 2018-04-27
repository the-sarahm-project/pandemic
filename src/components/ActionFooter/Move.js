import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { movePlayer } from '../../utils';

const Move = ({ currentTurn, neighbors, firestore }) => {
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

export default Move;
