import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Share, mapStateToProps } from './Share';
import { dummyState } from '../../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('Share', () => {
  it('receives correct props from store', () => {
    const expectedProps = {
      currentTurn: 1,
      shareKnowledgeDisabled: false,
      shareKnowledgePlayers: [],
      currentCity: ''
    };
    expect(Object.keys(mapStateToProps(dummyState)).sort()).toEqual(Object.keys(expectedProps).sort());
  });

  describe('renders a Choose Player Modal', () => {

    const component = shallow(<Share />);

    it('ChoosePlayerModal', () => {
      expect(component.find('ChoosePlayerModal').name()).toBe('ChoosePlayerModal');
    });

    it('that takes in the correct props', () => {
      const expectedProps = {
        ModalTrigger: {},
        disabled: false,
        players: [],
        action: ()=>{}
      };
      expect(Object.keys(component.props()).sort()).toEqual(Object.keys(expectedProps).sort());
    });
  });
});
