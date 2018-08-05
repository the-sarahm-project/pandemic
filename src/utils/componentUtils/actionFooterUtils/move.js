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
export const changeCurrentCity = async (currentTurn, newCity, actionsRemaining, nextTurn) => {
  console.log(`Changing Cities to ${newCity}!`);
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(currentTurn, gameRef);
  await playerRef.update({currentCity: newCity, isMoving: false});
  await updateActionsRemaining(actionsRemaining, nextTurn);
};

// discard a city card to fly to that city
export const shuttleFlight = async (currentTurn, newCity, currentHand, actionsRemaining, nextTurn) => {
  console.log('Shuttle Flight!');
  await removeCityCard(currentTurn, currentHand, newCity);
  await changeCurrentCity(currentTurn, newCity, actionsRemaining, nextTurn);
};

// discard a city card matching the current player's city to fly to any other city
export const charterFlight = async (player, newCity, currentHand, actionsRemaining, nextTurn) => {
  console.log('Charter Flight!');
  await removeCityCard(player.id, currentHand, player.currentCity);
  await changeCurrentCity(player.id, newCity, actionsRemaining, nextTurn);
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
