import { doc } from '../index';

export const movePlayer = (firestore, currentTurn, neighbors) => {
  firestore.get(`games/${doc}`)
    .then(game => {
      game.ref.collection('players').doc(`${currentTurn}`).update({ currentCity: neighbors[Math.floor(Math.random() * neighbors.length)] });
    })
    .catch(err => console.log(err));
};
