import { setCityResearchStation, setCureMarker, getCurrentPlayerSnapshot, setResearchStationTrue, setRemainingResearchStations, removeCards, updateCurrentHand } from './cure';

describe('build', () => {
  describe('cureDisease', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('setCureMarker', () => {
    const update = jest.fn();
      const game = {
        ref: {
          update
        }
      };
    const color = 'blue';

    it('calls update on the game ref with given color', () => {
      setCureMarker(game, color);
      expect(update).toHaveBeenCalledWith({ [`${color}CureMarker`]: true });
    });
  });

  describe('removeCards', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('updateCurrentHand', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('cureButtonDisabled', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('getCureDisabled', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });
});
