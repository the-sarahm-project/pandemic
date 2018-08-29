import { getPlayerRef, getGameRef } from "../../getFirestoreData";
import { trashPlayerCards } from ".";

export const removeCardFromHand = async (id, playerHand, cardsToRemove) => {
  if (playerHand.length - cardsToRemove.length !== 7) {
    alert(`You need to discard ${playerHand.length - 7} cards!`);
    return false;
  }
  console.log('Discarding Cards from Hand!');
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(id, gameRef);
  const newHand = playerHand.filter(card => !cardsToRemove.includes(card));
  await trashPlayerCards(cardsToRemove);
  await playerRef.update({ currentHand: newHand });
  return true;
};
