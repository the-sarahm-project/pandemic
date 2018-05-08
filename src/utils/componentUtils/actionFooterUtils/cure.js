import { getGameRef, getCurrentTurnRef, getCurrentCity, getCurrentHand, getUnusedCityCards, getGame } from '../../index';

export const cureDisease = async (firestore, currentTurn, currentCity, unusedCityCards, cardsToRemove) => {
  if (cardsToRemove.length !== 5) {
    console.log('Please select 5 cards');
    return;
  }
  const game = await getGameRef(firestore);
  const currentPlayerSnapshot = await getCurrentPlayerSnapshot(game, currentTurn);
  return Promise.all([
    updateCurrentHand(currentPlayerSnapshot, unusedCityCards, currentCity),
    setCureMarker(game, currentCity.color),
    removeCards(cardsToRemove)
  ]);
};

export const getCurrentPlayerSnapshot = (game, currentTurn) => {
  return getCurrentTurnRef(game, currentTurn).get();
};

export const setCureMarker = (game, color) => {
  return game.ref.update({ [`${color}CureMarker`]: true });
};

export const removeCards = (cardsToRemove) => {
  //remove cards from unusedCityCards
  return Promise.all(cardsToRemove.map(card => card.delete()));
};

export const updateCurrentHand = async (currentPlayerSnapshot, unusedCityCards, currentCity) => {
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const newCurrentHand = currentHand.filter(card => unusedCityCards[card.id].color !== currentCity.color);
  try {
    await currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
  } catch(err) {
    console.log(err);
  }
};

const cureButtonDisabled = (game, currentCity, currentHand, unusedCityCards) => {
  const currentCityColor = currentCity && currentCity.color;
  const cured = game && game[`${currentCityColor}CureMarker`];
  //filter the cards to check if the card is an event card or a city card && if the color matches the current city
  const enoughCards = currentHand && currentHand.filter(card => {
    return unusedCityCards[card.id] && (unusedCityCards[card.id].color === currentCityColor);
  }).length;
  return enoughCards < 1 || cured;
};

export const getCureDisabled = (state) => {
  const currentCity = getCurrentCity(state);
  const currentHand = getCurrentHand(state);
  const unusedCityCards = getUnusedCityCards(state);
  const game = getGame(state);
  return cureButtonDisabled(game, currentCity, currentHand, unusedCityCards);
};

