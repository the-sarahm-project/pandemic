import store from '../../../store';
import { getGameRef } from '../../getFirestoreData';

export const updateActionsRemaining = async (actionsRemaining, nextTurn) => {
  const game = await getGameRef();
  const remainingActions = actionsRemaining - 1;
  !remainingActions
    ? await game.ref.update({ currentTurn: nextTurn, actionsRemaining: 4, isMoving: false })
    : await game.ref.update({ actionsRemaining: remainingActions });

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
