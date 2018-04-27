import { initialCities, drawNeighborLines, drawBoundaryLines } from '../utils';

const CityLines = () => {
  const cities = Object.values(initialCities);
  const boundaryCities = ['Sydney','Manila','Tokyo','SanFrancisco','LosAngeles'];
  let lines = [];
  drawNeighborLines(lines, boundaryCities);
  lines = drawBoundaryLines(lines, boundaryCities);
  return lines;
};

export default CityLines;
