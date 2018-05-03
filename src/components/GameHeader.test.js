import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GameHeader, mapStateToProps } from './GameHeader';
import { dummyState, doc } from '../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('GameHeader', () => {
  const component = shallow(<GameHeader />);
  const game = dummyState.firestore.data.games[doc];
  component.setProps({game, playerDeck: ['card1', 'card2', 'card3']});

  it('receives correct props from mapStateToProps', () => {
    const expectedProps = ['game', 'playerDeck'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  const firstContainer = component.first();
  it('renders a Container', () => {
    expect(firstContainer.name()).toBe('Container');
  });

  const secondContainer = firstContainer.first();
  it ('renders a Container within a Container', () => {
    expect(secondContainer.name()).toBe('Container');
  });

  it ('renders the correct number of Images', () => {
    expect(secondContainer.find('Image').length).toEqual(11);
  });

  it ('renders the correct number of divs', () => {
    expect(secondContainer.find('div').length).toEqual(8);
  });
});
