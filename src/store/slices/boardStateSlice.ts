// @ts-nocheck

import { createSlice } from "@reduxjs/toolkit";

function findStageIndex(state, stageId) {
  let stageIndex;
  state.forEach((stage) =>
    stage.id === stageId ? (stageIndex = state.indexOf(stage)) : null
  );

  console.log(stageIndex);
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

const boardStateSlice = createSlice({
  name: "boardState",
  initialState: [
    { title: "Queue", id: "first", tasksList: [] },
    { title: "Done", id: "last", tasksList: [] },
    {
      title: "Shopping",
      id: 2,
      tasksList: [
        {
          title: "Go shopping",
          id: 1,
          description: "You should pick some grocery at your nearest location.",
          attachments: [
            "https://www.biedronka.pl/pl?gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7olAg3_W6NQuZf3IK-H8p9rU9kqCOFKbyQJfLgBjPWSzXDuu1d_rcsaAoxkEALw_wcB",
            "https://zakupy.auchan.pl/?utm_source=google&utm_medium=cpc&utm_campaign=GRM+%7C+Auchan+Ecom+%7C+Pure+Brand+%7C+C%26C+%7C+RSA&utm_id=21885820469&gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7oNquECjyI9L7k3HlPNw1wDs2VNo_8bL8C9yNobLRl7AoU_BhiHviAaAmZQEALw_wcB",
          ],
          taskType: "common",
          deadline: "11/20/2024",
          priority: "high",
          assignedPerson: "Paweł",
        },
        {
          title: "Plan a Weekend Getaway",
          id: 2,
          description:
            "Research and plan a short trip to a nearby destination for relaxation.",
          attachments: [
            "https://www.lonelyplanet.com/",
            "https://www.tripadvisor.com/",
          ],
          taskType: "leisure",
          deadline: "11/25/2024",
          priority: "medium",
          assignedPerson: "Anna",
        },
        {
          title: "Team Presentation Preparation",
          id: 3,
          description:
            "Prepare slides and rehearse for the upcoming quarterly review meeting.",
          attachments: [
            "https://docs.google.com/presentation",
            "https://www.canva.com/",
          ],
          taskType: "work",
          deadline: "11/30/2024",
          priority: "critical",
          assignedPerson: "John",
        },
      ],
    },
    {
      title: "Cooking",
      id: 3,
      tasksList: [
        {
          title: "Prepare a meal",
          id: 1,
          description: "Take cabbage, take some meat. Combine.",
          attachments: [
            "https://www.biedronka.pl/pl?gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7olAg3_W6NQuZf3IK-H8p9rU9kqCOFKbyQJfLgBjPWSzXDuu1d_rcsaAoxkEALw_wcB",
            "https://zakupy.auchan.pl/?utm_source=google&utm_medium=cpc&utm_campaign=GRM+%7C+Auchan+Ecom+%7C+Pure+Brand+%7C+C%26C+%7C+RSA&utm_id=21885820469&gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7oNquECjyI9L7k3HlPNw1wDs2VNo_8bL8C9yNobLRl7AoU_BhiHviAaAmZQEALw_wcB",
          ],
          taskType: "common",
          deadline: "11/20/2024",
          priority: "high",
          assignedPerson: "Paweł",
        },
        {
          title: "Fix the Leaky Faucet",
          id: 2,
          description:
            "Identify the cause of the leak and replace any necessary parts to stop the dripping.",
          attachments: ["https://www.homedepot.com/", "https://www.lowes.com/"],
          taskType: "maintenance",
          deadline: "11/22/2024",
          priority: "high",
          assignedPerson: "Mike",
        },
        {
          title: "Write a Blog Post on Sustainability",
          id: 3,
          description:
            "Draft and publish a blog post about the benefits of adopting sustainable practices in daily life.",
          attachments: ["https://www.greenpeace.org/", "https://www.nrdc.org/"],
          taskType: "creative",
          deadline: "12/01/2024",
          priority: "medium",
          assignedPerson: "Sophia",
        },
        {
          title: "Organize Office Holiday Party",
          id: 4,
          description:
            "Coordinate decorations, catering, and activities for the office holiday celebration.",
          attachments: [
            "https://www.partycity.com/",
            "https://www.eventbrite.com/",
          ],
          taskType: "event",
          deadline: "12/15/2024",
          priority: "low",
          assignedPerson: "Emily",
        },
      ],
    },
  ],
  reducers: {
    addNewTask: (state, action) => {
      state.forEach((stage) => {
        return stage.id === "first"
          ? stage.tasksList.push(action.payload)
          : null;
      });
    },
    updateTask: (state, action) => {
      const { taskId, stageId, task } = action.payload;
      const stageIndex = findStageIndex(state, stageId);
      const taskIndex = findTaskIndex(state, taskId, stageId);
      state[stageIndex]["tasksList"][taskIndex] = task;
    },
    removeTask: (state, action) => {
      const { taskId, stageId } = action.payload;
      const stageIndex = findStageIndex(state, stageId);
      const taskIndex = findTaskIndex(state, taskId, stageId);
      state[stageIndex]["tasksList"].splice(taskIndex, 1);
    },
    addNewStage: (state, action) => {
      const newState = [...state, action.payload];
      return (state = newState);
    },
    updateStage: (state, action) => {
      const { stageId, newStage } = action.payload;
      const stageIndex = findStageIndex(state, stageId);

      state[stageIndex] = newStage;
    },
    removeStage: (state, action) => {
      const { stageId } = action.payload;
      const stageIndex = findStageIndex(state, stageId);

      state.splice(stageIndex, 1);
    },
  },
});

export const {
  addNewTask,
  updateTask,
  removeTask,
  addNewStage,
  updateStage,
  removeStage,
} = boardStateSlice.actions;
export default boardStateSlice.reducer;
