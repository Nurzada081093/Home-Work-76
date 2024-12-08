import { IMessage } from '../../types';
import React from 'react';
import Message from './Message/Message.tsx';

interface IMessagesProps {
  messages: IMessage[];
}

const Messages:React.FC<IMessagesProps> = ({messages}) => {
  return (
    <>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </>
  );
};

export default Messages;