import { shuffle } from 'lodash';
import store from '../../../store';
import { getPlayerRef, getGameRef, getUnusedInfectionCardsRef, getTrashedInfectionCardsRef, getCityRef, getCurrentTurn, getPlayerDeck, getPlayer, getCity, getGame, getUnusedCityCards, getCities, getPlayers, getUnusedEventCards } from '../../getFirestoreData';
import { checkOutbreaks, checkDiseaseCubes, checkPlayerCards } from '../endGameConditions';

export const updateActionsRemaining = async (actionsRemaining, nextTurn) => {
  console.log('Updating Actions Remaining!');
  const gameRef = await getGameRef();
  const remainingActions = actionsRemaining - 1;
  await gameRef.update({ actionsRemaining: remainingActions });
  if (!remainingActions) {
    console.log('Ending Turn!');
    const state = await store.getState();
    const game = getGame(state);
    const cities = getCities(state);
    const players = getPlayers(state);
    const unusedInfectionCardsRef = await getUnusedInfectionCardsRef(gameRef);
    const trashedInfectionCardsRef = await getTrashedInfectionCardsRef(gameRef);
    const currentTurn = getCurrentTurn(state);
    const playerDeck = getPlayerDeck(state);
    const playerRef = await getPlayerRef(currentTurn, gameRef);
    if (game.quarantineCities) {
      await updateQuarantineCities(gameRef, cities, players);
    }
    await drawCards(gameRef, playerRef, playerDeck, unusedInfectionCardsRef, trashedInfectionCardsRef);
    await infectCities(gameRef, trashedInfectionCardsRef, unusedInfectionCardsRef);
    await playerRef.update({ isMoving: false });
    await gameRef.update({ currentTurn: nextTurn, actionsRemaining: 4});
    console.log(`Player ${nextTurn}'s Turn!`);
  }
};

export const updateQuarantineCities = async (gameRef, cities, players) => {
  const quarantineSpecialist = Object.values(players).find(player => player.role === 'Quarantine Specialist');
  const city = quarantineSpecialist.currentCity;
  const quarantineCities = [city, ...cities[city].neighbors].reduce((cities, quarantineCity) => {
    cities[quarantineCity] = true;
    return cities;
  }, {});
  await gameRef.update({ quarantineCities });
};

export const drawCards = async (gameRef, playerRef, playerDeck, unusedInfectionCardsRef, trashedInfectionCardsRef) => {
  console.log('Drawing Cards!');
  let i = 0;
  while (i < 2) {
    const state = await store.getState();
    const player = getPlayer(state, playerRef.id);
    let newCard = playerDeck.pop();
    console.log(`Drew ${newCard.id}!`);
    // handle epidemic
    if (newCard.id.includes('Epidemic')) {
      await epidemic(gameRef, unusedInfectionCardsRef, trashedInfectionCardsRef);
      newCard = playerDeck.pop();
    }
    await playerRef.update({ currentHand: [...player.currentHand, newCard], hasOESpecial: true });
    await gameRef.update({ playerDeck });
    checkPlayerCards(playerDeck.length);
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
  // add disease cubes
  let state = await store.getState();
  const cityRef = await getCityRef(id, gameRef);
  const city = getCity(state, id);
  const diseaseCubes = city[color];
  const game = getGame(state);
  // ignore city if medic is there and the disease is cured.
  const medicCurrentCity = game.medicCurrentCity;
  const cured = game[`${color}CureMarker`];
  if (medicCurrentCity !== id && !game.quarantineCities[id] && !cured) {
    console.log(`Infecting ${id} from Bottom of Infection Deck!`);
    if (!diseaseCubes) {
      await cityRef.update({ [color]: 3 });
      await gameRef.update({ [`${color}DiseaseCubes`]: game[`${color}DiseaseCubes`] - (3 - diseaseCubes) });
      checkDiseaseCubes(game);
    } else {
      await cityRef.update({ [color]: 3 });
      await infectCity(gameRef, color, id, {});
    }
  } else {
    console.log(`Attempted to infect ${id} from Bottom of Infection Deck!`);
  }
  // shuffle trashed
  console.log('Shuffling Trashed Infection Cards!');
  const trashedInfectionCardsSnapshot = await trashedInfectionCardsRef.get();
  const trashedInfectionCards = trashedInfectionCardsSnapshot.docs;
  const shuffledInfectionCards = shuffle([...trashedInfectionCards, infectionCard]);
  // move Infection Rate Marker forward 1 space.
  console.log('Increasing Infection Rate!');
  await gameRef.update({ infectionRate: game.infectionRate + 1 });
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
  const state = await store.getState();
  const game = getGame(state);
  let i = 0;
  while (i < game.infectionRate) {
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
  const state = await store.getState();
  const game = getGame(state);
  const cityRef = await getCityRef(id, gameRef);
  const city = getCity(state, id);
  const medicCurrentCity = game.medicCurrentCity;
  const cured = game[`${color}CureMarker`];
  if (medicCurrentCity !== id && !game.quarantineCities[id] && !cured) {
    console.log(`Infecting ${id}!`);
    if (city[color] === 3) {
      console.log(`Outbreak at ${id}!`);
      await gameRef.update({ numOutbreaks: game.numOutbreaks + 1 });
      checkOutbreaks(game);
      const neighbors = city.neighbors;
      for (const neighbor of neighbors) {
        if (!(neighbor in visited)) {
          visited[neighbor] = true;
          await infectCity(gameRef, color, neighbor, visited);
        }
      }
    } else {
      // update disease cube
      await cityRef.update({ [color]: city[color] + 1 });
      await gameRef.update({ [`${color}DiseaseCubes`]: game[`${color}DiseaseCubes`] - 1 });
      checkDiseaseCubes(game);
    }
  } else {
    console.log(`Attempted to Infect ${id}!`);
  }
};

export const getOnClick = (actionsRemaining, currentTurn, onClick, tooManyCards, action) => {
  return !action && actionsRemaining && isCurrentTurn(currentTurn) && !tooManyCards
    ? onClick
    : () => {
      if (!actionsRemaining) {
        alert('No actions remaining!');
      } else if (!isCurrentTurn(currentTurn)) {
        alert('Not your turn!');
      } else if (action) {
        alert('Still doing something!');
      } else if (tooManyCards) {
        alert('You need to discard cards!');
      } else {
        alert('Nope.');
      }
      return false;
    };
};

export const isCurrentTurn = currentTurn => {
  return store.firebase.auth().currentUser.id === currentTurn;
};

export const trashPlayerCards = async cardsToRemove => {
  console.log('Trashing Player Cards!');
  const gameRef = await getGameRef();
  const state = await store.getState();
  const unusedCityCards = getUnusedCityCards(state);
  const unusedEventCards = getUnusedEventCards(state);
  await Promise.all(cardsToRemove.map(card => {
    const cardToRemove = unusedCityCards[card.id] ? unusedCityCards[card.id] : unusedEventCards[card.id];
    return gameRef.collection('trashedPlayerCards').doc(card.id).set(cardToRemove);
  }));
};

export * from './build';
export * from './move';
export * from './share';
export * from './cure';
export * from './treat';
export * from './discard';
export * from './dispatch';
export * from './cpaction';
