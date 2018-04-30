import React from 'react';
import { Build } from './index';
import { mapStateToProps } from './mapStateToProps';
import enzyme from 'enzyme';
import { connect } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

describe("FirstVendor", () => {
  let props;
  let store;
  beforeEach(() => {
    props = {
      currentTurn: {responses: []},
      firestore: [],
      buildDisabeld: undefined,
      currentCity: 0,
      unusedCityCards: undefined,
      sameColorCityCards: undefined
    };
  });

  describe('state', () => {
    it('receives correct props from store', () => {
      const expectedProps = props;
      const ConnectedComponent = connect(mapStateToProps)(Build);
      const component = shallowWithStore(<ConnectedComponent />, store);
      expect(Object.keys(component.props()).sort()).toEqual(Object.keys(expectedProps).sort());
    });
  });

  describe('dispatch', () => {
    it('dispatches the correct actions', () => {
      const ConnectedComponent = connect(null, mapDispatch)(FirstVendor);
      const component = shallowWithStore(<ConnectedComponent />, store);
      component.props().setCurrentPrompt();
      expect(store.isActionDispatched(getPrompt())).toBe(true);
    });
  });

  describe('renders an A-frame react component', () => {
    let mockState;
    beforeEach(() => {
      mockState = () => {
        return {
          prompts: true,
          currentPrompt: {responses: []},
          vendorResponse: '',
          language: {
            nativeLang: 'en',
            learningLang: 'en',
            learningLangCode: 'en-US'
          },
          listen: ()=>{}
        };
      };
    });

    it('that is an Entity', () => {
      const ConnectedComponent = connect(mockState, mapDispatch)(FirstVendor);
      const component = shallowWithStore(<ConnectedComponent />, store);
      const entities = component.dive().dive().first();
      expect(entities.type().name).toBe('Entity');
    });

    it('that contains everything else that gets rendered', () => {
      const ConnectedComponent = connect(mockState, mapDispatch)(FirstVendor);
      const component = shallowWithStore(<ConnectedComponent />, store);
      const entities = component.dive().dive().find(Entity);
      const wrappingEntity = entities.first();
      expect(wrappingEntity.children().length).toEqual(component.dive().dive().children().length);
    });
  });
});
