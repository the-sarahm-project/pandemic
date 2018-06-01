import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { TreatModal, TreatButton } from './index';
import { getDiseaseCubes } from '../../utils';

export const Treat = ({ diseaseCubes }) => {
  return (
    <TreatButton disease={diseaseCubes && diseaseCubes[0]} /> //diseaseCubes[0] because only 1 cube color.
  );
};

export const mapStateToProps = (state) => {
  return {
    diseaseCubes: getDiseaseCubes(state)
  };
};

export default compose(
  firestoreConnect(),
  connect(mapStateToProps)
)(Treat);
