import { configureStore } from "@reduxjs/toolkit";
import boardStateReducer from "./slices/boardStateSlice";
import taskStateReducer from "./slices/taskStateSlice";

const store = configureStore({
  reducer: {
    boardState: boardStateReducer,
    taskState: taskStateReducer,
  },
});

export default store;
