import { doc } from './index';

export const movePlayer = (firestore, currentTurn, neighbors) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      game.ref.collection('players').doc(`${currentTurn}`).update({ currentCity: neighbors[Math.floor(Math.random() * neighbors.length)] });
    })
    .catch(err => console.log(err));
};

export const setCityResearchStation = (firestore, currentTurn, cities, currentCity) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      const currentCityRef = game.ref.collection('cities').doc(currentCity);
      const currentResearchStation = cities[currentCity].researchStation;
      let remainingResearchStations = game.data().remainingResearchStations;
      if (!currentResearchStation && remainingResearchStations > 0) {
        currentCityRef.update({ researchStation: true });
        remainingResearchStations--;
        game.ref.update({ remainingResearchStations });
      } else if (currentResearchStation) {
        console.log('There is already a research station at the current city');
      } else {
        console.log('You lose because no more research stations');
      }
    })
    .catch(err => console.log(err));
};

export const shareKnowledgeDisabled = (playersInSameCity, currentCity, currentPlayer) => {
  if (!playersInSameCity || !currentCity || !currentPlayer) return true;
  return !playersInSameCity.length || !currentPlayer.currentHand.some(card => card.id === currentCity);
};

export const shareKnowledge = (firestore, currentTurn, currentCity, playerNumber) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      const players = game.ref.collection('players');
      const currentCityRef = game.ref.collection('cities').doc(currentCity);
      const currentPlayerRef = players.doc(`${currentTurn}`);
      const targetPlayerRef = players.doc(playerNumber);
      return Promise.all([currentPlayerRef.get(), targetPlayerRef.get(), currentCityRef.get()]);
    })
    .then(([currentPlayerSnapshot, targetPlayerSnapshot, currentCitySnapshot]) => {
      const newCurrentHand = currentPlayerSnapshot.data().currentHand.filter(card => card.id !== currentCity);
      const newTargetHand = targetPlayerSnapshot.data().currentHand.concat(currentCitySnapshot.ref);
      currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
      targetPlayerSnapshot.ref.update({ currentHand: newTargetHand});
    })
    .catch(err => console.log(err));
};
