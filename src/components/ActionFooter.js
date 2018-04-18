import React from 'react';
import { Sidebar, Icon, Button } from 'semantic-ui-react';
//HOC composition
import { compose } from 'redux';
//import { withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { doc } from './App';

const ActionFooter = ({ currentTurn, neighbors }) => {
  return (
    <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
      <div className="action-container">
        <Button className="action-button move-button" onClick={() => currentTurn.set({currentCity: neighbors[Math.floor(Math.random() * neighbors.length)]}, {merge: true})}>
          <div className="move-icons">
            <Icon className="car-icon action-icon" name="car" size="big" />/
            <Icon className="plane-icon action-icon" name="plane" size="big" />
          </div>
          <div className="move-text action-text">Move</div>
        </Button>
        <Button className="action-button build-button">
          <Icon className="building-icon action-icon" name="building" size="big" />
          <div className="build-text action-text">Build</div>
        </Button>
        <Button className="action-button share-button">
          <Icon className="share-icon action-icon" name="gift" size="big" />
          <div className="share-text action-text">Share</div>
        </Button>
        <Button className="action-button treat-button">
          <Icon className="treat-icon action-icon" name="medkit" size="big" />
          <div className="treat-text action-text">Treat</div>
        </Button>
        <Button className="action-button cure-button">
          <Icon className="cure-icon action-icon" name="lab" size="big" />
          <div className="cure-text action-text">Cure</div>
        </Button>
      </div>
    </Sidebar>
  );
};

const mapStateToProps = (state) => {
  const game = state.firestore.data.games && state.firestore.data.games[doc];
  const currentTurn = game && game.currentTurn;
  const cities = game && game.cities;
  const players = game && game.players;
  const neighbors = currentTurn && cities[players[currentTurn.id].currentCity].neighbors;
  return {
    currentTurn,
    neighbors
  };
}

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(ActionFooter);
