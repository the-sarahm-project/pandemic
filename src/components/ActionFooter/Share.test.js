import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Share, mapStateToProps } from './Share';
import { shallowWithStore } from 'enzyme-redux';
import store from '../../store';
Enzyme.configure({ adapter: new Adapter() });

describe('Share', () => {
  it('receives correct props from store', () => {
    const expectedProps = {
      dispatch: () => {},
      firebase: {},
      firestore: {},
      currentTurn: 1,
      shareKnowledgeDisabled: false,
      shareKnowledgePlayers: [],
      currentCity: ''
    };
    const ConnectedComponent = compose(
      firestoreConnect(),
      connect(mapStateToProps)
    )(Share);
    const component = shallowWithStore(<ConnectedComponent />, store);
    expect(Object.keys(component.dive().props()).sort()).toEqual(Object.keys(expectedProps).sort());
  });

  describe('renders a Choose Player Modal', () => {

    const component = shallow(<Share />);

    it('ChoosePlayerModal', () => {
      expect(component.find('ChoosePlayerModal').name()).toBe('ChoosePlayerModal');
    });

    it('that takes in the correct props', () => {
      const expectedProps = {
        ModalTrigger: {},
        disabled: false,
        players: [],
        action: ()=>{}
      };
      expect(Object.keys(component.props()).sort()).toEqual(Object.keys(expectedProps).sort());
    });
  });
});
