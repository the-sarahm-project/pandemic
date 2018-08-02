import { getPlayerRef, getUnusedCityCardRef } from '../../index';
import { updateActionsRemaining } from './index';

export const movePlayer = async (currentTurn, isMoving) => {
  const playerRef = await getPlayerRef(currentTurn);
  await playerRef.update({ isMoving: !isMoving });
};

// update the current city (move)
export const changeCurrentCity = async (currentTurn, newCity, actionsRemaining, nextTurn) => {
  const playerRef = await getPlayerRef(currentTurn);
  await playerRef.update({currentCity: newCity, isMoving: false});
  await updateActionsRemaining(actionsRemaining, nextTurn);
};

// discard a city card to fly to that city
export const shuttleFlight = async (currentTurn, newCity, currentHand, actionsRemaining, nextTurn) => {
  await changeCurrentCity(currentTurn, newCity, actionsRemaining, nextTurn);
  await removeCityCard(currentTurn, currentHand, newCity);
  await updateActionsRemaining(actionsRemaining, nextTurn);
};

// discard a city card matching the current player's city to fly to any other city
export const charterFlight = async (player, newCity, currentHand, actionsRemaining, nextTurn) => {
  await changeCurrentCity(player.id, newCity, actionsRemaining, nextTurn);
  await removeCityCard(player.id, currentHand, player.currentCity);
  await updateActionsRemaining(actionsRemaining, nextTurn);
};

export const removeCityCard = async(currentTurn, currentHand, newCity) => {
  const newHand = currentHand.filter(card => card.id !== newCity);
  const playerRef = await getPlayerRef(currentTurn);
  await playerRef.update({currentHand: newHand});
  const unusedCityCardRef = await getUnusedCityCardRef(newCity);
  await unusedCityCardRef.delete();
};
