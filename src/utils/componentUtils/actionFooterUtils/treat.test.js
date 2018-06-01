import { treatDisease } from './treat';

describe('treat', () => {
  const firestore = {
    get: () => testGame
  };
  const updateTotalCubeCount = jest.fn();
  const updateCityCubeCount = jest.fn();
  const testGame = {
    data: () => ({blueDiseaseCubes: 23}),
    ref: {
      collection: () => ({
        doc: () => ({
          get: () => ({
            ref: {
              update: updateCityCubeCount
            }
          })
        })
      }),
      update: updateTotalCubeCount
    }
  };
  describe('treatDisease', () => {
    it('calls update to increase the remaining disease cubes by 1', async () => {
      await treatDisease({firestore, currentCity: 'Atlanta', disease: ['blue', 3]});
      expect(updateTotalCubeCount).toHaveBeenCalledWith({blueDiseaseCubes: 24});
    });

    it('calls update to reduce the number of cubes by 1', async () => {
      await treatDisease({firestore, currentCity: 'Atlanta', disease: ['blue', 3]});
      expect(updateCityCubeCount).toHaveBeenCalledWith({blue: 2});
    });

  });
});
