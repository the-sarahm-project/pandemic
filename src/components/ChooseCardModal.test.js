import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { GameHeader, PlayerHand, PlayerMarkers, CityMarkers } from './index';
import ChooseCardModal from './ChooseCardModal';
Enzyme.configure({ adapter: new Adapter() });

describe('ChoosesCardModal', () => {

  const component = shallow(<ChooseCardModal />);

  it('renders Modal', () => {
    expect(component.find('Modal').name()).toBe('Modal');
  });

  // it('renders GameHeader', () => {
  //   expect(component.find(GameHeader)).toHaveLength(1);
  // });

  // it('renders PlayerHand', () => {
  //   expect(component.find(PlayerHand)).toHaveLength(1);
  // });

  // it('renders TileLayer', () => {
  //   expect(component.find('TileLayer').name()).toBe('TileLayer');
  // });

  // it('renders PlayerMarkers', () => {
  //   expect(component.find(PlayerMarkers)).toHaveLength(1);
  // });

  // it('renders CityMarkers', () => {
  //   expect(component.find(CityMarkers)).toHaveLength(1);
  // });

  // it('renders CityLines', () => {
  //   expect(component.find('CityLines').name()).toBe('CityLines');
  // });
});
