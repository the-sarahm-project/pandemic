import store from '../../../store';
import { getGameRef } from '../../getFirestoreData';

export const updateActionsRemaining = async (actionsRemaining, nextTurn) => {
  const game = await getGameRef();
  await game.ref.update({ actionsRemaining: actionsRemaining - 1});
  if (actionsRemaining === 1) {
    await game.ref.update({ currentTurn: nextTurn, actionsRemaining: 3 });
  }
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
