import { getPlayersInSameCity, getCurrentCityId, getCurrentPlayer, getGameRef, getCurrentCityRef, getPlayerRef } from '../../index';

export const shareKnowledge = async (firestore, currentTurn, currentCity, playerNumber) => {
  const game = await getGameRef(firestore);
  // getSnapshots
  const currentPlayerSnapshot = await getPlayerRef(game, `${currentTurn}`).get();
  const targetPlayerSnapshot = await getPlayerRef(game, playerNumber).get();
  const currentCitySnapshot = await getCurrentCityRef(game, currentCity.id).get();

  // Different hands
  const currentHand = currentPlayerSnapshot.data().currentHand;
  const targetHand = targetPlayerSnapshot.data().currentHand;
  // Check if card for the current city exists in currentHand
  const inCurrentHand = currentHand.find(card => card.id === currentCity.name);

  // Filter out cards
  const filterHand = (hand, cityName) => hand.filter(card => card.id !== cityName);

  const city = currentCity.name;
  // sets the new hands.
  const newCurrentHand = inCurrentHand ? filterHand(currentHand, city) : currentHand.concat(currentCitySnapshot.ref);
  const newTargetHand = inCurrentHand ? targetHand.concat(currentCitySnapshot.ref) : filterHand(targetHand, city);

  // updates.
  currentPlayerSnapshot.ref.update({ currentHand: newCurrentHand });
  targetPlayerSnapshot.ref.update({ currentHand: newTargetHand});
};

const shareKnowledgePlayers = (playersInSameCity, currentCity, currentPlayer) => {
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
