import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import votesReducer from "./votesSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      theme: themeReducer,
      votes: votesReducer,
    },
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
