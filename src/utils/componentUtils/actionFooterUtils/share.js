import { getPlayersInSameCity, getCurrentCityId, getCurrentPlayer, getGameRef, getCurrentCityRef, getPlayerRef } from '../../index';

export const shareKnowledge = async (firestore, currentTurn, currentCity, playerNumber) => {
  const cityName = currentCity.name;
  const game = await getGameRef(firestore);

  // getSnapshots
  const currentPlayerSnapshot = await getPlayerRef(game, `${currentTurn}`).get();
  const targetPlayerSnapshot = await getPlayerRef(game, playerNumber).get();
  const currentCitySnapshot = await getCurrentCityRef(game, currentCity.id).get();

  // Different hands
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const targetHand = targetPlayerSnapshot.data().currentHand;

  // Check if card for the current city exists in currentHand
  const inHand = currentHand.find(card => card.id === cityName);

  // Filter out cards
  const filterHand = (hand, cityName) => hand.filter(card => card.id !== cityName);

  // sets the new hands.
  const newCurrentHand = inHand ? filterHand(currentHand, cityName) : currentHand.concat(currentCitySnapshot.ref);
  const newTargetHand = inHand ? targetHand.concat(currentCitySnapshot.ref) : filterHand(targetHand, cityName);

  // update hands.
  currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
  targetPlayerSnapshot.ref.update({ currentHand: newTargetHand});
};

export const shareKnowledgePlayers = (playersInSameCity, currentCity, currentPlayer) => {
  if (!playersInSameCity || !currentCity || !currentPlayer) return;
  if (currentPlayer.currentHand.find(card => card.id === currentCity)) return playersInSameCity;
  else return playersInSameCity.filter(player => player[1].currentHand.find(card => card.id === currentCity));
};

export const getShareKnowledgePlayers = state => {
  const playersInSameCity = getPlayersInSameCity(state);
  const currentCityId = getCurrentCityId(state);
  const currentPlayer = getCurrentPlayer(state);
  return shareKnowledgePlayers(playersInSameCity, currentCityId, currentPlayer);
};
