import { cureButtonDisabled, shareKnowledgePlayers, buildButtonDisabled } from './index';
import history from '../history';

/* Firestore Data */
export const getGame = state => {
  const doc = history.location.pathname.slice(1);
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
  return players && Object.values(players).reduce((totalPlayers, player) => {
    if (player.id !== currentTurn && player.currentCity === currentCityId ) {
      totalPlayers.push(player);
    }
    return totalPlayers;
  }, []);
};

export const getEventCards = state => {
  const game = getGame(state);
  return game && game.unusedEventCards;
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

export const getCurrentCityDiseaseCubes = state => {
  const currentCity = getCurrentCity(state);
  let diseaseCubes = [];
  if (currentCity) {
    if (currentCity.red) diseaseCubes.push(['red', currentCity.red]);
    if (currentCity.blue) diseaseCubes.push(['blue', currentCity.blue]);
    if (currentCity.yellow) diseaseCubes.push(['yellow', currentCity.yellow]);
    if (currentCity.black) diseaseCubes.push(['black', currentCity.black]);
  }
  return diseaseCubes;
};

// Build
export const getBuildDisabled = state => {
  const currentCityId = getCurrentCityId(state);
  const currentHand = getCurrentHand(state);
  const remainingResearchStations = getRemainingResearchStations(state);
  return buildButtonDisabled(remainingResearchStations, currentHand, currentCityId);
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
export const getShareKnowledgePlayers = state => {
  const playersInSameCity = getPlayersInSameCity(state);
  const currentCityId = getCurrentCityId(state);
  const currentPlayer = getCurrentPlayer(state);
  return shareKnowledgePlayers(playersInSameCity, currentCityId, currentPlayer);
};

export const getShareKnowledgeDisabled = state => {
  const shareKnowledgePlayers = getShareKnowledgePlayers(state);
  return shareKnowledgePlayers && !shareKnowledgePlayers.length;
};

/* Firestore Refs */
export const getGameRef = firestore => {
  const doc = history.location.pathname.slice(1);
  return firestore.get(`games/${doc}`);
};

export const getUnusedCityCardRef = (game, cityId) => {
  return game.ref.collection('unusedCityCards').doc(cityId);
};

export const getCityRef = (game, cityId) => {
  return game.ref.collection('cities').doc(cityId);
};

export const getPlayerRef = (game, player) => {
  return game.ref.collection('players').doc(player);
};
