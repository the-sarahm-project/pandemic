import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CardButton from './CardButton';
Enzyme.configure({ adapter: new Adapter() });

describe('CardButton', () => {
  const setSelectedAndActive = jest.fn();
  const card = [];
  const active = false;
  const component = shallow(<CardButton card={card} active={active} setSelectedAndActive={setSelectedAndActive} />);

  it('executes setSelectedAndActive when clicked', () => {
    component.find('Button').simulate('click');
    expect(setSelectedAndActive).toHaveBeenCalledWith(card);
  });

  describe('renders', () => {
    it('a Button', () => {
      expect(component.find('Button').name()).toBe('Button');
    });

    it('a Button with an Image', () => {
      expect(component.find('Button').childAt(0).name()).toBe('Image');
    });
  });
});
