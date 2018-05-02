import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameHeader, PlayerHand, PlayerMarkers, CityMarkers } from './index';
import Board from './Board';
Enzyme.configure({ adapter: new Adapter() });

describe('Board', () => {

  const component = shallow(<Board />);

  it('renders Map', () => {
    expect(component.find('Map').name()).toBe('Map');
  });

  // it('renders Sidebar', () => {
  //   expect(component.find(SidebarCards)).toHaveLength(1);
  // });

  // it('renders Board', () => {
  //   expect(component.find('Board').name()).toBe('Board');
  // });

  // it('renders ActionFooter', () => {
  //   expect(component.find('ActionFooter').name()).toBe('ActionFooter');
  // });
});
