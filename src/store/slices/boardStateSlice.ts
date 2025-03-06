// @ts-nocheck

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setData, fetchData, setData } from "../../server/FirebaseAPI";

//PH
const kanbanBoardId = "-OKWxSend40bnWodRWaf";

export const fetchInitialState = createAsyncThunk(
  "boardState/fetchInitialState",
  async () => {
    const result = await fetchData(kanbanBoardId);
    return result;
  }
);

const boardStateSlice = createSlice({
  name: "boardState",
  initialState: { loading: true, error: null, data: null },
  reducers: {
    addNewTask: (state, action) => {
      const { data } = state;
      const pendingStage = data.find((stage) => stage.id === "firstStage");
      if (!pendingStage) return;
      const pendingStageIndex = data.indexOf(pendingStage);

      if (
        !Object.keys(data[pendingStageIndex]).some((key) => key === "tasksList")
      )
        data[pendingStageIndex].tasksList = [];

      data[pendingStageIndex].tasksList.push(action.payload);
      const { tasksList } = data[pendingStageIndex];
      setData(tasksList, kanbanBoardId, `${pendingStageIndex}/tasksList`);
    },
    updateTask: (state, action) => {
      const { taskId, stageId, task } = action.payload;
      const { data } = state;
      const stageIndex = findStageIndex(data, stageId);
      const taskIndex = findTaskIndex(data, taskId, stageId);
      data[stageIndex]["tasksList"][taskIndex] = task;
      setData(task, kanbanBoardId, `${stageIndex}/tasksList/${taskIndex}`);
    },
    removeTask: (state, action) => {
      const { taskId, stageId } = action.payload;
      const { data } = state;
      const stageIndex = findStageIndex(data, stageId);
      const taskIndex = findTaskIndex(data, taskId, stageId);
      data[stageIndex]["tasksList"].splice(taskIndex, 1);

      setData(
        data[stageIndex]["tasksList"],
        kanbanBoardId,
        `${stageIndex}/tasksList`
      );
    },
    moveTask: (state, action) => {
      const { taskId, currentStageId, newStageId, closestEleIndex } =
        action.payload;
      const { data } = state;
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

      setData(
        tasksFromCurrentStage,
        kanbanBoardId,
        `${currentStageIndex}/tasksList`
      );
      setData(tasksFromNewStage, kanbanBoardId, `${newStageIndex}/tasksList`);
    },
    addNewStage: (state, action) => {
      const { data } = state;
      data.splice(data.length - 1, 0, action.payload);
      setData(data, kanbanBoardId);
    },
    updateStage: (state, action) => {
      const { stageId, newStage } = action.payload;
      const { data } = state;
      const stageIndex = findStageIndex(data, stageId);
      data[stageIndex] = newStage;

      setData(data[stageIndex], kanbanBoardId, stageIndex);
    },
    removeStage: (state, action) => {
      const { stageId } = action.payload;
      const { data } = state;
      const stageIndex = findStageIndex(data, stageId);
      data.splice(stageIndex, 1);
      setData(data, kanbanBoardId);
    },
    moveStage: (state, action) => {
      const { stageId, closestStageIndex } = action.payload;
      const { data } = state;
      const stageIndex = findStageIndex(data, stageId);
      const dataCopy = JSON.parse(JSON.stringify(data));
      data.splice(stageIndex, 1);
      data.splice(closestStageIndex, 0, dataCopy[stageIndex]);

      setData(data, kanbanBoardId);
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
      });
  },
});

export const {
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
