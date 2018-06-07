import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TreatModal, mapStateToProps } from './TreatModal';
Enzyme.configure({ adapter: new Adapter() });
import { dummyState } from '../../utils';

describe('TreatModal', () => {
  it('receives correct props from mapStateToProps', () => {
    const expectedProps = ['currentCity'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  const component = shallow(<TreatModal diseases={[]} />);

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

    describe('a Modal with TreatModalContent', () => {
      const expectedProps = ['diseases', 'setSelected', 'selected'];
      const TreatModalContentWrapper = component.find('Modal').childAt(1);

      it('actually renders TreatModalContent', () => {
        expect(TreatModalContentWrapper.name()).toBe('TreatModalContent');
      });

      it('takes in correct props', () => {
        expect(Object.keys(TreatModalContentWrapper.props())).toEqual(expect.arrayContaining(expectedProps));
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
