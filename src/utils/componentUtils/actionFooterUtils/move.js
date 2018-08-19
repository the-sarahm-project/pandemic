import { getPlayerRef, getUnusedCityCardRef } from '../../index';
import { updateActionsRemaining } from './index';
import { getGameRef } from '../../getFirestoreData';

export const movePlayer = async (currentTurn, isMoving) => {
  console.log('Moving!');
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(currentTurn, gameRef);
  await playerRef.update({ isMoving: !isMoving });
};

// update the current city (move)
export const changeCurrentCity = async (currentTurn, newCity, actionsRemaining, nextTurn, usedOESpecial) => {
  console.log(`Changing Cities to ${newCity}!`);
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(currentTurn, gameRef);
  usedOESpecial
    ? await playerRef.update({currentCity: newCity, isMoving: false, hasOESpecial: false })
    : await playerRef.update({currentCity: newCity, isMoving: false });
  await updateActionsRemaining(actionsRemaining, nextTurn);
  return true;
};

// discard a city card to fly to that city
export const shuttleFlight = async (currentTurn, newCity, currentHand, actionsRemaining, nextTurn, clickedCity) => {
  console.log('Shuttle Flight!');
  let cityToChange = '', usedOESpecial = false;
  if (clickedCity !== newCity) {
    usedOESpecial = true;
    cityToChange = clickedCity;
  }
  await removeCityCard(currentTurn, currentHand, newCity);
  return await changeCurrentCity(currentTurn, cityToChange, actionsRemaining, nextTurn, usedOESpecial);
};

// discard a city card matching the current player's city to fly to any other city
export const charterFlight = async (player, newCity, currentHand, actionsRemaining, nextTurn, clickedCity) => {
  console.log('Charter Flight!');
  let cityToChange = '', hasOESpecial = false;
  if (clickedCity !== newCity) {
    hasOESpecial = true;
    cityToChange = clickedCity;
  }
  await removeCityCard(player.id, currentHand, player.currentCity);
  return await changeCurrentCity(player.id, cityToChange, actionsRemaining, nextTurn, hasOESpecial);
};

export const removeCityCard = async(currentTurn, currentHand, newCity) => {
  console.log('Removing Card from Hand!');
  const gameRef = await getGameRef();
  const newHand = currentHand.filter(card => card.id !== newCity);
  const playerRef = await getPlayerRef(currentTurn, gameRef);
  await playerRef.update({currentHand: newHand});
  const unusedCityCardRef = await getUnusedCityCardRef(newCity, gameRef);
  await unusedCityCardRef.delete();
};
