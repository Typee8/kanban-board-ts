import { configureStore } from "@reduxjs/toolkit";
import boardStateReducer from "./slices/boardStateSlice";

const store = configureStore({
  reducer: {
    boardState: boardStateReducer,
  },
});

export default store;
