import { getPlayerRef, getUnusedCityCardRef } from '../../index';
import { updateActionsRemaining, trashPlayerCards } from './index';
import { getGameRef, getGameSnapshot } from '../../getFirestoreData';

export const movePlayer = async (currentTurn, isMoving) => {
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(currentTurn, gameRef);
  await playerRef.update({ isMoving: !isMoving });
};

// update the current city (move)
export const changeCurrentCity = async (playerId, newCity, actionsRemaining, nextTurn, usedOESpecial, gameSnapshot) => {
  console.log(`Changing Cities to ${newCity}!`);
  gameSnapshot = gameSnapshot ? gameSnapshot : await getGameSnapshot(); // only get if needed.
  const gameRef = gameSnapshot.ref;
  await gameRef.update({ dispatchTarget: null });
  const playerRef = await getPlayerRef(playerId, gameRef);
  const updatePlayer = usedOESpecial
    ? playerRef.update({currentCity: newCity, isMoving: false, hasOESpecial: false })
    : playerRef.update({currentCity: newCity, isMoving: false });
  await Promise.all([
    updatePlayer,
    updateActionsRemaining(actionsRemaining, nextTurn)
  ]);
  return true;
};

// discard a city card to fly to that city
export const shuttleFlight = async (playerId, newCity, currentHand, actionsRemaining, nextTurn, clickedCity) => {
  console.log('Shuttle Flight!');
  const gameSnapshot = await getGameSnapshot();
  let cityToChange = newCity, usedOESpecial = false;
  if (clickedCity && clickedCity !== newCity) {
    usedOESpecial = true;
    cityToChange = clickedCity;
  }
  await removeCityCard(playerId, currentHand, newCity, gameSnapshot);
  return await changeCurrentCity(playerId, cityToChange, actionsRemaining, nextTurn, usedOESpecial, gameSnapshot);
};

// discard a city card matching the current player's city to fly to any other city
export const charterFlight = async (player, newCity, currentHand, actionsRemaining, nextTurn, clickedCity) => {
  console.log('Charter Flight!');
  const gameSnapshot = await getGameSnapshot();
  let cityToChange = newCity, hasOESpecial = false;
  if (clickedCity && clickedCity !== newCity) {
    hasOESpecial = true;
    cityToChange = clickedCity;
  }
  return await Promise.all([
    removeCityCard(player.id, currentHand, player.currentCity, gameSnapshot),
    changeCurrentCity(player.id, cityToChange, actionsRemaining, nextTurn, hasOESpecial)
  ]);
};

export const removeCityCard = async(playerId, currentHand, newCity, gameSnapshot) => {
  console.log('Removing Card from Hand!');
  const gameRef = gameSnapshot.ref;
  const newHand = currentHand.filter(card => card.id !== newCity);
  const unusedCityCardRef = await getUnusedCityCardRef(newCity, gameRef);
  const playerRef = gameSnapshot.data().dispatchTarget
    ? await getPlayerRef(`${gameSnapshot.data().currentTurn}`, gameRef)
    : await getPlayerRef(playerId, gameRef);
  await Promise.all([
    playerRef.update({currentHand: newHand}),
    trashPlayerCards([unusedCityCardRef]),
    unusedCityCardRef.delete(),
  ]);
};
