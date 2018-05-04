import { doc } from '../index';

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
