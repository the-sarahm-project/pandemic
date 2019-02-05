import { getPlayerRef, getGameRef, getTrashedPlayerCardRef } from "../../getFirestoreData";
import { updateActionsRemaining } from ".";

export const getTrashedEventCards = trashedPlayerCards => {
  const eventCards = ['GovernmentGrant', 'OneQuietNight', 'Forecast', 'Airlift', 'ResilientPopulation'];
  return (trashedPlayerCards && eventCards.reduce((trashedEventCards, eventCard) => {
    if (trashedPlayerCards[eventCard]) trashedEventCards.push({id: eventCard});
    return trashedEventCards;
  }, [])) || [];
};

export const updateContingencyCard = async (self, actionsRemaining, nextTurn, cpEventCard) => {
  console.log('Retrieving Event Card!');
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(self.id, gameRef);
  await Promise.all([
    playerRef.update({ cpEventCard: cpEventCard }),
    updateActionsRemaining(actionsRemaining, nextTurn)
  ]);
};

export const useContingencyCard = async self => {
  console.log('Using Event Card!');
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(self.id, gameRef);
  const trashedEventCard = await getTrashedPlayerCardRef(self.cpEventCard, gameRef);
  await Promise.all([
    gameRef.update({ resilientPopulationModal: true }),
    trashedEventCard.delete(),
    playerRef.update({ cpEventCard: null }),
  ]);
};
