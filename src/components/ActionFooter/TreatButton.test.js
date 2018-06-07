import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TreatButton, mapStateToProps } from './TreatButton';
Enzyme.configure({ adapter: new Adapter() });
import { dummyState } from '../../utils';

describe('TreatButton', () => {
  it('receives correct props from mapStateToProps', () => {
    const expectedProps = ['currentCity'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  const firestore = {
    get: () => testGame
  };
  const updateTotalCubeCount = jest.fn();
  const updateCityCubeCount = jest.fn();
  const testGame = {
    data: () => ({blueDiseaseCubes: 23}),
    ref: {
      collection: () => ({
        doc: () => ({
          get: () => ({
            ref: {
              update: updateCityCubeCount
            }
          })
        })
      }),
      update: updateTotalCubeCount
    }
  };
  // const setSelectedAndActive = jest.fn();
  const component = shallow(<TreatButton />);

  component.setProps({firestore, currentCity: 'Atlanta', disease: 'blue,3'});
  it('executes treatDisease when clicked', (done) => {
    component.find('Button').simulate('click');
    // "It would rely on the fact that resolved Promise callbacks fire before the setImmediate callback."
    // https://github.com/airbnb/enzyme/issues/823
    setImmediate(() => {
      expect(updateTotalCubeCount).toHaveBeenCalled();
      expect(updateCityCubeCount).toHaveBeenCalled();
      done();
    });
  });

  describe('renders', () => {
    it('a Button', () => {
      expect(component.find('Button').name()).toBe('Button');
    });

    it('a Button with an Icon and a div', () => {
      expect(component.find('Button').childAt(0).name()).toBe('Icon');
      expect(component.find('Button').childAt(1).name()).toBe('div');
    });
  });
});
