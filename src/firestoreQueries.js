import { doc, shareKnowledgePlayers, researchStationButtonDisabled } from './index';



export const getGame = (state) => {
  return state.firestore.data.games && state.firestore.data.games[doc];
};

export const getCurrentTurn = (state) => {
  const game = getGame(state);
  return game && game.currentTurn;
};

export const getCities = (state) => {
  const game = getGame(state);
  return game && game.cities;
};

export const getPlayers = (state) => {
  const game = getGame(state);
  return game && game.players;
};

export const getCurrentPlayer = (state) => {
  const players = getPlayers(state);
  const currentTurn = getCurrentTurn(state);
  return players && players[currentTurn];
};

export const getCurrentCityId = (state) => {
  const players = getPlayers(state);
  const currentTurn = getCurrentTurn(state);
  return players && currentTurn && players[currentTurn].currentCity;
};

export const getPlayersInSameCity = (state) => {
  const players = getPlayers(state);
  const currentCityId = getCurrentCityId(state);
  const currentTurn = getCurrentTurn(state);
  return players && Object.entries(players).filter(player =>
    player[1].currentCity === currentCityId && Number(player[0]) !== currentTurn
  );
};

export const getNeighbors = (state) => {
  const currentTurn = getCurrentTurn(state);
  const cities = getCities(state);
  const currentCityId = getCurrentCityId(state);
  return currentTurn && cities[currentCityId].neighbors;
};

export const getShareKnowledgePlayers = (state) => {
  const playersInSameCity = getPlayersInSameCity(state);
  const currentCityId = getCurrentCityId(state);
  const currentPlayer = getCurrentPlayer(state);
  return shareKnowledgePlayers(playersInSameCity, currentCityId, currentPlayer);
};

export const getRemainingResearchStations = (state) => {
  const game = getGame(state);
  return game && game.remainingResearchStations;
};

export const getCurrentHand = (state) => {
  const currentPlayer = getCurrentPlayer(state);
  return currentPlayer && currentPlayer.currentHand;
};

export const getUnusedCityCards = (state) => {
  const game = getGame(state);
  return game && game.unusedCityCards;
};

export const getCurrentCity = (state) => {
  const cities = getCities(state);
  const currentCityId = getCurrentCityId(state);
  return cities && cities[currentCityId];
};

export const getBuildDisabled = (state) => {
  const remainingResearchStations = getRemainingResearchStations(state);
  const currentCity = getCurrentCity(state);
  const currentHand = getCurrentHand(state);
  const unusedCityCards = getUnusedCityCards(state);
  return researchStationButtonDisabled(remainingResearchStations, currentCity, currentHand, unusedCityCards);
};

export const shareDisabled = (state) => {
  const shareKnowledgePlayers = getShareKnowledgePlayers(state);
  return shareKnowledgePlayers && !shareKnowledgePlayers.length;
};

export const sameColorCityCards = (state) => {
  const currentHand = getCurrentHand(state);
  const unusedCityCards = getUnusedCityCards(state);
  const currentCity = getCurrentCity(state);
  return currentHand && currentHand.filter(card => unusedCityCards[card.id].color === currentCity.color);
};
