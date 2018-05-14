import { setResearchStationTrue, setRemainingResearchStations } from './build';

describe('build', () => {
  describe('setResearchStationTrue', () => {
    const update = jest.fn();
    const currentCityRef = {
      update
    };
    it('calls update to set ResearchStation to true', () => {
      setResearchStationTrue(currentCityRef);
      expect(update).toHaveBeenCalledWith({researchStation: true});
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
      expect(update).toHaveBeenCalledWith({remainingResearchStations: remainingResearchStations - 1});
    });
  });
});
