import { setCityResearchStation, getGameRef, getCurrentPlayerSnapshot, setResearchStationTrue, setRemainingResearchStations, removeCards, updateCurrentHand } from './cure';

describe('build', () => {
  describe('setCityResearchStation', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('getGame', () => {
    it('calls firestore.get ', () => {
      const firestore = {};
      firestore.get = jest.fn();
      getGameRef(firestore);
      expect(firestore.get).toHaveBeenCalled();
    });
  });

  describe('getCurrentPlayerSnapshot', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('setResearchStationTrue', () => {
    it('does something', () => {
      expect(2).toEqual(2);
    });
  });

  describe('setRemainingResearchStations', () => {
    it('does something', () => {
      expect(2).toEqual(2);
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
});
