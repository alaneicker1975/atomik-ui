import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Avatar from './Avatar';

configure({ adapter: new Adapter() });

describe('<Avatar />', () => {
  it('Should render without errors', () => {
    const avatar = shallow(
      <Avatar src="/profile-image.png" alt="Alan Smith" />,
    );

    expect(avatar).toBeTruthy();
  });

  it('Should render a label', () => {
    const avatar = shallow(
      <Avatar src="/profile-image.png" alt="Alan Smith" label="Avatar Label" />,
    );

    const label = avatar.find('.atomikui-avatar__label');

    expect(label).toBeTruthy();
  });

  it('Should render children', () => {
    const avatar = shallow(
      <Avatar>
        <svg />
      </Avatar>,
    );
    expect(avatar.children()).toBeTruthy();
  });
});
