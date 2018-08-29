import { differenceWith, isEqual } from 'lodash';
import { updateActionsRemaining, trashPlayerCards } from './index';
import { getGame, getGameRef, getUnusedCityCard, getPlayer } from '../../getFirestoreData';
import { checkCured } from '../endGameConditions';
import store from '../../../store';

export const cureDisease = async (self, unusedCityCards, actionsRemaining, nextTurn, cardsToRemove) => {
  const ownId = self.id;
  console.log('Curing Disease!');
  const enoughCards = self.role === 'Scientist' ? 4 : 5;
  if (cardsToRemove.length !== enoughCards) {
    const message = `Please select ${enoughCards} cards`;
    alert(message);
    return false;
  }
  try {
    const state = await store.getState();
    const game = getGame(state);
    const gameRef = await getGameRef();
    const player = getPlayer(state, ownId);
    const card = getUnusedCityCard(state, cardsToRemove[0].id); // to get the color of the city cards
    await trashPlayerCards(cardsToRemove);
    await updateCurrentHand(player, cardsToRemove);
    await setCureMarker(gameRef, card.color);
    checkCured(game);
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

