import { differenceWith, isEqual } from 'lodash';
import { getGameRef, getCurrentTurnRef } from '../../index';

export const cureDisease = async (firestore, currentTurn, currentCity, unusedCityCards, cardsToRemove) => {
  if (cardsToRemove.length !== 1) {
    console.log('Please select 5 cards');
    return;
  }
  try {
    const game = await getGameRef(firestore);
    const currentPlayerSnapshot = await getCurrentTurnRef(game, currentTurn).get();
    await updateCurrentHand(currentPlayerSnapshot, cardsToRemove);
    await setCureMarker(game, currentCity.color);
    //remove cards from unusedCityCards
    await removeCards(cardsToRemove);
  } catch (err) {
    console.log(err);
  }
};

export const setCureMarker = (game, color) => {
  return game.ref.update({ [`${color}CureMarker`]: true });
};

export const removeCards = (cardsToRemove) => {
  //remove cards from unusedCityCards
  return Promise.all(cardsToRemove.map(card => card.delete()));
};

export const updateCurrentHand = (currentPlayerSnapshot, cardsToRemove) => {
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const newCurrentHand = differenceWith(currentHand, cardsToRemove, isEqual);
  return currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
};

export const cureButtonDisabled = (game, currentCity, currentHand, unusedCityCards) => {
  const currentCityColor = currentCity && currentCity.color;
  const cured = game && game[`${currentCityColor}CureMarker`];
  //filter the cards to check if the card is an event card or a city card && if the color matches the current city
  const enoughCards = currentHand && currentHand.filter(card => {
    return unusedCityCards[card.id] && (unusedCityCards[card.id].color === currentCityColor);
  }).length;
  return enoughCards < 5 || cured;
};

