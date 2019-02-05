import { getGameRef, getTrashedInfectionCardsSnapshot, getPlayerRef, getOwnId, getOwnHand, getCityRef } from "../getFirestoreData";
import store from '../../store';
import { setRemainingResearchStations } from './actionFooterUtils/build';

export const eventAction = async function(card, cpaction) {
  const gameRef = await getGameRef();
  if (card === 'ResilientPopulation') {
    const trashedInfectionCardsSnapshot = await getTrashedInfectionCardsSnapshot(gameRef);
    const modalCards = Object.values(trashedInfectionCardsSnapshot.docs).map(doc => doc.ref);
    this.setState({ cardModal: true, modalOpen: true, action: resilientPopulation, modalCards, cpaction: true });
  } else if (card === 'GovernmentGrant') {
    const gameUpdate = cpaction ? { cpaction: true, governmentGrant: true } : { governmentGrant: true };
    await gameRef.update(gameUpdate);
  }
};

export const resilientPopulation = async (card, city, cpaction) => {
  console.log('Resilient Population!');
  cpaction
    ? await card.delete()
    : await Promise.all([
      discardEventCard('ResilientPopulation'),
      await card.delete()
    ]);
};

export const governmentGrant = async (city, cpaction) => {
  console.log('Government Grant!');
  const gameRef = await getGameRef();
  const gameSnapshot = await gameRef.get();
  if (gameSnapshot.remainingResearchStations === 0) {
    await Promise.all([
      discardEventCard('GovernmentGrant'),
      gameRef.update({ governmentGrant: false })
    ]);
  } else {
    const currentCityRef = await getCityRef(city.id, gameRef);
    cpaction ?
      await Promise.all([
        // set research station to true for that city.
        currentCityRef.update({ researchStation: true }),
        // update remaining research stations count
        setRemainingResearchStations(gameRef, gameSnapshot),
        gameRef.update({ governmentGrant: false, cpaction: false })
      ]) :
      await Promise.all([
        // set research station to true for that city.
        currentCityRef.update({ researchStation: true }),
        // update remaining research stations count
        setRemainingResearchStations(gameRef, gameSnapshot),
        discardEventCard('GovernmentGrant'),
        gameRef.update({ governmentGrant: false })
      ]);
  }
};

export const discardEventCard = async eventCardId => {
  const state = await store.getState();
  const ownId = getOwnId(state);
  const playerHand = getOwnHand(state);
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(ownId, gameRef);
  const newHand = playerHand.filter(card => card.id !== eventCardId);
  await Promise.all([
    playerRef.update({ currentHand: newHand }),
    gameRef.collection('trashedPlayerCards').doc(eventCardId).set({ id: eventCardId, name: eventCardId })
  ]);
};
