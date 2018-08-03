import { getGameRef, getCityRef, getPlayerRef } from '../../index';
import { removeCards, updateCurrentHand } from './cure';
import { updateActionsRemaining } from './index';

export const buildResearchStation = async (ownCityId, ownId, actionsRemaining, nextTurn) => {
  try {
    const game = await getGameRef();
    const currentCityRef = await getCityRef(ownCityId);
    const playerRef = await getPlayerRef(ownId);
    const currentPlayerSnapshot = await playerRef.get();
    const cardToRemove = currentPlayerSnapshot.data().currentHand.filter(card => card.id === ownCityId);
    // set research station to true for that city.
    await currentCityRef.update({ researchStation: true });
    // update remaining research stations count
    await setRemainingResearchStations(game);
    // remove card from current hand
    await updateCurrentHand(currentPlayerSnapshot, cardToRemove);
    //remove card from unusedCityCards
    await removeCards(cardToRemove);
    await updateActionsRemaining(actionsRemaining, nextTurn);
  } catch(err) {
    console.log(err);
  }
};

export const setRemainingResearchStations = async game => {
  const remainingResearchStations = game.data().remainingResearchStations;
  return await game.update({ remainingResearchStations: remainingResearchStations - 1 });
};

export const buildButtonDisabled = (remainingResearchStations, currentHand, ownCityId) => {
  return remainingResearchStations <= 0 || !(currentHand && currentHand.find(card => card.id === ownCityId));
};
