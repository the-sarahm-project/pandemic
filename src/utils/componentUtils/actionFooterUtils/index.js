import { shuffle } from 'lodash';
import store from '../../../store';
import { getPlayerRef, getGameSnapshot, getUnusedInfectionCardsRef, getTrashedInfectionCardsRef, getCityRef } from '../../getFirestoreData';

export const updateActionsRemaining = async (actionsRemaining, nextTurn) => {
  console.log('Updating Actions Remaining!');
  const gameSnapshot = await getGameSnapshot();
  const gameRef = gameSnapshot.ref;
  const remainingActions = actionsRemaining - 1;
  if (remainingActions) {
    await gameRef.update({ actionsRemaining: remainingActions });
  } else {
    console.log('Ending Turn!');
    const unusedInfectionCardsRef = await getUnusedInfectionCardsRef();
    const trashedInfectionCardsRef = await getTrashedInfectionCardsRef();
    const { currentTurn, playerDeck } = gameSnapshot.data();
    const playerRef = await getPlayerRef(currentTurn);
    await drawCards(gameRef, playerRef, playerDeck, unusedInfectionCardsRef, trashedInfectionCardsRef);
    await infectCities(gameSnapshot, gameRef, trashedInfectionCardsRef, unusedInfectionCardsRef) ;
    await gameRef.update({ currentTurn: nextTurn, actionsRemaining: 4, isMoving: false });
    console.log(`Player ${nextTurn}'s Turn!`);
  }
};

export const drawCards = async (gameRef, playerRef, playerDeck, unusedInfectionCardsRef, trashedInfectionCardsRef) => {
  console.log('Drawing Cards!');
  let i = 0;
  while (i < 2) {
    const playerSnapshot = await playerRef.get();
    let newCard = playerDeck.pop();
    console.log(`Drew ${newCard.id}!`);
    // handle epidemic
    if (newCard.id.includes('epidemic')) {
      await epidemic(unusedInfectionCardsRef, trashedInfectionCardsRef);
      newCard = playerDeck.pop();
    }
    await playerRef.update({ currentHand: [...playerSnapshot.data().currentHand, newCard] });
    await gameRef.update({ playerDeck });
    i++;
  }
};

export const epidemic = async (unusedInfectionCardsRef, trashedInfectionCardsRef) => {
  console.log('Epidemic!');
  const unusedInfectionCardsSnapshot = await unusedInfectionCardsRef.get();
  const unusedInfectionCards = unusedInfectionCardsSnapshot.docs;
  // take from bottom
  const newInfectionCard = unusedInfectionCards.shift();
  // get disease
  const { color, id } = newInfectionCard.data();
  console.log(`Infecting ${id} from Bottom of Infection Deck!`);
  // add disease cubes
  const cityRef = await getCityRef(id);
  await cityRef.update({ [color]: 3 });
  // shuffle trashed
  console.log('Shuffling Trashed Infection Cards');
  const trashedInfectionCardsSnapshot = await trashedInfectionCardsRef.get();
  const trashedInfectionCards = trashedInfectionCardsSnapshot.docs;
  const shuffledInfectionCards = shuffle([...trashedInfectionCards, newInfectionCard]);
  // update unusedInfectionCards, remove trashed infection cards
  await Promise.all(shuffledInfectionCards.map(
    infectionCard => unusedInfectionCardsRef.doc(infectionCard.id).set(infectionCard.data(), { merge: true })
  ));
  await Promise.all(shuffledInfectionCards.map(
    infectionCard => infectionCard.ref.delete()
  ));
};

export const infectCities = async (gameSnapshot, gameRef, trashedInfectionCardsRef, unusedInfectionCardsRef) => {
  console.log('Infecting Cities!');
  const unusedInfectionCardsSnapshot = await unusedInfectionCardsRef.get();
  const unusedInfectionCards = unusedInfectionCardsSnapshot.docs;
  let i = 0;
  while (i < gameSnapshot.data().infectionRate) {
    const infectionCard = unusedInfectionCards.pop();
    const { color, id } = infectionCard.data();
    console.log(`Infecting ${id}!`);
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
