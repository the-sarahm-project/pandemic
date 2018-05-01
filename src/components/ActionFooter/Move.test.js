import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Move, mapStateToProps } from './Move';
import { dummyState } from '../../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('Move', () => {
  it('receives correct props from store', () => {
    const expectedProps = {
      currentTurn: 1,
      neighbors: []
    };
    expect(Object.keys(mapStateToProps(dummyState)).sort()).toEqual(Object.keys(expectedProps).sort());
  });

  const component = shallow(<Move />);

  it('renders a Button', () => {
    expect(component.find('Button').name()).toBe('Button');
  });
});
