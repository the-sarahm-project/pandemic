import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Share, mapStateToProps } from './Share';
import { dummyState } from '../../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('Share', () => {
  it('receives correct props from store', () => {
    const expectedProps = ['currentTurn', 'shareKnowledgeDisabled', 'shareKnowledgePlayers', 'currentCity'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  describe('renders a Choose Player Modal', () => {

    const component = shallow(<Share />);

    it('ChoosePlayerModal', () => {
      expect(component.find('ChoosePlayerModal').name()).toBe('ChoosePlayerModal');
    });

    it('that takes in the correct props', () => {
      const expectedProps = ['ModalTrigger', 'disabled', 'players', 'action'];
      expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedProps));
    });
  });
});
