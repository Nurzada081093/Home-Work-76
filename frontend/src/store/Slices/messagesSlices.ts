import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../types';
import { getMessages } from '../Thunks/messagesThunks.ts';
import { RootState } from '../../app/store.ts';

interface IInitialState {
  messages: IMessage[];
  loaders: {
    getLoaders: boolean;
    createLoaders: boolean;
  },
  error: boolean;
}

const initialState: IInitialState = {
  messages: [],
  loaders: {
    getLoaders: false,
    createLoaders: false,
  },
  error: false,
};

export const messagesFromSlice = (state: RootState) => state.messages.messages;

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.loaders.getLoaders = true;
        state.error = false;
      })
      .addCase(getMessages.fulfilled, (state, action: PayloadAction<IMessage[]>) => {
        state.loaders.getLoaders = false;
        state.error = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state) => {
        state.loaders.getLoaders = false;
        state.error = true;
      });
  }
});

export const messagesReducers = messagesSlice.reducer;