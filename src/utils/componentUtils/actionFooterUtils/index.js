import { shuffle } from 'lodash';
import store from '../../../store';
import { getPlayerRef, getGameSnapshot, getUnusedInfectionCardsRef, getTrashedInfectionCardsRef, getCityRef } from '../../getFirestoreData';

export const updateActionsRemaining = async (actionsRemaining, nextTurn) => {
  const gameSnapshot = await getGameSnapshot();
  const gameRef = gameSnapshot.ref;
  const unusedInfectionCardsRef = await getUnusedInfectionCardsRef();
  const unusedInfectionCardsSnapshot = await unusedInfectionCardsRef.get();
  const trashedInfectionCardsRef = await getTrashedInfectionCardsRef();
  const { currentTurn, playerDeck } = gameSnapshot.data();
  const playerRef = await getPlayerRef(currentTurn);
  const remainingActions = actionsRemaining - 1;
  if (remainingActions) {
    await gameRef.update({ actionsRemaining: remainingActions });
  } else {
    await drawCards(gameRef, playerRef, playerDeck, unusedInfectionCardsRef, unusedInfectionCardsSnapshot, trashedInfectionCardsRef);
    await infectCities(gameSnapshot, gameRef, trashedInfectionCardsRef, unusedInfectionCardsSnapshot) ;
    await gameRef.update({ currentTurn: nextTurn, actionsRemaining: 4, isMoving: false });
  }
};

export const drawCards = async (gameRef, playerRef, playerDeck, unusedInfectionCardsRef, unusedInfectionCardsSnapshot, trashedInfectionCardsRef) => {
  let i = 0;
  while (i < 2) {
    const playerSnapshot = await playerRef.get();
    let newCard = playerDeck.pop();
    // handle epidemic
    if (newCard.id.includes('epidemic')) {
      await epidemic(unusedInfectionCardsRef, unusedInfectionCardsSnapshot, trashedInfectionCardsRef);
      newCard = playerDeck.pop();
    }
    await playerRef.update({ currentHand: [...playerSnapshot.data().currentHand, newCard] });
    await gameRef.update({ playerDeck });
    i++;
  }
};

export const epidemic = async (unusedInfectionCardsRef, unusedInfectionCardsSnapshot, trashedInfectionCardsRef) => {
  console.log('Epidemic!');
  const unusedInfectionCards = unusedInfectionCardsSnapshot.docs;
  // take from bottom
  const newInfectionCard = unusedInfectionCards.shift();
  // add disease
  const { color, id } = newInfectionCard.data();
  const cityRef = await getCityRef(id);
  // add disease cubes
  await cityRef.update({ [color]: 3 });
  // shuffle trashed
  const trashedInfectionCardsSnapshot = await trashedInfectionCardsRef.get();
  const trashedInfectionCards = trashedInfectionCardsSnapshot.docs;
  const shuffledInfectionCards = shuffle([...trashedInfectionCards, newInfectionCard]);

  // update unusedInfectionCards, remove trashed infection cards
  await Promise.all(shuffledInfectionCards.map(infectionCard => unusedInfectionCardsRef.doc(id).set(infectionCard.data(), { merge: true })));
  await Promise.all(shuffledInfectionCards.map(infectionCard => infectionCard.ref.delete()));
}

export const infectCities = async (gameSnapshot, gameRef, trashedInfectionCardsRef, unusedInfectionCardsSnapshot) => {
  const unusedInfectionCards = unusedInfectionCardsSnapshot.docs;
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
