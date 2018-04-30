import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Move, mapStateToProps } from './Move';
import { shallowWithStore } from 'enzyme-redux';
import store from '../../store';
Enzyme.configure({ adapter: new Adapter() });

describe('Move', () => {
  it('receives correct props from store', () => {
    const expectedProps = {
      dispatch: () => {},
      firebase: {},
      firestore: {},
      currentTurn: 1,
      neighbors: []
    };
    const ConnectedComponent = compose(
      firestoreConnect(),
      connect(mapStateToProps)
    )(Move);
    const component = shallowWithStore(<ConnectedComponent />, store);
    expect(Object.keys(component.dive().props()).sort()).toEqual(Object.keys(expectedProps).sort());
  });

  const component = shallow(<Move />);

  it('renders a Button', () => {
    expect(component.find('Button').name()).toBe('Button');
  });
});
