import { shuffle } from 'lodash';
import store from '../../../store';
import { getPlayerRef, getGameSnapshot, getUnusedInfectionCardsRef, getTrashedInfectionCardsRef, getCityRef } from '../../getFirestoreData';

export const updateActionsRemaining = async (actionsRemaining, nextTurn) => {
  console.log('Updating Actions Remaining!');
  const gameSnapshot = await getGameSnapshot();
  const gameRef = gameSnapshot.ref;
  const remainingActions = actionsRemaining - 1;
  await gameRef.update({ actionsRemaining: remainingActions });
  if (!remainingActions) {
    console.log('Ending Turn!');
    const unusedInfectionCardsRef = await getUnusedInfectionCardsRef(gameRef);
    const trashedInfectionCardsRef = await getTrashedInfectionCardsRef(gameRef);
    const { currentTurn, playerDeck } = gameSnapshot.data();
    const playerRef = await getPlayerRef(currentTurn, gameRef);
    await drawCards(gameRef, playerRef, playerDeck, unusedInfectionCardsRef, trashedInfectionCardsRef);
    await infectCities(gameRef, trashedInfectionCardsRef, unusedInfectionCardsRef) ;
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
    if (newCard.id.includes('Epidemic')) {
      await epidemic(gameRef, unusedInfectionCardsRef, trashedInfectionCardsRef);
      newCard = playerDeck.pop();
    }
    await playerRef.update({ currentHand: [...playerSnapshot.data().currentHand, newCard] });
    await gameRef.update({ playerDeck });
    i++;
  }
};

export const epidemic = async (gameRef, unusedInfectionCardsRef, trashedInfectionCardsRef) => {
  console.log('Epidemic!');
  // take from bottom
  const infectionCardQuery = await unusedInfectionCardsRef.orderBy('insertOrder').limit(1).get();
  const infectionCard = infectionCardQuery.docs[0];
  // get disease
  const { color, id } = infectionCard.data();
  console.log(`Infecting ${id} from Bottom of Infection Deck!`);
  // add disease cubes
  const cityRef = await getCityRef(id, gameRef);
  const citySnapshot = await cityRef.get();
  const diseaseCubes = citySnapshot.data()[color];
  const gameSnapshot = await gameRef.get();
  if (!diseaseCubes) {
    await cityRef.update({ [color]: 3 });
    await gameRef.update({ [`${color}DiseaseCubes`]: gameSnapshot.data()[`${color}DiseaseCubes`] - (3 - diseaseCubes) });
  } else {
    await cityRef.update({ [color]: 3 });
    await infectCity(gameRef, color, id, {});
  }
  // shuffle trashed
  console.log('Shuffling Trashed Infection Cards!');
  const trashedInfectionCardsSnapshot = await trashedInfectionCardsRef.get();
  const trashedInfectionCards = trashedInfectionCardsSnapshot.docs;
  const shuffledInfectionCards = shuffle([...trashedInfectionCards, infectionCard]);
  // move Infection Rate Marker forward 1 space.
  console.log('Increasing Infection Rate!');
  await gameRef.update({ infectionRate: gameSnapshot.data().infectionRate + 1 });
  const lastInsertQuery = await unusedInfectionCardsRef.orderBy('insertOrder', 'desc').limit(1).get();
  const lastInsert = lastInsertQuery.docs[0].data().insertOrder + 1;
  // update unusedInfectionCards, remove trashed infection cards
  await Promise.all(shuffledInfectionCards.map(
    (card, index) =>
      unusedInfectionCardsRef
      .doc(card.id)
      .set({...card.data(), insertOrder: index + lastInsert}, { merge: true })
  ));
  await Promise.all(shuffledInfectionCards.map(
    card => card.ref.delete()
  ));
};

export const infectCities = async (gameRef, trashedInfectionCardsRef, unusedInfectionCardsRef) => {
  console.log('Infecting Cities!');
  const gameSnapshot = await gameRef.get();
  let i = 0;
  while (i < gameSnapshot.data().infectionRate) {
    const infectionCardQuery = await unusedInfectionCardsRef.orderBy('insertOrder', 'desc').limit(1).get();
    const infectionCard = infectionCardQuery.docs[0];
    const { color, id } = infectionCard.data();
    await infectCity(gameRef, color, id, {});
    // update trashed
    await trashedInfectionCardsRef.doc(id).set(infectionCard.data(), { merge: true });
    // update unusedInfectionCards
    await infectionCard.ref.delete();
    i++;
  }
};

export const infectCity = async (gameRef, color, id, visited) => {
  const gameSnapshot = await gameRef.get();
  const cityRef = await getCityRef(id, gameRef);
  const citySnapshot = await cityRef.get();
  console.log(`Infecting ${id}!`);
  if (citySnapshot.data()[color] === 3) {
    console.log(`Outbreak at ${id}!`);
    const neighbors = citySnapshot.data().neighbors;
    for (const neighbor of neighbors) {
      if (!(neighbor in visited)) {
        visited[neighbor] = true;
        await infectCity(gameRef, color, neighbor, visited);
      }
    }
  } else {
    // update disease cube
    await cityRef.update({ [color]: citySnapshot.data()[color] + 1 });
    await gameRef.update({ [`${color}DiseaseCubes`]: gameSnapshot.data()[`${color}DiseaseCubes`] - 1 });
  }
};

export const getOnClick = (actionsRemaining, currentTurn, onClick, tooManyCards) => {
  return actionsRemaining && isCurrentTurn(currentTurn) && !tooManyCards
    ? onClick
    : () => {
      if (!actionsRemaining) {
        alert('No actions remaining!');
      } else if (!isCurrentTurn(currentTurn)) {
        alert('Not your turn!');
      } else {
        alert('You need to discard cards!');
      }
    };
};

export const isCurrentTurn = currentTurn => {
  return store.firebase.auth().currentUser.id === currentTurn;
};

export * from './build';
export * from './move';
export * from './share';
export * from './cure';
export * from './treat';
export * from './discard';
