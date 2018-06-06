import { buildResearchStation, setRemainingResearchStations, buildButtonDisabled } from './build';

describe('build', () => {
  describe('buildResearchStation', () => {
    const updateCurrentHand = jest.fn();
    const deleteCard = jest.fn();
    const currentPlayerSnapshot = {
      ref: {
        update: updateCurrentHand
      },
      data: () => ({
        currentHand: [
          {id: 'Atlanta', color: 'blue', delete: deleteCard},
          {id: 'Paris', color: 'blue'},
          {id: 'Lima', color: 'yellow'}
        ]
      })
    };
    const playerDoc = {
      get: () => currentPlayerSnapshot
    };
    const setResearchStationTrue = jest.fn();
    const setRemainingResearchStations = jest.fn();
    const collections = {
      cities: {
        doc: () => ({ update: setResearchStationTrue})
      },
      players: {
        doc: () => playerDoc
      }
    };
    const testGame = {
      ref: {
        collection: collection => collections[collection],
        update: setRemainingResearchStations
      },
      data: () => ({ remainingResearchStations: 1 })
    };
    const testFirestore = {
      get: () => testGame
    };
    it('calls update to set ResearchStation to true', async () => {
      await buildResearchStation(testFirestore, 'Atlanta', 1);
      expect(updateCurrentHand).toHaveBeenCalled();
      expect(deleteCard).toHaveBeenCalled();
      expect(setResearchStationTrue).toHaveBeenCalled();
      expect(setRemainingResearchStations).toHaveBeenCalled();
    });
  });

  describe('setRemainingResearchStations', () => {
    const update = jest.fn();
    const remainingResearchStations = 5;
    const game = {
      data: () => ({
        remainingResearchStations
      }),
      ref: {
        update
      }
    };
    it('calls update to decrement the amount of Research Stations', () => {
      setRemainingResearchStations(game);
      expect(update).toHaveBeenCalledWith({remainingResearchStations: 4});
    });
  });

  describe('buildButtonDisabled', () => {
    it('is disabled if there are no more remainingResearchStations', () => {
      const remainingResearchStations = 0;
      const currentHand = [
        {id: 'Atlanta', color: 'blue'},
        {id: 'Paris', color: 'blue'},
        {id: 'Lima', color: 'yellow'}
      ];
      const currentCityId = 'Atlanta';
      const disabled = buildButtonDisabled(remainingResearchStations, currentHand, currentCityId);
      expect(disabled).toBe(true);
    });

    it('is disabled if the currentHand does not contain the current city card', () => {
      const remainingResearchStations = 5;
      const currentHand = [
        {id: 'Madrid', color: 'blue'},
        {id: 'Paris', color: 'blue'},
        {id: 'Lima', color: 'yellow'}
      ];
      const currentCityId = 'Atlanta';
      const disabled = buildButtonDisabled(remainingResearchStations, currentHand, currentCityId);
      expect(disabled).toBe(true);
    });

    it('is not disabled if there are remainingResearchStations and currentHand contains the current city card', () => {
      const remainingResearchStations = 5;
      const currentHand = [
        {id: 'Atlanta', color: 'blue'},
        {id: 'Paris', color: 'blue'},
        {id: 'Lima', color: 'yellow'}
      ];
      const currentCityId = 'Atlanta';
      const disabled = buildButtonDisabled(remainingResearchStations, currentHand, currentCityId);
      expect(disabled).toBe(false);
    });
  });
});
