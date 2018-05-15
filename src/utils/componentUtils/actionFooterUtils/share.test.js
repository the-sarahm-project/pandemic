import { shareKnowledge, shareKnowledgePlayers } from './share';

describe('share', () => {
  describe('shareKnowledge', () => {
    // takes in firestore, currentTurn, currentCity, playerNumber
    //getGameRef
    const testFirestore = {
      get: () => testGame
    };
    const collection = collectionName => collections[collectionName];
    const testGame = {
      ref: {
        collection
      }
    };

    //getPlayerRef && getCurrentCityRef
    const unusedCityCardsDoc = {
      Atlanta: {get: () => ({ref: {id: 'Atlanta'}})},
      Paris: {get: () => ({ref: {id: 'Paris'}})},
      Miami: {get: () => ({ref: {id: 'Miami'}})},
      LosAngeles: {get: () => ({ref: {id: 'LosAngeles'}})},
      Lima: {get: () => ({ref: {id: 'Lima'}})},
      London: {get: () => ({ref: {id: 'London'}})},
      Bogota: {get: () => ({ref: {id: 'Bogota'}})}
    };
    const unusedCityCards = {
      doc: currentCityId => unusedCityCardsDoc[currentCityId]
    };
    const playerOneHand = {currentHand: [{id: 'Atlanta'}, {id: 'Miami'}, {id: 'Lima'}]};
    const playerTwoHand = {currentHand: [{id: 'LosAngeles'}, {id: 'Paris'}]};
    const updatePlayerOne = jest.fn();
    const updatePlayerTwo = jest.fn();
    const playersDoc = {
      1: {get: () => ({data: () => playerOneHand, ref: { update: updatePlayerOne}})},
      2: {get: () => ({data: () => playerTwoHand, ref: { update: updatePlayerTwo}})}
    };
    const players = {
      doc: playerNum => playersDoc[playerNum]
    };
    const collections = {
      unusedCityCards,
      players
    };

    // Other arguments.
    const currentTurn = 1;
    const currentCity = {
      id: "Miami",
      name: "Miami"
    };
    const playerNumber = 2;

    shareKnowledge(testFirestore, currentTurn, currentCity, playerNumber);
    it('calls update on currentHand', () => {
      expect(updatePlayerOne).toHaveBeenCalledWith({currentHand: [{id: 'Atlanta'}, {id: 'Lima'}]});
    });

    it('calls update on targetHand', () => {
      expect(updatePlayerTwo).toHaveBeenCalledWith({currentHand: [{id: 'LosAngeles'}, {id: 'Paris'}, {id: 'Miami'}]});
    });
  });

  describe('shareKnowledgePlayers', () => {
    const playerOne = {currentHand: [], currentCity: 'Bogota'};
    const playerTwo = {currentHand: [], currentCity: 'Bogota'};
    const playerThree = {currentHand: [{id: 'Atlanta'}, {id: 'Miami'}, {id: 'Lima'}], currentCity: 'Miami'};
    const playerFour = {currentHand: [{id: 'LosAngeles'}, {id: 'Paris'}], currentCity: 'Miami'};
    const playerFive = {currentHand: [], currentCity: 'Miami'};
    const playerSix = {currentHand: [], currentCity: 'Paris'};
    const playerSeven = {currentHand: [{id: 'LosAngeles'}, {id: 'Paris'}], currentCity: 'Paris'};
    it('returns an array', () => {
      const playersInSameCity = [playerTwo];
      const currentCity = 'Bogota';
      const currentPlayer = playerOne;
      const players = shareKnowledgePlayers(playersInSameCity, currentCity, currentPlayer);
      expect(Array.isArray(players)).toBe(true);
    });

    it('returns empty array if no players have the currentCity card.', () => {
      const playersInSameCity = [playerTwo];
      const currentCity = 'Bogota';
      const currentPlayer = playerOne;
      const players = shareKnowledgePlayers(playersInSameCity, currentCity, currentPlayer);
      expect(players.length).toBe(0);
    });

    it('returns all other players if the current player has the current city card', () => {
      const playersInSameCity = [playerFour, playerFive];
      const currentCity = 'Miami';
      const currentPlayer = playerThree;
      const players = shareKnowledgePlayers(playersInSameCity, currentCity, currentPlayer);
      expect(players).toEqual([playerFour, playerFive]);
    });

    it('returns the player with the card if another player in the same city has the current city card', () => {
      const playersInSameCity = [playerSeven];
      const currentCity = 'Paris';
      const currentPlayer = playerSix;
      const players = shareKnowledgePlayers(playersInSameCity, currentCity, currentPlayer);
      expect(players).toEqual([playerSeven]);
    });
  });
});
