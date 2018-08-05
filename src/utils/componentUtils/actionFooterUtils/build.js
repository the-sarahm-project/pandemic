import { getGameRef, getCityRef, getPlayerRef } from '../../index';
import { removeCards, updateCurrentHand } from './cure';
import { updateActionsRemaining } from './index';

export const buildResearchStation = async (ownCityId, ownId, actionsRemaining, nextTurn) => {
  try {
    console.log('Building Research Station!');
    const gameRef = await getGameRef();
    const gameSnapshot = await gameRef.get();
    const currentCityRef = await getCityRef(ownCityId, gameRef);
    const playerRef = await getPlayerRef(ownId, gameRef);
    const currentPlayerSnapshot = await playerRef.get();
    const cardToRemove = currentPlayerSnapshot.data().currentHand.filter(card => card.id === ownCityId);
    // set research station to true for that city.
    await currentCityRef.update({ researchStation: true });
    // update remaining research stations count
    await setRemainingResearchStations(gameRef, gameSnapshot);
    // remove card from current hand
    await updateCurrentHand(currentPlayerSnapshot, cardToRemove);
    //remove card from unusedCityCards
    await removeCards(cardToRemove);
    await updateActionsRemaining(actionsRemaining, nextTurn);
  } catch(err) {
    console.log(err);
  }
};

export const setRemainingResearchStations = async (gameRef, gameSnapshot) => {
  const remainingResearchStations = gameSnapshot.data().remainingResearchStations;
  return await gameRef.update({ remainingResearchStations: remainingResearchStations - 1 });
};

export const buildButtonDisabled = (remainingResearchStations, currentHand, ownCity) => {
  return remainingResearchStations <= 0 || !(currentHand && currentHand.find(card => card.id === ownCity.id)) || ownCity.researchStation;
};
