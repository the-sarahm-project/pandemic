import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Treat from './Treat';
Enzyme.configure({ adapter: new Adapter() });

describe('Treat', () => {

  const component = shallow(<Treat />);

  it('renders a Button', () => {
    expect(component.find('Button').name()).toBe('Button');
  });
});
