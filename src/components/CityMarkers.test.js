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
    expect(Object.keys(mapStateToProps(dummyState).cities).length).toEqual(48);
  });

  it('renders a div', () => {
    expect(component.find('div').length).toEqual(1);
  });

  it ('renders the correct number of Markers', () => {
    expect(component.find('Marker').length).toEqual(48);
  });

  it ('renders the correct number of Research Stations', () => {
    expect(component.find('ResearchStation').length).toEqual(2);
  });
});
