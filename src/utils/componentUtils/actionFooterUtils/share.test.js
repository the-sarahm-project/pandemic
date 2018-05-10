import { shareKnowledge, shareKnowledgePlayers, getShareKnowledgePlayers } from './share';

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

    // currentTurn
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

  // describe('shareKnowledgePlayers', () => {
  //   it('calls update to decrement the amount of Research Stations', () => {
  //     expect(update).toHaveBeenCalledWith({remainingResearchStations: remainingResearchStations - 1});
  //   });
  // });

  // describe('getShareKnowledgePlayers', () => {
  //   it('calls update to set ResearchStation to true', () => {
  //     expect(update).toHaveBeenCalledWith({researchStation: true});
  //   });
  // });
});
