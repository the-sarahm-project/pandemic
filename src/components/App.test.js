import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SidebarCards } from './index';
import { App } from './App';
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  const component = shallow(<App />);

  it('renders a div with three children', () => {
    expect(component.find('div').children()).toHaveLength(3);
  });

  it('renders Sidebar', () => {
    expect(component.find(SidebarCards)).toHaveLength(1);
  });

  it('renders Board', () => {
    expect(component.find('Board').name()).toBe('Board');
  });

  it('renders ActionFooter', () => {
    expect(component.find('ActionFooter').name()).toBe('ActionFooter');
  });
});
