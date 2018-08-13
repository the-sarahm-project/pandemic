import { updateActionsRemaining } from './index';
import { getGameRef, getPlayerSnapshot, getUnusedCityCardSnapshot } from '../../getFirestoreData';

// Check if card for the current city exists in a hand
export const inHand = (hand, cityName) => hand.find(card => card.id === cityName);

// Shares cards
export const shareKnowledge = async (ownId, ownCity, actionsRemaining, nextTurn, playerNumber, cityId) => {
  console.log('Sharing Knowledge!');
  // getSnapshots
  const gameRef = await getGameRef();
  const targetPlayerSnapshot = await getPlayerSnapshot(playerNumber, gameRef);
  const currentPlayerSnapshot = await getPlayerSnapshot(ownId, gameRef);

  // check if player chosen is a researcher, display ChooseCardModal to choose the card to share.
  cityId = (cityId && cityId[0].id) || ownCity.id;
  return updateHands(gameRef, currentPlayerSnapshot, targetPlayerSnapshot, actionsRemaining, nextTurn, cityId);
};

export const updateHands = async (gameRef, currentPlayerSnapshot, targetPlayerSnapshot, actionsRemaining, nextTurn, cityId) => {
  const citySnapshot = await getUnusedCityCardSnapshot(cityId, gameRef);
  const cityName = citySnapshot.data().name;

  // Different hands
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const targetHand = targetPlayerSnapshot.data().currentHand;

  // Filter out cards
  const filterHand = (hand, cityName) => hand.filter(card => card.id !== cityName);

  const isInHand = inHand(currentHand, cityName);
  // sets the new hands.
  const newCurrentHand = isInHand ? filterHand(currentHand, cityName) : currentHand.concat(citySnapshot.ref);
  const newTargetHand = isInHand ? targetHand.concat(citySnapshot.ref) : filterHand(targetHand, cityName);

  // update hands.
  await currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
  await targetPlayerSnapshot.ref.update({ currentHand: newTargetHand});
  updateActionsRemaining(actionsRemaining, nextTurn);
  return true;
};

// Gets players to share with
export const shareKnowledgePlayers = (playersInSameCity, ownCity, currentPlayer) => {
  // If the currentPlayer has the current city's card
  if (currentPlayer && inHand(currentPlayer.currentHand, ownCity)) return playersInSameCity;
  // If another player in the same city has the current city's card or has Researcher role
  return playersInSameCity && playersInSameCity.filter(player => player.role === 'Researcher' && player.currentHand.length || inHand(player.currentHand, ownCity));
};
