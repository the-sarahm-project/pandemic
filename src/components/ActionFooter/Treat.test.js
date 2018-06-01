import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Treat, mapStateToProps } from './Treat';
import { TreatButton } from './index';
import { dummyState } from '../../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('Treat', () => {
  it('receives correct props from mapStateToProps', () => {
    const expectedProps = ['diseaseCubes'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  describe('renders TreatButton', () => {
    const component = shallow(<Treat />);
    it('TreatButton', () => {
      expect(component.find(TreatButton)).toHaveLength(1);
    });

    it('that takes in the correct props', () => {
      const expectedProps = ['disease'];
      expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedProps));
    });
  });
});
