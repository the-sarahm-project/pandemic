import { initAndSetupGame } from './app';

describe('app', () => {
  describe('initAndSetupGame', () => {
    it('returns if create is false', async () => {
      expect(await initAndSetupGame(4, 4, false)).toBe(undefined);
    });
  });
});
