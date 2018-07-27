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

export const getNextTurn = state => {
  const currentTurn = getCurrentTurn(state);
  const players = getPlayers(state);
  let newTurn = currentTurn + 1;
  if (newTurn > Object.keys(players).length) newTurn = 1;
  while (newTurn !== currentTurn && !players[newTurn].active) {
    newTurn++;
    if (newTurn > Object.keys(players).length) newTurn = 1;
  }
  return newTurn;
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

export const getUnusedEventCards = state => {
  const game = getGame(state);
  return game && game.unusedEventCards;
};

export const getCurrentCity = state => {
  const cities = getCities(state);
  const currentCityId = getCurrentCityId(state);
  return cities && cities[currentCityId];
};

export const getActionsRemaining = state => {
  const game = getGame(state);
  return game && game.actionsRemaining;
};

export const getMaxSameColorCityCards = state => {
  const currentHand = getCurrentHand(state);
  const unusedCityCards = getUnusedCityCards(state);
  // count same color cards
  const colorCount = {};
  for (const cardRef of currentHand) {
    const card = unusedCityCards[cardRef.id];
    colorCount[card.color] = colorCount[card.color] ? colorCount[card.color].concat(cardRef) : [cardRef];
  }
  for (const cards of Object.values(colorCount)) {
    if (cards.length >= 5) {
      return cards;
    }
  }
  return [];
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

export const getNeighbors = state => {
  const currentTurn = getCurrentTurn(state);
  const cities = getCities(state);
  const currentCityId = getCurrentCityId(state);
  return currentTurn && cities[currentCityId].neighbors;
};

export const getIsMoving = state => {
  const currentPlayer = getCurrentPlayer(state);
  return currentPlayer && currentPlayer.isMoving;
};

export const getCurrentId = props => {
  const {firebase, firestore, players } = props;
  const uid = firebase.auth().currentUser.uid;
  for (const [key, value] of Object.entries(players)) {
    // user is in game.
    if (value.uid === uid) {
      return key;
    // user is not in game.
    } else if (!value.active) {
      getPlayerRef(firestore, key).update({ active: true, uid });
      return key;
    }
  }
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
  const game = getGame(state);
  const maxSameColorCityCards = getMaxSameColorCityCards(state);
  return cureButtonDisabled(game, currentCity, maxSameColorCityCards.length);
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

export const getPlayerRef = async (firestore, player) => {
  const game = await getGameRef(firestore);
  return game.ref.collection('players').doc(`${player}`);
};
