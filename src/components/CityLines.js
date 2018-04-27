import { drawNeighborLines, drawBoundaryLines } from '../utils';

const CityLines = () => {
  const boundaryCities = ['Sydney','Manila','Tokyo','SanFrancisco','LosAngeles'];
  let lines = [];
  drawNeighborLines(lines, boundaryCities);
  drawBoundaryLines(lines, boundaryCities);
  return lines;
};

export default CityLines;
