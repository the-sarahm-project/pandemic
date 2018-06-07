import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Treat, mapStateToProps } from './Treat';
import { TreatButton, TreatModal } from './index';
import { dummyState } from '../../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('Treat', () => {
  it('receives correct props from mapStateToProps', () => {
    const expectedProps = ['diseaseCubes'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  describe('renders TreatButton when only a single color diseaseCube', () => {
    const component = shallow(<Treat diseaseCubes={[1]} />);
    it('TreatButton', () => {
      expect(component.find(TreatButton)).toHaveLength(1);
    });

    it('that takes in the correct props', () => {
      const expectedProps = ['disease'];
      expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedProps));
    });
  });

  describe('renders TreatModal when only multiple color disease cubes', () => {
    const component = shallow(<Treat diseaseCubes={[1, 2]} />);
    it('TreatModal', () => {
      expect(component.find(TreatModal)).toHaveLength(1);
    });

    it('that takes in the correct props', () => {
      const expectedProps = ['diseases'];
      expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedProps));
    });
  });
});
