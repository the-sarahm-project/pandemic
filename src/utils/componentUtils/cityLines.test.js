import { drawNeighborLines, drawBoundaryLines, boundaryCities } from './cityLines';

describe('chooseCardModal', () => {
  const lines = [];
  describe('drawNeighborLines', () => {
    it('adds 88 Polylines to lines array', () => {
      drawNeighborLines(lines, boundaryCities);
      expect(lines).toHaveLength(88);
    });
  });

  describe('drawBoundaryLines', () => {
    it('adds 8 Polylines to lines array', () => {
      drawBoundaryLines(lines, boundaryCities);
      expect(lines).toHaveLength(96);
    });
  });
});
