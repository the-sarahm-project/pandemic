import { differenceWith, isEqual } from 'lodash';
import { getGameRef, getPlayerRef } from '../../index';
import { updateActionsRemaining } from './index';

export const cureDisease = async (ownId, ownCity, actionsRemaining, nextTurn, cardsToRemove) => {
  console.log('Curing Disease!');
  if (cardsToRemove.length !== 5) {
    const message = 'Please select 5 cards';
    alert(message);
    return false;
  }
  try {
    const gameRef = await getGameRef();
    const playerRef = await getPlayerRef(ownId, gameRef);
    const playerSnapshot = await playerRef.get();
    await updateCurrentHand(playerSnapshot, cardsToRemove);
    await setCureMarker(gameRef, ownCity.color);
    //remove cards from unusedCityCards
    await removeCards(cardsToRemove);
    await updateActionsRemaining(actionsRemaining, nextTurn);
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const setCureMarker = (game, color) => {
  return game.update({ [`${color}CureMarker`]: true });
};

export const removeCards = cardsToRemove => {
  //remove cards from unusedCityCards
  return Promise.all(cardsToRemove.map(card => card.delete()));
};

export const updateCurrentHand = (currentPlayerSnapshot, cardsToRemove) => {
  console.log('Updating Hand!');
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const newCurrentHand = differenceWith(currentHand, cardsToRemove, isEqual);
  return currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
};

export const cureButtonDisabled = (game, currentCity, color, maxSameColorCityCards) => {
  const researchStation = currentCity && currentCity.researchStation;
  const cured = game && game[`${color}CureMarker`];
  return !maxSameColorCityCards || cured || !researchStation;
};

