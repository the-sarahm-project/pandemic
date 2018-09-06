import { getGameRef, getTrashedInfectionCardsSnapshot, getUnusedEventCardRef, getPlayerRef, getOwnId, getOwnHand } from "../getFirestoreData";
import store from '../../store';

export const eventAction = async function(card) {
  if (card === 'ResilientPopulation') {
    const gameRef = await getGameRef();
    const trashedInfectionCardsSnapshot = await getTrashedInfectionCardsSnapshot(gameRef);
    const modalCards = Object.values(trashedInfectionCardsSnapshot.docs).map(doc => doc.ref);
    this.setState({ cardModal: true, modalOpen: true, action: resilientPopulation, modalCards });
  }
};

const resilientPopulation = async card => {
  console.log('Resilient Population!');
  const state = await store.getState();
  const ownId = getOwnId(state);
  const playerHand = getOwnHand(state);
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(ownId, gameRef);
  const eventCardRef = await getUnusedEventCardRef('ResilientPopulation', gameRef);
  const newHand = playerHand.filter(card => card.id !== 'ResilientPopulation');
  await playerRef.update({ currentHand: newHand });
  await Promise.all([card.delete(), eventCardRef.delete()]);
};
