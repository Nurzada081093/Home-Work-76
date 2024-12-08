import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IMessage } from '../../types';

export const getMessages = createAsyncThunk<IMessage[], void>(
  'messages/getMessages',
  async () => {
    const messages = await axiosRequest<IMessage[]>('/messages');
    return messages.data || [];
  }
);