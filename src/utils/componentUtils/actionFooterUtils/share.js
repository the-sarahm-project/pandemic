import { getGameRef, getUnusedCityCardRef, getPlayerRef } from '../../index';
import { updateActionsRemaining } from './index';

// Check if card for the current city exists in a hand
export const inHand = (hand, cityName) => hand.find(card => card.id === cityName);

// Shares cards
export const shareKnowledge = async (firestore, currentTurn, currentCity, actionsRemaining, nextTurn, playerNumber) => {
  const cityName = currentCity.name;
  const game = await getGameRef(firestore);

  // getSnapshots
  const currentPlayerSnapshot = await getPlayerRef(game, currentTurn).get();
  const targetPlayerSnapshot = await getPlayerRef(game, playerNumber).get();
  const currentCitySnapshot = await getUnusedCityCardRef(game, currentCity.id).get();

  // Different hands
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const targetHand = targetPlayerSnapshot.data().currentHand;

  // Filter out cards
  const filterHand = (hand, cityName) => hand.filter(card => card.id !== cityName);

  const isInHand = inHand(currentHand, cityName);
  // sets the new hands.
  const newCurrentHand = isInHand ? filterHand(currentHand, cityName) : currentHand.concat(currentCitySnapshot.ref);
  const newTargetHand = isInHand ? targetHand.concat(currentCitySnapshot.ref) : filterHand(targetHand, cityName);

  // update hands.
  await currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
  await targetPlayerSnapshot.ref.update({ currentHand: newTargetHand});
  await updateActionsRemaining(game, actionsRemaining, nextTurn);
};

// Gets players to share with
export const shareKnowledgePlayers = (playersInSameCity, currentCity, currentPlayer) => {
  // If the currentPlayer has the current city's card
  if (currentPlayer && inHand(currentPlayer.currentHand, currentCity)) return playersInSameCity;
  // If another player in the same city has the current city's card.
  return playersInSameCity && playersInSameCity.filter(player => inHand(player.currentHand, currentCity));
};
