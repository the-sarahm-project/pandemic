import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TreatModalContent from './TreatModalContent';
Enzyme.configure({ adapter: new Adapter() });

describe('TreatModalContent', () => {
  const diseases = ['blue,3', 'black,2'];
  const component = shallow(<TreatModalContent diseases={diseases} />);

  describe('renders', () => {
    describe('Modal Content', () => {
      it('actually renders a Modal Content', () => {
        expect(component.find('ModalContent').name()).toBe('ModalContent');
      });
    });

    describe('a Modal Content with a Button Group', () => {
      const ButtonGroupWrapper = component.find('ModalContent').childAt(0);
      it('actually renders TreatModalContent', () => {
        expect(ButtonGroupWrapper.name()).toBe('ButtonGroup');
      });
    });

    describe('a Modal Content with a Button Group with Disease Buttons', () => {
      const expectedProps = ['active', 'diseaseColor', 'numCubes', 'setSelected'];
      const ButtonGroupWrapper = component.find('ButtonGroup');
      const DiseaseButtonWrapper = ButtonGroupWrapper.childAt(0);
      it('renders Disease Buttons', () => {
        expect(DiseaseButtonWrapper.name()).toBe('DiseaseButton');
      });

      it('renders the correct number of Disease Buttons', () => {
        expect(ButtonGroupWrapper.children().length).toBe(2);
      });

      it('renders Disease buttons that take in correct props', () => {
        expect(Object.keys(DiseaseButtonWrapper.props())).toEqual(expect.arrayContaining(expectedProps));
      });
    });
  });
});
