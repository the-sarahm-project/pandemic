import { doc } from '../index';

export const movePlayer = (firestore, currentTurn, neighbors) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      game.ref.collection('players').doc(`${currentTurn}`).update({ currentCity: neighbors[Math.floor(Math.random() * neighbors.length)] });
    })
    .catch(err => console.log(err));
};

export const researchStationButtonDisabled = (numResearchStations, currentCity, currentHand, unusedCityCards) => {
  const enoughCards = currentHand && currentHand.filter(card => unusedCityCards[card.id].color === currentCity.color).length;
  const researchStation = currentCity && currentCity.researchStation;
  return numResearchStations <= 0 || researchStation || enoughCards < 5;
};

export const setCityResearchStation = (firestore, currentTurn, cities, currentCity) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      const currentCityRef = game.ref.collection('cities').doc(currentCity);
      let remainingResearchStations = game.data().remainingResearchStations;
      currentCityRef.update({ researchStation: true });
      remainingResearchStations--;
      game.ref.update({ remainingResearchStations });
    })
    .catch(err => console.log(err));
};

export const shareKnowledgePlayers = (playersInSameCity, currentCity, currentPlayer) => {
  if (!playersInSameCity || !currentCity || !currentPlayer) return;
  if (currentPlayer.currentHand.find(card => card.id === currentCity)) return playersInSameCity;
  else return playersInSameCity.filter(player => player[1].currentHand.find(card => card.id === currentCity));
};

export const shareKnowledge = (firestore, currentTurn, currentCity, playerNumber) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      const players = game.ref.collection('players');
      const currentCityRef = game.ref.collection('unusedCityCards').doc(currentCity);
      const currentPlayerRef = players.doc(`${currentTurn}`);
      const targetPlayerRef = players.doc(playerNumber);
      return Promise.all([currentPlayerRef.get(), targetPlayerRef.get(), currentCityRef.get()]);
    })
    .then(([currentPlayerSnapshot, targetPlayerSnapshot, currentCitySnapshot]) => {
      let newCurrentHand;
      let newTargetHand;
      // city card is in current player's hand
      if (currentPlayerSnapshot.data().currentHand.find(card => card.id === currentCity)) {
        newCurrentHand = currentPlayerSnapshot.data().currentHand.filter(card => card.id !== currentCity);
        newTargetHand = targetPlayerSnapshot.data().currentHand.concat(currentCitySnapshot.ref);
      }
      // city card is in another player's hand
      else {
        newCurrentHand = currentPlayerSnapshot.data().currentHand.concat(currentCitySnapshot.ref);
        newTargetHand = targetPlayerSnapshot.data().currentHand.filter(card => card.id !== currentCity);
      }
      currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
      targetPlayerSnapshot.ref.update({ currentHand: newTargetHand});
    })
    .catch(err => console.log(err));
};
