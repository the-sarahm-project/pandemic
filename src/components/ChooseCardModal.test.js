import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChooseCardModal from './ChooseCardModal';
Enzyme.configure({ adapter: new Adapter() });

describe('ChoosesCardModal', () => {

  const component = shallow(<ChooseCardModal />);

  describe('renders', () => {

    describe('a Modal', () => {
      const expectedProps = ['trigger', 'open'];
      it('actually renders a Modal', () => {
        expect(component.find('Modal').name()).toBe('Modal');
      });

      it('that takes in correct props', () => {
        expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedProps));
      });
    });

    it('a Modal with a Header child', () => {
      expect(component.find('Modal').childAt(0).name()).toBe('Header');
    });

    describe('a Modal with ModalCardContent', () => {
      const expectedProps = ['cards', 'active', 'setSelectedAndActive'];
      const ModalCardContentWrapper = component.find('Modal').childAt(1);

      it('actually renders ModalCardContent', () => {
        expect(ModalCardContentWrapper.name()).toBe('ModalCardContent');
      });

      it('that takes in correct props', () => {
        expect(Object.keys(ModalCardContentWrapper.props())).toEqual(expect.arrayContaining(expectedProps));
      });
    });

    describe('a Modal with ModalActions', () => {
      const expectedProps = ['action', 'handleClose', 'selected'];
      const ModalActionsWrapper = component.find('Modal').childAt(2);

      it('actually renders ModalActions', () => {
        expect(ModalActionsWrapper.name()).toBe('ModalActions');
      });

      it('that takes in correct props', () => {
        expect(Object.keys(ModalActionsWrapper.props())).toEqual(expect.arrayContaining(expectedProps));
      });
    });
  });
});
