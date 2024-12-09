import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { IMessage } from '../../../types';
import React from 'react';
import dayjs from 'dayjs';

interface IMessageProps {
  message: IMessage;
}

const Message:React.FC<IMessageProps> = ({message}) => {

  const formatDate = (dateString: string) => {
    const today = dayjs();
    const messageDate = dayjs(dateString);

    if (messageDate.isSame(today, 'day')) {
      return 'Сегодня';
    } else if (messageDate.isSame(today.subtract(1, 'day'), 'day')) {
      return 'Вчера';
    } else if (messageDate.isSame(today, 'year')) {
      return messageDate.format('DD MMMM');
    } else {
      return messageDate.format('DD MMMM YYYY');
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 600,
        mt: "20px",
        mb: "20px",
        backgroundColor: "whitesmoke",
      }}
    >
      <CardActionArea>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "rgba(197,202,233,0.84)",
            p: "15px 20px 10px 20px",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: 18 }}
          >
            {formatDate(message.datetime)}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: 18 }}
          >
            {dayjs(message.datetime).format('HH:mm:ss')}
          </Typography>
        </CardActions>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: 22 }}
          >
            {message.author}
            <img
              style={{ marginLeft: "10px" }}
              width="30"
              height="30"
              src="https://img.icons8.com/office/30/user.png"
              alt="user"
            />
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", wordBreak: "break-word" }}
          >
            {message.message}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Message;