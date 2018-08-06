import { getPlayerRef, getGameRef } from "../getFirestoreData";

export const removeCardFromHand = async (id, playerHand, cardsToRemove) => {
  if (playerHand.length - cardsToRemove.length > 7) return alert('You need to discard more cards!');
  else if (playerHand.length - cardsToRemove.length < 7) return alert('You tried to discard too many cards!');
  console.log('Discarding Cards from Hand!');
  const gameRef = await getGameRef();
  const playerRef = await getPlayerRef(id, gameRef);
  const newHand = playerHand.filter(card => !cardsToRemove.includes(card));
  return await playerRef.update({ currentHand: newHand });
};
