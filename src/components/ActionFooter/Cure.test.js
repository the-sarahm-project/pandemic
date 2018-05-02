import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Cure from './Cure';
Enzyme.configure({ adapter: new Adapter() });

describe('Cure', () => {

  const component = shallow(<Cure />);

  it('renders a Button', () => {
    expect(component.find('Button').name()).toBe('Button');
  });
});
