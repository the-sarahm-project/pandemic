import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Move, mapStateToProps } from './Move';
import { dummyState } from '../../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('Move', () => {
  it('receives correct props from store', () => {
    const expectedProps = ['currentTurn'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  const component = shallow(<Move />);

  it('renders a Button', () => {
    expect(component.find('Button').name()).toBe('Button');
  });
});
