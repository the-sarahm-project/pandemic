import { cureButtonDisabled, shareKnowledgePlayers, buildButtonDisabled } from './index';
import store from '../store';
import history from '../history';

const { firebase, firestore } = store;

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

export const getOwnId = () => {
  return firebase.auth().currentUser.id;
}

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

export const getSelf = state => {
  const players = getPlayers(state);
  const ownId = firebase.auth().currentUser.id;
  return players && players[ownId];
}

export const getCurrentCityId = state => {
  const players = getPlayers(state);
  const currentTurn = getCurrentTurn(state);
  return players && currentTurn && players[currentTurn].currentCity;
};

export const getOwnCityId = state => {
  const players = getPlayers(state);
  const ownId = firebase.auth().currentUser.id;
  return players && players[ownId].currentCity;
}

export const getPlayersInSameCity = state => {
  const players = getPlayers(state);
  const currentCityId = getCurrentCityId(state);
  const ownId = firebase.auth().currentUser.id;
  return players && Object.values(players).reduce((totalPlayers, player) => {
    if (player.id !== ownId && player.currentCity === currentCityId ) {
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

export const getOwnHand = state => {
  const self = getSelf(state);
  return self && self.currentHand;
}

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

export const getOwnCity = state => {
  const cities = getCities(state);
  const ownCityId = getOwnCityId(state);
  return cities && cities[ownCityId];
}

export const getActionsRemaining = state => {
  const game = getGame(state);
  return game && game.actionsRemaining;
};

export const getMaxSameColorCityCards = state => {
  const ownHand = getOwnHand(state);
  const unusedCityCards = getUnusedCityCards(state);
  const eventCards = getEventCards(state);
  // count same color cards
  const colorCount = {};
  for (const cardRef of ownHand) {
    if (cardRef.id in eventCards) continue;
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

export const getOwnCityDiseaseCubes = state => {
  const ownCity = getOwnCity(state);
  let diseaseCubes = [];
  if (ownCity) {
    if (ownCity.red) diseaseCubes.push(['red', ownCity.red]);
    if (ownCity.blue) diseaseCubes.push(['blue', ownCity.blue]);
    if (ownCity.yellow) diseaseCubes.push(['yellow', ownCity.yellow]);
    if (ownCity.black) diseaseCubes.push(['black', ownCity.black]);
  }
  return diseaseCubes;
};

export const getNeighbors = state => {
  const currentTurn = getSelf(state);
  const cities = getCities(state);
  const ownCityId = getOwnCityId(state);
  return currentTurn && cities[ownCityId].neighbors;
};

export const getIsMoving = state => {
  const currentPlayer = getCurrentPlayer(state);
  return currentPlayer && currentPlayer.isMoving;
};

// Build
export const getBuildDisabled = state => {
  const ownCityId = getOwnCityId(state);
  const ownHand = getOwnHand(state);
  const remainingResearchStations = getRemainingResearchStations(state);
  return buildButtonDisabled(remainingResearchStations, ownHand, ownCityId);
};

// Cure
export const getCureDisabled = state => {
  const ownCity = getOwnCity(state);
  const game = getGame(state);
  const maxSameColorCityCards = getMaxSameColorCityCards(state);
  return cureButtonDisabled(game, ownCity, maxSameColorCityCards.length);
};

// Share
export const getShareKnowledgePlayers = state => {
  const playersInSameCity = getPlayersInSameCity(state);
  const ownCityId = getOwnCityId(state);
  const self = getSelf(state);
  return shareKnowledgePlayers(playersInSameCity, ownCityId, self);
};

export const getShareKnowledgeDisabled = state => {
  const shareKnowledgePlayers = getShareKnowledgePlayers(state);
  return shareKnowledgePlayers && !shareKnowledgePlayers.length;
};

/* Firestore Refs */
export const getGameRef = async () => {
  const doc = history.location.pathname.slice(1);
  return await firestore.get(`games/${doc}`);
};

export const getUnusedCityCardRef = async cityId => {
  const game = await getGameRef();
  return await game.ref.collection('unusedCityCards').doc(cityId);
};

export const getCityRef = async cityId => {
  const game = await getGameRef();
  return await game.ref.collection('cities').doc(cityId);
};

export const getPlayerRef = async player => {
  const game = await getGameRef();
  return game.ref.collection('players').doc(`${player}`);
};
