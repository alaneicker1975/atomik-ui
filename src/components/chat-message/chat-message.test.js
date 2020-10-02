import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { shallow, configure } from 'enzyme';
import ChatMessage from './ChatMessage';

configure({ adapter: new Adapter() });

describe('<ChatMessage />', () => {
  let chatMessage;

  beforeEach(() => {
    chatMessage = shallow(
      <ChatMessage
        message="Hello!"
        dateTimeStamp="Tuesday, March 10, 2020 3:36 PM"
        isOutgoing
      />,
    );
  });

  it('Should render without errors', () => {
    expect(chatMessage).toBeTruthy();
  });

  it('Should render the timestamp', () => {
    expect(
      chatMessage.find('.atomikui-chat-message__item__timestamp').text(),
    ).toBe('Tuesday, March 10, 2020 3:36 PM');
  });

  it('Should add a modifier class if same origin', () => {
    expect(chatMessage.hasClass('is-outgoing')).toBe(true);
  });
});
