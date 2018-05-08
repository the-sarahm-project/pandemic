import { doc } from '../index';

//initiates move player & shows all possible locations to fly to
export const movePlayer = (firestore, currentTurn) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      game.ref.collection('players').doc(`${currentTurn}`).update({isMoving: true});
    })
    .catch(console.error);
};

//update the current city (move)
export const changeCurrentCity = (firestore, currentTurn, newCity) => {
  return firestore.get(`games/${doc}`)
  .then(game => {
    game.ref.collection('players').doc(`${currentTurn}`).update({currentCity: newCity, isMoving: false});
    return game;
  })
  .catch(console.error);
};

//update the currentCity, remove the city from unusedCityCards, and also remove from player's currentHand (flight)
export const changeCurrentHandCity = (firestore, currentTurn, newCity) => {
  let playerRef, currentGame;
  changeCurrentCity(firestore, currentTurn, newCity)
    .then(game => {
      currentGame = game;
      playerRef = game.ref.collection('players').doc(`${currentTurn}`);
      return playerRef.get();
    })
    .then(docSnapshot => {
      let {currentHand} = docSnapshot.data();
      let newHand = currentHand.filter(card => card.id !== newCity);
      return playerRef.update({currentHand: newHand});
    })
    .then(() => {
      currentGame.ref.collection('unusedCityCards').doc(`${newCity}`).delete();
    })
    .catch(console.error);
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
