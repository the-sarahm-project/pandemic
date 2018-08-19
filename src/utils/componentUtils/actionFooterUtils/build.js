import { getGameRef, getCityRef, getPlayerRef } from '../../index';
import { removeCards, updateCurrentHand } from './cure';
import { updateActionsRemaining } from './index';

export const buildResearchStation = async (self, actionsRemaining, nextTurn) => {
  try {
    console.log('Building Research Station!');
    const ownCityId = self.currentCity;
    const ownId = self.id;
    const role = self.role;
    const gameRef = await getGameRef();
    const gameSnapshot = await gameRef.get();
    const currentCityRef = await getCityRef(ownCityId, gameRef);
    // set research station to true for that city.
    await currentCityRef.update({ researchStation: true });
    // update remaining research stations count
    await setRemainingResearchStations(gameRef, gameSnapshot);
    if (role !== 'Operations Expert') {
      const playerRef = await getPlayerRef(ownId, gameRef);
      const currentPlayerSnapshot = await playerRef.get();
      const cardToRemove = currentPlayerSnapshot.data().currentHand.filter(card => card.id === ownCityId);
      // remove card from current hand
      await updateCurrentHand(currentPlayerSnapshot, cardToRemove);
      //remove card from unusedCityCards
      await removeCards(cardToRemove);
    }
    await updateActionsRemaining(actionsRemaining, nextTurn);
  } catch(err) {
    console.log(err);
  }
};

export const setRemainingResearchStations = async (gameRef, gameSnapshot) => {
  const remainingResearchStations = gameSnapshot.data().remainingResearchStations;
  return await gameRef.update({ remainingResearchStations: remainingResearchStations - 1 });
};

export const buildButtonDisabled = (remainingResearchStations, currentHand, ownCity, role) => {
  if (remainingResearchStations <= 0) return true;
  return role === 'Operations Expert' ? !currentHand.length : !(currentHand && currentHand.find(card => card.id === ownCity.id)) || ownCity.researchStation;
};
