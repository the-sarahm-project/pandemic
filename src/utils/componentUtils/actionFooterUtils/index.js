import store from '../../../store';
import { getGameRef, getPlayerRef, getGameSnapshot } from '../../getFirestoreData';

export const updateActionsRemaining = async (actionsRemaining, nextTurn) => {
  const game = await getGameRef();
  const remainingActions = actionsRemaining - 1;
  if (remainingActions) {
    await game.update({ actionsRemaining: remainingActions });
  } else {
    await drawCards();
    await game.update({ currentTurn: nextTurn, actionsRemaining: 4, isMoving: false });
  }
};

export const drawCards = async () => {
  const gameSnapshot = await getGameSnapshot();
  const game = await gameSnapshot.ref;
  const { currentTurn, playerDeck } = gameSnapshot.data();
  const playerRef = await getPlayerRef(currentTurn);
  const playerSnapshot = await playerRef.get();
  const newCards = playerDeck.splice(-2, 2);
  playerRef.update({ currentHand: [...playerSnapshot.data().currentHand, ...newCards] });
  game.update({ playerDeck });
};

export const getOnClick = (currentTurn, onClick) => {
  return isCurrentTurn(currentTurn) ? onClick : () => {};
};

export const isCurrentTurn = currentTurn => {
  return store.firebase.auth().currentUser.id === currentTurn;
};

export * from './build';
export * from './move';
export * from './share';
export * from './cure';
export * from './treat';
