import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CityLines from './CityLines';
Enzyme.configure({ adapter: new Adapter() });

describe('CityLines', () => {
  const component = shallow(<CityLines />);
  it('renders all 96 lines', () => {
    expect(component.children().find('Polyline').length).toEqual(96);
  });
});
