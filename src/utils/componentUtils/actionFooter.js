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

export const setCityResearchStation = (firestore, currentTurn, currentCity, unusedCityCards, cardsToRemove) => {
  if (cardsToRemove.length < 5) {
    console.log('Not enough cards selected');
    return;
  }
  firestore.get(`games/${doc}`)
    .then(game => {
      const currentCityId = currentCity.id;
      const currentCityRef = game.ref.collection('cities').doc(currentCityId);
      let remainingResearchStations = game.data().remainingResearchStations;
      //build research station
      currentCityRef.update({ researchStation: true });
      remainingResearchStations--;
      game.ref.update({ remainingResearchStations });
      const currentTurnRef = game.ref.collection('players').doc(`${currentTurn}`);
      return currentTurnRef.get();
    })
    .then((currentPlayerSnapshot) => {
      //update currentHand
      const currentHand = currentPlayerSnapshot.data().currentHand;
      const newCurrentHand = currentHand.filter(card => unusedCityCards[card.id].color !== currentCity.color);
      currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
      //remove cards from unusedCityCards
      for (let card of cardsToRemove) {
        card.delete();
      }
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
      const currentCityId = currentCity.id;
      const currentCityRef = game.ref.collection('unusedCityCards').doc(currentCityId);
      const currentPlayerRef = players.doc(`${currentTurn}`);
      const targetPlayerRef = players.doc(playerNumber);
      return Promise.all([currentPlayerRef.get(), targetPlayerRef.get(), currentCityRef.get()]);
    })
    .then(([currentPlayerSnapshot, targetPlayerSnapshot, currentCitySnapshot]) => {
      let newCurrentHand;
      let newTargetHand;
      // city card is in current player's hand
      if (currentPlayerSnapshot.data().currentHand.find(card => card.id === currentCity.name)) {
        newCurrentHand = currentPlayerSnapshot.data().currentHand.filter(card => card.id !== currentCity.name);
        newTargetHand = targetPlayerSnapshot.data().currentHand.concat(currentCitySnapshot.ref);
      }
      // city card is in another player's hand
      else {
        newCurrentHand = currentPlayerSnapshot.data().currentHand.concat(currentCitySnapshot.ref);
        newTargetHand = targetPlayerSnapshot.data().currentHand.filter(card => card.id !== currentCity.name);
      }
      currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
      targetPlayerSnapshot.ref.update({ currentHand: newTargetHand});
    })
    .catch(err => console.log(err));
};
