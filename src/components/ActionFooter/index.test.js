import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ActionFooter, { Move, Cure, Share, Build } from './index';
Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  const component = shallow(<ActionFooter />);

  it('renders Sidebar', () => {
    expect(component.find('Sidebar').name()).toBe('Sidebar');
  });

  it('renders a div with 5 children', () => {
    expect(component.find('div').children()).toHaveLength(5);
  });

  it('renders Move', () => {
    expect(component.find(Move)).toHaveLength(1);
  });

  it('renders Build', () => {
    expect(component.find(Build)).toHaveLength(1);
  });

  it('renders Share', () => {
    expect(component.find(Share)).toHaveLength(1);
  });

  it('renders Treat', () => {
    expect(component.find('Treat').name()).toBe('Treat');
  });

  it('renders Cure', () => {
    expect(component.find(Cure)).toHaveLength(1);
  });
});
