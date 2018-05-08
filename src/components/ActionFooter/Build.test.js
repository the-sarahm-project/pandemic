import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Build from './Build';
Enzyme.configure({ adapter: new Adapter() });

describe('Build', () => {

  const component = shallow(<Build />);

  it('renders a Button', () => {
    expect(component.find('Button').name()).toBe('Button');
  });
});
