import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Build, mapStateToProps} from './Build';
import { dummyState } from '../../utils';
Enzyme.configure({ adapter: new Adapter() });

describe('Build', () => {
  const component = shallow(<Build />);
  it('receives correct props from mapStateToProps', () => {
    const expectedProps = ['currentCityId', 'buildButtonDisabled', 'currentTurn'];
    expect(Object.keys(mapStateToProps(dummyState))).toEqual(expect.arrayContaining(expectedProps));
  });

  it('renders a Button', () => {
    expect(component.find('Button').name()).toBe('Button');
  });
});
