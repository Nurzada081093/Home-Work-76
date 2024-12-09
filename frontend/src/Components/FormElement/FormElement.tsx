import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Stack from '@mui/joy/Stack';
import { Box } from '@mui/joy';
import * as React from 'react';
import { useState } from 'react';
import { INewMessage } from '../../types';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { postMessage } from '../../store/Thunks/messagesThunks.ts';
import { postLoaderFromSlice } from '../../store/Slices/messagesSlices.ts';
import { CircularProgress } from '@mui/material';

const initialMessage = {
  message: '',
  author: '',
};

const FormElement = () => {
  const [newMessage, setNewMessage] = useState<INewMessage>(initialMessage);
  const loaderPost = useAppSelector(postLoaderFromSlice);
  const dispatch = useAppDispatch();

  const getNewMessage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewMessage((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const createNewMessage = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      newMessage.author.trim().length === 0 &&
      newMessage.message.trim().length === 0
    ) {
      toast.error('Fill in all the fields!');
    } else {
      dispatch(postMessage(newMessage));
      setNewMessage(initialMessage);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 10,
        p: "19px",
        backgroundColor: "rgba(157,165,163,0.68)",
      }}
    >
      <form onSubmit={createNewMessage}>
        <Stack spacing={1}>
          <Input
            type="text"
            value={newMessage.author}
            id="author"
            name="author"
            onChange={getNewMessage}
            placeholder="Enter your name..."
          />
          <Textarea
            value={newMessage.message}
            id="message"
            name="message"
            onChange={getNewMessage}
            placeholder="Enter your message..."
            minRows={3}
          />
          <Button type="submit" disabled={loaderPost}>
            Send
            {loaderPost ? <CircularProgress size="30px" sx={{marginLeft: '20px'}}/> : null}
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default FormElement;
