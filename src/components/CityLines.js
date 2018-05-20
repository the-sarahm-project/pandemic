import React from 'react';
import { drawNeighborLines, drawBoundaryLines, boundaryCities } from '../utils';

const CityLines = () => {
  let lines = [];
  drawNeighborLines(lines, boundaryCities);
  drawBoundaryLines(lines, boundaryCities);
  return (
    <div>{lines}</div>
  );
};

export default CityLines;
