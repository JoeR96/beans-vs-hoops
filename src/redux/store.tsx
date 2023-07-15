import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import votesReducer from './votesSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    votes: votesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
