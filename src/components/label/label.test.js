import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Label from './Label';

configure({ adapter: new Adapter() });

describe('<Label />', () => {
  let label;

  beforeEach(() => {
    label = shallow(
      <Label className="atomikui-label--custon-class">This is a label</Label>,
    );
  });

  it('Should render text', () => {
    expect(label.text()).toBe('This is a label');
  });

  it('Should render with a custom class', () => {
    expect(label.hasClass('atomikui-label--custon-class')).toBeTruthy();
  });
});
