import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Build, mapStateToProps } from './Build';
import { shallowWithStore } from 'enzyme-redux';
import store from '../../store';
Enzyme.configure({ adapter: new Adapter() });

describe('Build', () => {
  it('receives correct props from store', () => {
    const expectedProps = {
      dispatch: () => {},
      firebase: {},
      currentTurn: 1,
      firestore: {},
      buildDisabled: false,
      currentCity: '',
      unusedCityCards: [],
      sameColorCityCards: []
    };
    const ConnectedComponent = compose(
      firestoreConnect(),
      connect(mapStateToProps)
    )(Build);
    const component = shallowWithStore(<ConnectedComponent />, store);
    expect(Object.keys(component.dive().props()).sort()).toEqual(Object.keys(expectedProps).sort());
  });

  describe('renders a card modal', () => {

    const component = shallow(<Build />);

    it('ChooseCardModal', () => {
      expect(component.find('ChooseCardModal').name()).toBe('ChooseCardModal');
    });

    it('that takes in the correct props', () => {
      const expectedProps = {
        className: '',
        ModalTrigger: {},
        disabled: false,
        cards: [],
        action: ()=>{}
      };
      expect(Object.keys(component.props()).sort()).toEqual(Object.keys(expectedProps).sort());
    });
  });
});
