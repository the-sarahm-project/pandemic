import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CityMarkers, mapStateToProps } from './CityMarkers';
import { dummyState, doc } from '../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('CityMarkers', () => {
  const component = shallow(<CityMarkers />);
  component.setProps({cities: dummyState.firestore.data.games[doc].cities});
  it('receives correct props from mapStateToProps', () => {
    const expectedProps = ['cities'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  it('renders 48 divs for each city', () => {
    expect(component.children().every('div')).toBe(true);
    expect(component.children().length).toEqual(48);
  });

  describe('Markers', () => {
    it('renders Markers with a Tooltip with a Label', () => {
      const marker = component.find('Marker').at(0);
      const tooltip = marker.childAt(0);
      const label = tooltip.childAt(0);
      expect(marker.name()).toBe('Marker');
      expect(tooltip.name()).toBe('Tooltip');
      expect(label.name()).toBe('Label');
    });

    it('renders the correct number of Markers', () => {
      expect(component.find('Marker').length).toEqual(48);
      expect(component.find('Tooltip').length).toEqual(48);
      expect(component.find('Label').length).toEqual(48);
    });
  });

  it('renders the correct number of Research Stations', () => {
    expect(component.find('ResearchStation').length).toEqual(2);
  });

  it('renders the correct number of Disease Cubes', () => {
    expect(component.find('DiseaseCube').length).toEqual(5);
  });
});
