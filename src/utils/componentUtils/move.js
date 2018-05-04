import { doc } from '../index';

export const movePlayer = (firestore, currentTurn) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      game.ref.collection('players').doc(`${currentTurn}`).update({isMoving: true});
    })
    .catch(console.error);
};

export const changeCurrentCity = (firestore, currentTurn, newCity) => {
  firestore.get(`games/${doc}`)
  .then(game => {
    game.ref.collection('players').doc(`${currentTurn}`).update({currentCity: newCity, isMoving: false});
  })
  .catch(console.error);
};
