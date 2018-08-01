import { getPlayerRef, getUnusedCityCardRef } from '../../index';
import { updateActionsRemaining } from './index';

export const movePlayer = async (currentTurn, isMoving) => {
  const playerRef = await getPlayerRef(currentTurn);
  await playerRef.update({ isMoving: !isMoving });
};

//update the current city (move)
export const changeCurrentCity = async (currentTurn, newCity, actionsRemaining, nextTurn) => {
  const playerRef = await getPlayerRef(currentTurn);
  await playerRef.update({currentCity: newCity, isMoving: false});
  await updateActionsRemaining(actionsRemaining, nextTurn);
};

//update the currentCity, remove the city from unusedCityCards, and also remove from player's currentHand (flight)
export const changeCurrentHandCity = async (currentTurn, newCity, currentHand, actionsRemaining, nextTurn) => {
  await changeCurrentCity(currentTurn, newCity, actionsRemaining, nextTurn);
  const newHand = currentHand.filter(card => card.id !== newCity);
  const playerRef = await getPlayerRef(currentTurn);
  await playerRef.update({currentHand: newHand});
  await getUnusedCityCardRef(newCity).delete();
  await updateActionsRemaining(actionsRemaining, nextTurn);
};
