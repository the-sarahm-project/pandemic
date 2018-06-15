import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DiseaseCube from './DiseaseCube';
Enzyme.configure({ adapter: new Adapter() });

describe('DiseaseCube', () => {
  const component = shallow(<DiseaseCube coords={[1,1]} cube={['red', 3]} />);
  describe('renders', () => {
    it('a Marker', () => {
      expect(component.length).toBe(1);
      expect(component.find('Marker').name()).toBe('Marker');
    });
  });
});
