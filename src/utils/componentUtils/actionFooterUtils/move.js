import { getPlayerRef, getUnusedCityCardRef } from '../../index';
import { updateActionsRemaining } from './index';
import { getGameRef } from '../../getFirestoreData';

export const movePlayer = async (firestore, currentTurn, isMoving) => {
  const game = await getGameRef(firestore);
  await getPlayerRef(game, currentTurn).update({ isMoving: !isMoving });
};

//update the current city (move)
export const changeCurrentCity = async (firestore, currentTurn, newCity, actionsRemaining, nextTurn) => {
  const game = await getGameRef(firestore);
  await getPlayerRef(game, currentTurn).update({currentCity: newCity, isMoving: false});
  await updateActionsRemaining(game, actionsRemaining, nextTurn);
};

//update the currentCity, remove the city from unusedCityCards, and also remove from player's currentHand (flight)
export const changeCurrentHandCity = async (firestore, currentTurn, newCity, currentHand, actionsRemaining, nextTurn) => {
  const game = await getGameRef(firestore);
  await changeCurrentCity(firestore, currentTurn, newCity, actionsRemaining, nextTurn);
  const playerRef = await getPlayerRef(game, currentTurn);
  const newHand = currentHand.filter(card => card.id !== newCity);
  await playerRef.update({currentHand: newHand});
  await getUnusedCityCardRef(game, newCity).delete();
  await updateActionsRemaining(game, actionsRemaining, nextTurn);
};
