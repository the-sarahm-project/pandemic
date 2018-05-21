import { doc, getCurrentTurn, getCities, getCurrentCityId } from '../../index';

export const getNeighbors = (state) => {
  const currentTurn = getCurrentTurn(state);
  const cities = getCities(state);
  const currentCityId = getCurrentCityId(state);
  return currentTurn && cities[currentCityId].neighbors;
};

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
      const { currentHand } = docSnapshot.data();
      const newHand = currentHand.filter(card => card.id !== newCity);
      return playerRef.update({currentHand: newHand});
    })
    .then(() => {
      currentGame.ref.collection('unusedCityCards').doc(`${newCity}`).delete();
    })
    .catch(console.error);
};
