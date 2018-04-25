import { cities, drawNeighborLines, drawBoundaryLines } from '../utils';

const CityLines = () => {
  const boundaryCities = ['Sydney','Manila','Tokyo','SanFrancisco','LosAngeles'];
  let lines = [];
  drawNeighborLines(lines, boundaryCities);
  lines = drawBoundaryLines(lines, cities, boundaryCities);
  return lines;
};

export default CityLines;
