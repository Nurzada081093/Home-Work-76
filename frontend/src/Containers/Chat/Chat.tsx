import Container from '@mui/material/Container';
import { GlobalStyles } from '@mui/material';
import FormElement from '../../Components/FormElement/FormElement.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { messagesFromSlice } from '../../store/Slices/messagesSlices.ts';
import Messages from '../../Components/Messages/Messages.tsx';
import { useEffect } from 'react';
import { getMessages } from '../../store/Thunks/messagesThunks.ts';


const Chat = () => {
  const messages = useAppSelector(messagesFromSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  console.log(messages);


  const addNewMessage = () => {
    console.log('Создание нового сообщения');
  };

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
        <FormElement addNewMessage={addNewMessage} />
        <Messages messages={messages}/>
      </Container>
    </>
  );
};

export default Chat;
