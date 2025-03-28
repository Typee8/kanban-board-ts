// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setData, fetchData, setData } from "../../server/FirebaseAPI";
import { isEqual } from "lodash";

export const fetchInitialState = createAsyncThunk(
  "boardState/fetchInitialState",
  async (boardId) => {
    const result = await fetchData(boardId);
    console.log(result);
    return result;
  }
);

export const fetchState = createAsyncThunk(
  "boardState/fetchState",
  async (boardId, { getState }) => {
    const result = await fetchData(boardId);
    const state = getState();
    const stateData = state.boardState.data;

    if (!isEqual(stateData, result)) {
      return result;
    }

    return stateData;
  }
);

const boardStateSlice = createSlice({
  name: "boardState",
  initialState: {
    loading: true,
    error: null,
    boardId: sessionStorage.getItem("boardId"),
    data: null,
  },
  reducers: {
    setBoardId: (state, action) => {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy.boardId = action.payload;
      return (state = stateCopy);
    },
    updateState: (state, action) => {
      state.data = action.payload;
    },
    addNewTask: (state, action) => {
      const { data, boardId } = state;
      const pendingStage = data.find((stage) => stage.id === "firstStage");
      if (!pendingStage) return;
      const pendingStageIndex = data.indexOf(pendingStage);

      if (
        !Object.keys(data[pendingStageIndex]).some((key) => key === "tasksList")
      )
        data[pendingStageIndex].tasksList = [];

      data[pendingStageIndex].tasksList.push(action.payload);
      const { tasksList } = data[pendingStageIndex];
      setData(tasksList, boardId, `${pendingStageIndex}/tasksList`);
    },
    updateTask: (state, action) => {
      const { taskId, stageId, task } = action.payload;
      const { data, boardId } = state;
      const stageIndex = findStageIndex(data, stageId);
      const taskIndex = findTaskIndex(data, taskId, stageId);
      data[stageIndex]["tasksList"][taskIndex] = task;
      setData(task, boardId, `${stageIndex}/tasksList/${taskIndex}`);
    },
    removeTask: (state, action) => {
      const { taskId, stageId } = action.payload;
      const { data, boardId } = state;
      const stageIndex = findStageIndex(data, stageId);
      const taskIndex = findTaskIndex(data, taskId, stageId);
      data[stageIndex]["tasksList"].splice(taskIndex, 1);

      setData(
        data[stageIndex]["tasksList"],
        boardId,
        `${stageIndex}/tasksList`
      );
    },
    moveTask: (state, action) => {
      const { taskId, currentStageId, newStageId, closestEleIndex } =
        action.payload;
      const { data, boardId } = state;
      const currentStageIndex = findStageIndex(data, currentStageId);
      const taskIndex = findTaskIndex(data, taskId, currentStageId);

      const task = data[currentStageIndex]["tasksList"][taskIndex];
      const newStageIndex = findStageIndex(data, newStageId);

      if (!data[currentStageIndex]["tasksList"])
        data[currentStageIndex]["tasksList"] = [];
      data[currentStageIndex]["tasksList"].splice(taskIndex, 1);

      if (!data[newStageIndex]["tasksList"])
        data[newStageIndex]["tasksList"] = [];
      data[newStageIndex]["tasksList"].splice(closestEleIndex, 0, task);

      const { tasksList: tasksFromCurrentStage } = data[currentStageIndex];
      const { tasksList: tasksFromNewStage } = data[newStageIndex];

      setData(tasksFromCurrentStage, boardId, `${currentStageIndex}/tasksList`);
      setData(tasksFromNewStage, boardId, `${newStageIndex}/tasksList`);
    },
    addNewStage: (state, action) => {
      const { data, boardId } = state;
      data.splice(data.length - 1, 0, action.payload);
      setData(data, boardId);
    },
    updateStage: (state, action) => {
      const { stageId, newStage } = action.payload;
      const { data, boardId } = state;
      const stageIndex = findStageIndex(data, stageId);
      data[stageIndex] = newStage;

      setData(data[stageIndex], boardId, stageIndex);
    },
    removeStage: (state, action) => {
      const { stageId } = action.payload;
      const { data, boardId } = state;
      const stageIndex = findStageIndex(data, stageId);
      data.splice(stageIndex, 1);
      setData(data, boardId);
    },
    moveStage: (state, action) => {
      const { stageId, closestStageIndex } = action.payload;
      const { data, boardId } = state;
      const stageIndex = findStageIndex(data, stageId);
      const dataCopy = JSON.parse(JSON.stringify(data));
      data.splice(stageIndex, 1);
      data.splice(closestStageIndex, 0, dataCopy[stageIndex]);

      setData(data, boardId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialState.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInitialState.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInitialState.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchState.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const {
  setBoardId,
  updateState,
  addNewTask,
  updateTask,
  removeTask,
  moveTask,
  addNewStage,
  updateStage,
  removeStage,
  moveStage,
} = boardStateSlice.actions;
export default boardStateSlice.reducer;

function findStageIndex(state, stageId) {
  let stageIndex;
  state.forEach((stage) =>
    stage.id === stageId ? (stageIndex = state.indexOf(stage)) : null
  );

  return stageIndex;
}

function findTaskIndex(state, taskId, stageId) {
  const stageIndex = findStageIndex(state, stageId);
  let taskIndex;
  const { tasksList } = state[stageIndex];
  tasksList.forEach((task) =>
    task.id === taskId ? (taskIndex = tasksList.indexOf(task)) : null
  );
  return taskIndex;
}
