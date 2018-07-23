import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { TreatModal, TreatButton } from './index';
import { getCurrentCityDiseaseCubes } from '../../utils';

export const Treat = ({ diseaseCubes, checkClicked }) => {
  return (
    diseaseCubes && diseaseCubes.length === 1 ?
      <TreatButton checkClicked={checkClicked} disease={diseaseCubes && diseaseCubes[0]} /> : //diseaseCubes[0] because only 1 cube color.
      <TreatModal diseases={diseaseCubes} />
  );
};

export const mapStateToProps = (state) => {
  return {
    diseaseCubes: getCurrentCityDiseaseCubes(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Treat);
