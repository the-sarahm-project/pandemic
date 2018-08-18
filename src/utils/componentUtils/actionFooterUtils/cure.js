import { differenceWith, isEqual } from 'lodash';
import { getPlayerRef } from '../../index';
import { updateActionsRemaining } from './index';
import { getGameSnapshot } from '../../getFirestoreData';
import { checkCured } from '../endGameConditions';

export const cureDisease = async (self, actionsRemaining, nextTurn, cardsToRemove) => {
  const ownId = self.id;
  console.log('Curing Disease!');
  const enoughCards = self.role === 'Scientist' ? 4 : 5;
  if (cardsToRemove.length !== enoughCards) {
    const message = `Please select ${enoughCards} cards`;
    alert(message);
    return false;
  }
  try {
    const gameSnapshot = await getGameSnapshot();
    const gameRef = gameSnapshot.ref;
    const playerRef = await getPlayerRef(ownId, gameRef);
    const playerSnapshot = await playerRef.get();
    const cardSnapshot = await cardsToRemove[0].get(); // to get the color of the city cards
    await updateCurrentHand(playerSnapshot, cardsToRemove);
    await setCureMarker(gameRef, cardSnapshot.data().color);
    checkCured(gameSnapshot);
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

