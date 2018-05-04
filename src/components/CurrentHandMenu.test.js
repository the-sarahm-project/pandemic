import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CurrentHandMenu from './CurrentHandMenu';
Enzyme.configure({ adapter: new Adapter() });

describe('CurrentHandMenu', () => {
  const component = shallow(<CurrentHandMenu />);

  describe('renders', () => {
    it('a div', () => {
      expect(component.find('div').name()).toBe('div');
    });

    it('a div with an Item', () => {
      expect(component.find('div').childAt(0).name()).toBe('Item');
    });

    it('a div with a MenuItem with an Icon', () => {
      expect(component.find('div').childAt(0).childAt(0).name()).toBe('Icon');
    });
  });
});
