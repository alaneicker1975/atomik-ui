import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';
import List from './List';

configure({ adapter: new Adapter() });

describe('<List />', () => {
  let list;

  beforeEach(() => {
    list = shallow(
      <List>
        <List.Item>Apple</List.Item>
        <List.Item>Orange</List.Item>
        <List.Item>Banana</List.Item>
        <List.Item>Mango</List.Item>
      </List>,
    );
  });

  it('Should render children', () => {
    expect(list.find('ul').children()).toHaveLength(4);
  });

  it('Should render an <ol /> if type is "ordered"', () => {
    list.setProps({ type: 'ordered' });

    expect(list.find('ol')).toBeTruthy();
  });

  test.each(['bulleted', 'ordered', 'horizontal'])(
    'Should apply .atomikui-list--%p modifier class',
    (modifier) => {
      list.setProps({ type: modifier });

      expect(
        list
          .find('[data-test-id="list"]')
          .hasClass(`atomikui-list--${modifier}`),
      ).toBeTruthy();
    },
  );

  test.each(['center', 'right'])(
    'Should apply .atomikui-list--%p modifier class',
    (modifier) => {
      list.setProps({ align: modifier });

      expect(
        list
          .find('[data-test-id="list"]')
          .hasClass(`atomikui-list--align-${modifier}`),
      ).toBeTruthy();
    },
  );

  it('Should render inside of a <nav /> element if type id menu', () => {
    list.setProps({ type: 'menu' });

    expect(list.find('nav')).toBeTruthy();
  });
});
