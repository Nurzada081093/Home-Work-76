import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../types';
import { getLastMessages, getMessages, postMessage } from '../Thunks/messagesThunks.ts';
import { RootState } from '../../app/store.ts';

interface IInitialState {
  messages: IMessage[];
  loaders: {
    getLoader: boolean;
    postLoader: boolean;
  },
  error: boolean;
}

const initialState: IInitialState = {
  messages: [],
  loaders: {
    getLoader: false,
    postLoader: false,
  },
  error: false,
};

export const messagesFromSlice = (state: RootState) => state.messages.messages;
export const getLoaderFromSlice = (state: RootState) => state.messages.loaders.getLoader;
export const postLoaderFromSlice = (state: RootState) => state.messages.loaders.postLoader;

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loaders.getLoader = true;
        state.error = false;
      })
      .addCase(getMessages.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
        state.loaders.getLoader = false;
        state.error = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state) => {
        state.loaders.getLoader = false;
        state.error = true;
      })
      .addCase(postMessage.pending, (state) => {
        state.loaders.postLoader = true;
        state.error = false;
      })
      .addCase(postMessage.fulfilled, (state) => {
        state.loaders.postLoader = false;
        state.error = false;
      })
      .addCase(postMessage.rejected, (state) => {
        state.loaders.postLoader = false;
        state.error = true;
      })
      .addCase(getLastMessages.pending, (state) => {
        state.error = false;
      })
      .addCase(getLastMessages.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
        state.error = false;

        const newMessages = action.payload.filter((newMessage) =>
          !state.messages.some((oldMessage) => oldMessage.id === newMessage.id)
        );

        state.messages = [...state.messages, ...newMessages];
      })
      .addCase(getLastMessages.rejected, (state) => {
        state.error = true;
      });
  }
});

export const messagesReducers = messagesSlice.reducer;