import Container from '@mui/material/Container';
import { GlobalStyles } from '@mui/material';
import FormElement from '../../Components/FormElement/FormElement.tsx';

const Chat = () => {

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
        <div>
          <FormElement addNewMessage={addNewMessage} />
        </div>
      </Container>
    </>
  );
};

export default Chat;
