import { getPlayerRef, getUnusedCityCardRef } from '../../index';
import { updateActionsRemaining, trashPlayerCards } from './index';
import { getGameRef, getGameSnapshot } from '../../getFirestoreData';

export const movePlayer = async (currentTurn, isMoving) => {
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(currentTurn, gameRef);
  await playerRef.update({ isMoving: !isMoving });
};

// update the current city (move)
export const changeCurrentCity = async (playerId, newCity, actionsRemaining, nextTurn, usedOESpecial) => {
  console.log(`Changing Cities to ${newCity}!`);
  const gameRef = await getGameRef();
  await gameRef.update({ dispatchTarget: null });
  const playerRef = await getPlayerRef(playerId, gameRef);
  usedOESpecial
    ? await playerRef.update({currentCity: newCity, isMoving: false, hasOESpecial: false })
    : await playerRef.update({currentCity: newCity, isMoving: false });
  await updateActionsRemaining(actionsRemaining, nextTurn);
  return true;
};

// discard a city card to fly to that city
export const shuttleFlight = async (playerId, newCity, currentHand, actionsRemaining, nextTurn, clickedCity) => {
  console.log('Shuttle Flight!');
  let cityToChange = newCity, usedOESpecial = false;
  if (clickedCity && clickedCity !== newCity) {
    usedOESpecial = true;
    cityToChange = clickedCity;
  }
  await removeCityCard(playerId, currentHand, newCity);
  return await changeCurrentCity(playerId, cityToChange, actionsRemaining, nextTurn, usedOESpecial);
};

// discard a city card matching the current player's city to fly to any other city
export const charterFlight = async (player, newCity, currentHand, actionsRemaining, nextTurn, clickedCity) => {
  console.log('Charter Flight!');
  let cityToChange = newCity, hasOESpecial = false;
  if (clickedCity && clickedCity !== newCity) {
    hasOESpecial = true;
    cityToChange = clickedCity;
  }
  await removeCityCard(player.id, currentHand, player.currentCity);
  return await changeCurrentCity(player.id, cityToChange, actionsRemaining, nextTurn, hasOESpecial);
};

export const removeCityCard = async(playerId, currentHand, newCity) => {
  console.log('Removing Card from Hand!');
  const gameSnapshot = await getGameSnapshot();
  const gameRef = gameSnapshot.ref;
  const newHand = currentHand.filter(card => card.id !== newCity);
  const playerRef = gameSnapshot.data().dispatchTarget
    ? await getPlayerRef(`${gameSnapshot.data().currentTurn}`, gameRef)
    : await getPlayerRef(playerId, gameRef);
  await playerRef.update({currentHand: newHand});
  const unusedCityCardRef = await getUnusedCityCardRef(newCity, gameRef);
  await trashPlayerCards([unusedCityCardRef]);
  await unusedCityCardRef.delete();
};
