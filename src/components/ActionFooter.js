import React from 'react';
import { Sidebar, Icon, Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { doc } from './App';

const ActionFooter = ({ currentTurn, neighbors, cities, firestore }) => {
  return (
    <Sidebar className="action-footer" direction="bottom" visible={true} width="very wide">
      <div className="action-container">
        <Button className="action-button move-button" onClick={() => currentTurn.set({ currentCity: neighbors[Math.floor(Math.random() * neighbors.length)] }, { merge: true })}>
          <div className="move-icons">
            <Icon className="car-icon action-icon" name="car" size="big" />/
            <Icon className="plane-icon action-icon" name="plane" size="big" />
          </div>
          <div className="move-text action-text">Move</div>
        </Button>
        <Button className="action-button build-button" onClick={() => setCityResearchStation(firestore, currentTurn, cities)}>
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
    neighbors,
    cities
  };
};

function setCityResearchStation(firestore, currentTurn, cities) {
  Promise.all([currentTurn && currentTurn.get(), firestore.get(`games/${doc}`)])
    .then(([player, game]) => {
      const currentCity = player.data().currentCity;
      const currentCityRef = game.ref.collection('cities').doc(currentCity);
      const currentResearchStation = cities[currentCity].researchStation;
      let remainingResearchStations = game.data().remainingResearchStations;
      if (!currentResearchStation && remainingResearchStations >= 0) {
        currentCityRef.update({ researchStation: true });
        remainingResearchStations--;
        game.ref.update({ remainingResearchStations });
      } else if (currentResearchStation) {
        console.log('There is already a research station at the current city');
      } else {
        console.log('You lose because no more research stations');
      }
    });
}

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(ActionFooter);
