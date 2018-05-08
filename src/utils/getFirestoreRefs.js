import { doc } from './index';

export const getGameRef = (firestore) => {
  return firestore.get(`games/${doc}`);
};

export const getCurrentCityRef = (game, currentCity) => {
  return game.ref.collection('cities').doc(currentCity.id);
};

export const getCurrentTurnRef = (game, currentTurn) => {
  return game.ref.collection('players').doc(`${currentTurn}`);
};
