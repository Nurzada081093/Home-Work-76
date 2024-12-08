import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IMessage, INewMessage } from '../../types';

export const getMessages = createAsyncThunk<IMessage[], void>(
  'messages/getMessages',
  async () => {
    const messages = await axiosRequest<IMessage[]>('/messages');
    return messages.data || [];
  }
);

export const postMessage = createAsyncThunk<void, INewMessage>(
  'messages/postMessage',
  async (message) => {
    await axiosRequest.post('/messages', {...message});
  }
);

export const getLastMessages = createAsyncThunk<IMessage[], string>(
  'messages/getLastMessages',
  async (lastMessageDateTime) => {
    const response = await axiosRequest<IMessage[]>(`/messages?datetime=${lastMessageDateTime}`);
    const data = response.data;

    if (data.length === 0) {
      return [];
    }

    return data;
  }
);
