import { differenceWith, isEqual } from 'lodash';
import { getGameRef, getPlayerRef } from '../../index';
import { updateActionsRemaining } from './index';

export const cureDisease = async (firestore, currentTurn, currentCity, actionsRemaining, nextTurn, cardsToRemove) => {
  if (cardsToRemove.length !== 5) {
    const message = 'Please select 5 cards';
    alert(message);
    return message;
  }
  try {
    const game = await getGameRef(firestore);
    const currentPlayerSnapshot = await getPlayerRef(game, currentTurn).get();
    await updateCurrentHand(currentPlayerSnapshot, cardsToRemove);
    await setCureMarker(game, currentCity.color);
    //remove cards from unusedCityCards
    await removeCards(cardsToRemove);
    await updateActionsRemaining(game, actionsRemaining, nextTurn);
  } catch (err) {
    console.log(err);
  }
};

export const setCureMarker = (game, color) => {
  return game.ref.update({ [`${color}CureMarker`]: true });
};

export const removeCards = cardsToRemove => {
  //remove cards from unusedCityCards
  return Promise.all(cardsToRemove.map(card => card.delete()));
};

export const updateCurrentHand = (currentPlayerSnapshot, cardsToRemove) => {
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const newCurrentHand = differenceWith(currentHand, cardsToRemove, isEqual);
  return currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
};

export const cureButtonDisabled = (game, currentCity, maxSameColorCityCards) => {
  const currentCityColor = currentCity && currentCity.color;
  const researchStation = currentCity && currentCity.researchStation;
  const cured = game && game[`${currentCityColor}CureMarker`];
  return !maxSameColorCityCards || cured || !researchStation;
};

