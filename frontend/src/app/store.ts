import { configureStore } from '@reduxjs/toolkit';
import { messagesReducers } from '../store/Slices/messagesSlices.ts';

export const store = configureStore({
  reducer: {
    messages: messagesReducers,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;