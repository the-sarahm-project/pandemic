import { getCurrentTurn, getCities, getCurrentCityId } from '../../index';
import { updateActionsRemaining } from './index';
import history from '../../../history';

const doc = history.location.pathname.slice(1);

export const getNeighbors = (state) => {
  const currentTurn = getCurrentTurn(state);
  const cities = getCities(state);
  const currentCityId = getCurrentCityId(state);
  return currentTurn && cities[currentCityId].neighbors;
};

export const movePlayer = async (firestore, currentTurn) => {
  const game = await firestore.get(`games/${doc}`);
  await game.ref.collection('players').doc(`${currentTurn}`).update({isMoving: true});
};

//update the current city (move)
export const changeCurrentCity = async (firestore, currentTurn, newCity, actionsRemaining, nextActivePlayer) => {
  const game = await firestore.get(`games/${doc}`);
  await game.ref.collection('players').doc(`${currentTurn}`).update({currentCity: newCity, isMoving: false});
  await updateActionsRemaining(game, actionsRemaining, nextActivePlayer);
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
