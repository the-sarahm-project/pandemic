import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { TreatModal, TreatButton } from './index';
import { getDiseaseCubes } from '../../utils';

export const Treat = ({ diseaseCubes }) => {
  return (
    diseaseCubes && diseaseCubes.length === 1 ?
      <TreatButton disease={diseaseCubes && diseaseCubes[0]} /> : //diseaseCubes[0] because only 1 cube color.
      <TreatModal diseases={diseaseCubes} />
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
