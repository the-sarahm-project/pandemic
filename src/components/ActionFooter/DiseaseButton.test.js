import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DiseaseButton from './DiseaseButton';
Enzyme.configure({ adapter: new Adapter() });

describe('DiseaseButton', () => {
  const setSelected = jest.fn();
  const component = shallow(<DiseaseButton setSelected={setSelected} />);

  it('executes setSelected when clicked', () => {
    component.find('Button').simulate('click', {currentTarget: {value: 'blue,3'}});
    expect(setSelected).toHaveBeenCalledWith('blue,3');
  });

  describe('renders', () => {
    it('a Button', () => {
      expect(component.find('Button').name()).toBe('Button');
    });

    it('a Button with a div', () => {
      expect(component.find('Button').childAt(0).name()).toBe('div');
    });

    it('a Button with a div with an Image', () => {
      expect(component.find('Button').childAt(0).childAt(0).name()).toBe('Image');
    });

    it('a Button with a div with a div', () => {
      expect(component.find('Button').childAt(0).childAt(1).name()).toBe('div');
    });
  });
});
