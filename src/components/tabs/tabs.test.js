/* eslint-disable no-undef */
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Tabs from './Tabs';

configure({ adapter: new Adapter() });

describe('<Component />', () => {
  beforeEach(() => {});

  it('Should render without errors', () => {});
});