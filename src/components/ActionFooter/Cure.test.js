import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Cure, mapStateToProps } from './Cure';
import { dummyState } from '../../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('Cure', () => {
  it('receives correct props from mapStateToProps', () => {
    const expectedProps = ['currentTurn', 'CureDisabled', 'currentCity', 'unusedCityCards', 'sameColorCityCards'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  describe('renders a Choose Card Modal', () => {

    const component = shallow(<Cure />);

    it('ChooseCardModal', () => {
      expect(component.find('ChooseCardModal').name()).toBe('ChooseCardModal');
    });

    it('that takes in the correct props', () => {
      const expectedProps = ['ModalTrigger', 'disabled', 'cards', 'action'];
      expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedProps));
    });
  });
});
