import { doc, cureButtonDisabled, getShareKnowledgePlayers } from './index';

/* Firestore Data */
export const getGame = state => {
  return state.firestore.data.games && state.firestore.data.games[doc];
};

export const getPlayerDeck = state => {
  const game = getGame(state);
  return game && game.playerDeck;
};

export const getCurrentTurn = state => {
  const game = getGame(state);
  return game && game.currentTurn;
};

export const getCities = state => {
  const game = getGame(state);
  return game && game.cities;
};

export const getPlayers = state => {
  const game = getGame(state);
  return game && game.players;
};

export const getCurrentPlayer = state => {
  const players = getPlayers(state);
  const currentTurn = getCurrentTurn(state);
  return players && players[currentTurn];
};

export const getCurrentCityId = state => {
  const players = getPlayers(state);
  const currentTurn = getCurrentTurn(state);
  return players && currentTurn && players[currentTurn].currentCity;
};

export const getPlayersInSameCity = state => {
  const players = getPlayers(state);
  const currentCityId = getCurrentCityId(state);
  const currentTurn = getCurrentTurn(state);
  return players && Object.entries(players).filter(player =>
    player[1].currentCity === currentCityId && Number(player[0]) !== currentTurn
  );
};

export const getRemainingResearchStations = state => {
  const game = getGame(state);
  return game && game.remainingResearchStations;
};

export const getCurrentHand = state => {
  const currentPlayer = getCurrentPlayer(state);
  return currentPlayer && currentPlayer.currentHand;
};

export const getUnusedCityCards = state => {
  const game = getGame(state);
  return game && game.unusedCityCards;
};

export const getCurrentCity = state => {
  const cities = getCities(state);
  const currentCityId = getCurrentCityId(state);
  return cities && cities[currentCityId];
};

export const getSameColorCityCards = state => {
  const currentHand = getCurrentHand(state);
  const unusedCityCards = getUnusedCityCards(state);
  const currentCity = getCurrentCity(state);
  return currentHand && currentHand.filter(card => unusedCityCards[card.id] && (unusedCityCards[card.id].color === currentCity.color));
};

// Cure
export const getCureDisabled = state => {
  const currentCity = getCurrentCity(state);
  const currentHand = getCurrentHand(state);
  const unusedCityCards = getUnusedCityCards(state);
  const game = getGame(state);
  return cureButtonDisabled(game, currentCity, currentHand, unusedCityCards);
};

// Share
export const getShareKnowledgeDisabled = state => {
  const shareKnowledgePlayers = getShareKnowledgePlayers(state);
  return shareKnowledgePlayers && !shareKnowledgePlayers.length;
};

/* Firestore Refs */
export const getGameRef = firestore => {
  return firestore.get(`games/${doc}`);
};

export const getCurrentCityRef = (game, currentCity) => {
  return game.ref.collection('unusedCityCards').doc(`${currentCity.id}`);
};

export const getPlayerRef = (game, player) => {
  return game.ref.collection('players').doc(player);
};
