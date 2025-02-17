import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: {
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    
  },
});

export default themeSlice.reducer;
