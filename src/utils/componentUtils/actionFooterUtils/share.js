import { getUnusedCityCardRef, getPlayerRef } from '../../index';
import { updateActionsRemaining } from './index';
import { getGameRef } from '../../getFirestoreData';

// Check if card for the current city exists in a hand
export const inHand = (hand, cityName) => hand.find(card => card.id === cityName);

// Shares cards
export const shareKnowledge = async (ownId, ownCity, actionsRemaining, nextTurn, playerNumber) => {
  console.log('Sharing Knowledge!');
  const cityName = ownCity.name;

  // getSnapshots
  const gameRef = await getGameRef();
  const ownPlayerRef = await getPlayerRef(ownId, gameRef);
  const currentPlayerSnapshot = await ownPlayerRef.get();
  const targetPlayerRef = await getPlayerRef(playerNumber, gameRef);
  const targetPlayerSnapshot = await targetPlayerRef.get();
  const ownCityRef = await getUnusedCityCardRef(ownCity.id, gameRef);
  const ownCitySnapshot = await ownCityRef.get();

  // Different hands
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const targetHand = targetPlayerSnapshot.data().currentHand;

  // Filter out cards
  const filterHand = (hand, cityName) => hand.filter(card => card.id !== cityName);

  const isInHand = inHand(currentHand, cityName);
  // sets the new hands.
  const newCurrentHand = isInHand ? filterHand(currentHand, cityName) : currentHand.concat(ownCitySnapshot.ref);
  const newTargetHand = isInHand ? targetHand.concat(ownCitySnapshot.ref) : filterHand(targetHand, cityName);

  // update hands.
  await currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
  await targetPlayerSnapshot.ref.update({ currentHand: newTargetHand});
  await updateActionsRemaining(actionsRemaining, nextTurn);
};

// Gets players to share with
export const shareKnowledgePlayers = (playersInSameCity, ownCity, currentPlayer) => {
  // If the currentPlayer has the current city's card
  if (currentPlayer && inHand(currentPlayer.currentHand, ownCity)) return playersInSameCity;
  // If another player in the same city has the current city's card.
  return playersInSameCity && playersInSameCity.filter(player => inHand(player.currentHand, ownCity));
};
