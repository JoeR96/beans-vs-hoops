// src/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: {
      palette: {
        primary: {
          main: '#1976d2', // change this to your desired color
        },
        secondary: {
          main: '#dc004e', // change this to your desired color
        },
      },
    },
  },
  reducers: {
    // Add any theme related reducers here
  },
});

export const { } = themeSlice.actions;
export default themeSlice.reducer;
