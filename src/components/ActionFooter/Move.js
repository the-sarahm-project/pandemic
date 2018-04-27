import React from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { doc, movePlayer } from '../../utils';

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

// const mapStateToProps = (state) => {
//   const game = state.firestore.data.games && state.firestore.data.games[doc];
//   const currentTurn = game && game.currentTurn;
//   const cities = game && game.cities;
//   const players = game && game.players;
//   const currentCityId = players && currentTurn && players[currentTurn].currentCity;
//   const neighbors = currentTurn && cities[currentCityId].neighbors;
//   return {
//     currentTurn,
//     neighbors
//   };
// };

// export default compose(
//   firestoreConnect(),
//   connect(mapStateToProps)
// )(Move);
