import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../types';
import { getLastMessages, getMessages, postMessage } from '../Thunks/messagesThunks.ts';
import { RootState } from '../../app/store.ts';

interface IInitialState {
  messages: IMessage[];
  lastMessages: IMessage[];
  loaders: {
    getLoader: boolean;
    postLoader: boolean;
  },
  error: boolean;
}

const initialState: IInitialState = {
  messages: [],
  lastMessages: [],
  loaders: {
    getLoader: false,
    postLoader: false,
  },
  error: false,
};

export const messagesFromSlice = (state: RootState) => state.messages.messages;
export const lastMessagesFromSlice = (state: RootState) => state.messages.lastMessages;

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
        if (state.messages && action.payload) {
          state.messages = [...state.messages, ...action.payload];
        } else {
          state.messages = action.payload;
        }
      })
      .addCase(getLastMessages.rejected, (state) => {
        state.error = true;
      });
  }
});

export const messagesReducers = messagesSlice.reducer;