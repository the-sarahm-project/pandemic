import store from '../../../store';
import { getGameRef, getPlayerRef, getGameSnapshot, getUnusedInfectionCardsSnapshot, getTrashedInfectionCardsRef, getCityRef } from '../../getFirestoreData';



export const updateActionsRemaining = async (actionsRemaining, nextTurn) => {
  const game = await getGameRef();
  const remainingActions = actionsRemaining - 1;
  if (remainingActions) {
    await game.update({ actionsRemaining: remainingActions });
  } else {
    await drawCards();
    await infectCities();
    await game.update({ currentTurn: nextTurn, actionsRemaining: 4, isMoving: false });
  }
};

export const drawCards = async () => {
  const gameSnapshot = await getGameSnapshot();
  const gameRef = gameSnapshot.ref;
  const { currentTurn, playerDeck } = gameSnapshot.data();
  const playerRef = await getPlayerRef(currentTurn);
  let i = 0;
  while (i < 2) {
    const playerSnapshot = await playerRef.get();
    const newCard = playerDeck.pop();
    await playerRef.update({ currentHand: [...playerSnapshot.data().currentHand, newCard] });
    await gameRef.update({ playerDeck });
    i++;
  }
};

export const infectCities = async () => {
  const gameSnapshot = await getGameSnapshot();
  const gameRef = gameSnapshot.ref;
  const unusedInfectionCardsSnapshot = await getUnusedInfectionCardsSnapshot();
  const unusedInfectionCards = unusedInfectionCardsSnapshot.docs;
  const trashedInfectionCardsRef = await getTrashedInfectionCardsRef();
  let i = 0;
  while (i < gameSnapshot.data().infectionRate) {
    const infectionCard = unusedInfectionCards.pop();
    const { color, id } = infectionCard.data();
    const cityRef = await getCityRef(id);
    const citySnapshot = await cityRef.get();
    // update disease cube
    await cityRef.update({ [color]: citySnapshot.data()[color] + 1 });
    await gameRef.update({ [`${color}DiseaseCubes`]: gameSnapshot.data()[`${color}DiseaseCubes`] - 1 });
    // update trashed
    await trashedInfectionCardsRef.doc(id).set(infectionCard.data(), { merge: true });
    // update unusedInfectionCards
    await infectionCard.ref.delete();
    i++;
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
