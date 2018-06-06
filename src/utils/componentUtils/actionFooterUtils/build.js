import { getGameRef, getCityRef, getPlayerRef } from '../../index';
import { removeCards, updateCurrentHand } from './cure';

export const buildResearchStation = async (firestore, currentCityId, currentTurn) => {
  try {
    const game = await getGameRef(firestore);
    const currentCityRef = await getCityRef(game, currentCityId);
    const currentPlayerSnapshot = await getPlayerRef(game, `${currentTurn}`).get();
    const cardToRemove = currentPlayerSnapshot.data().currentHand.filter(card => card.id === currentCityId);
    // set research station to true for that city.
    await currentCityRef.update({ researchStation: true });
    // update remaining research stations count
    await setRemainingResearchStations(game);
    // remove card from current hand
    await updateCurrentHand(currentPlayerSnapshot, cardToRemove);
    //remove card from unusedCityCards
    await removeCards(cardToRemove);
  } catch(err) {
    console.log(err);
  }
};

export const setRemainingResearchStations = async game => {
  const remainingResearchStations = game.data().remainingResearchStations;
  return await game.ref.update({ remainingResearchStations: remainingResearchStations - 1 });
};

export const buildButtonDisabled = (remainingResearchStations, currentHand, currentCityId) => {
  return remainingResearchStations <= 0 || !(currentHand && currentHand.find(card => card.id === currentCityId));
};
