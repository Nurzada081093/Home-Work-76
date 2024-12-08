import Container from '@mui/material/Container';
import { GlobalStyles } from '@mui/material';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { lastMessagesFromSlice, messagesFromSlice } from '../../store/Slices/messagesSlices.ts';
import { useEffect, useState } from 'react';
import { getLastMessages, getMessages } from '../../store/Thunks/messagesThunks.ts';
import Messages from '../../Components/Messages/Messages.tsx';

const Chat = () => {
  const messages = useAppSelector(messagesFromSlice);
  const lastMessages = useAppSelector(lastMessagesFromSlice);
  const dispatch = useAppDispatch();
  const [lastDateTime, setLastDateTime] = useState<string>('');

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastDate = messages[messages.length - 1].datetime;
      setLastDateTime(lastDate);
    }
  }, [messages]);

  useEffect(() => {
    if (lastDateTime) {
      const interval = setInterval(() => {
        dispatch(getLastMessages(lastDateTime));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [lastDateTime, dispatch]);

  useEffect(() => {
    if (lastMessages.length > 0) {
      const lastDate = lastMessages[lastMessages.length - 1].datetime;
      setLastDateTime(lastDate);
    }
  }, [lastMessages]);

  const reversedMessages = [...messages].reverse();

  console.log(lastDateTime);
  return (
    <>
      <GlobalStyles
        styles={{
          body: {
            background:
              'url("https://bogatyr.club/uploads/posts/2023-03/thumbs/1679357524_bogatyr-club-p-oboi-na-rabochii-stol-temno-zelenie-foni-i-1.jpg") no-repeat center center fixed',
            backgroundSize: "cover",
          },
        }}
      />
      <Container maxWidth="sm" sx={{ mt: 2 }}>
        <FormElement/>
        <Messages messages={reversedMessages}/>
      </Container>
    </>
  );
};

export default Chat;
