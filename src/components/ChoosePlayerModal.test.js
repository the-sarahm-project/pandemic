import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChoosePlayerModal from './ChoosePlayerModal';
Enzyme.configure({ adapter: new Adapter() });

describe('ChoosesCardModal', () => {

  const component = shallow(<ChoosePlayerModal />);

  describe('has correct initialState', () => {
    const expectedState = {
      selected: '',
      modalOpen: false
    };

    it('initialState', () => {
      expect(component.state()).toEqual(expectedState);
    });
  });

  describe('renders', () => {
    describe('a Modal', () => {
      const expectedProps = ['trigger', 'open'];
      it('actually renders a Modal', () => {
        expect(component.find('Modal').name()).toBe('Modal');
      });

      it('takes in correct props', () => {
        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedProps));
      });
    });

    it('a Modal with a Header child', () => {
      expect(component.find('Modal').childAt(0).name()).toBe('Header');
    });

    describe('a Modal with ModalPlayerContent', () => {
      const expectedProps = ['players', 'playerImage', 'setSelected', 'selected'];
      const ModalPlayerContentWrapper = component.find('Modal').childAt(1);

      it('actually renders ModalPlayerContent', () => {
        expect(ModalPlayerContentWrapper.name()).toBe('ModalPlayerContent');
      });

      it('takes in correct props', () => {
        expect(Object.keys(ModalPlayerContentWrapper.props())).toEqual(expect.arrayContaining(expectedProps));
      });
    });

    describe('a Modal with ModalActions', () => {
      const expectedProps = ['action', 'handleClose', 'selected'];
      const ModalActionsWrapper = component.find('Modal').childAt(2);

      it('actually renders ModalActions', () => {
        expect(ModalActionsWrapper.name()).toBe('ModalActions');
      });

      it('takes in correct props', () => {
        expect(Object.keys(ModalActionsWrapper.props())).toEqual(expect.arrayContaining(expectedProps));
      });
    });
  });
});
