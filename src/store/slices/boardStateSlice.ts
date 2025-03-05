// @ts-nocheck

import { createSlice } from "@reduxjs/toolkit";
import { pushData, fetchData } from "../../server/FirebaseAPI";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* const convertFirebaseData = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj; // Return non-objects as is

  // Check if the object is array-like (all keys are numbers)
  const keys = Object.keys(obj);
  console.log(keys);
  const isArrayLike =
    keys.length > 0 && keys.every((key, index) => key == index);
  console.log(isArrayLike);
  if (isArrayLike) {
    return Object.values(obj).map(convertFirebaseData); // Convert object to array and process deeply
  } else {
    return obj;
  }
  // Recursively process each property
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, convertFirebaseData(value)])
  );
};

// 🔹 Convert the Firebase-like data
const convertedData = convertFirebaseData();
setTimeout(() => console.log(convertedData), 2000); */

// if obj

/* // Function to convert Firebase list-like objects to arrays
const parseFirebaseList = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj; // Return non-object values as is

  // Check if the object has purely numeric keys
  const isArrayLike = Object.keys(obj).every((key) => !isNaN(key));

  if (isArrayLike) {
    return Object.values(obj).map(parseFirebaseList); // Convert to an array and recursively parse
  }

  // Recursively process child objects
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, parseFirebaseList(value)])
  );
};

// Convert Firebase object to usable structure
const parsedData = parseFirebaseList(firebaseObject); */

/* pushData([
  { title: "Queue", id: "firstStage", tasksLimit: "10", tasksList: [] },
  {
    title: "Shopping",
    id: "36847c62-8df1-4711-87ee-71107ad1e0ca",
    tasksList: [
      {
        title: "Go shopping",
        id: "b2a88fbd-7209-45a3-934b-ca02da8b885c",
        description: "You should pick some grocery at your nearest location.",
        links: [
          "https://www.biedronka.pl/pl?gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7olAg3_W6NQuZf3IK-H8p9rU9kqCOFKbyQJfLgBjPWSzXDuu1d_rcsaAoxkEALw_wcB",
          "https://zakupy.auchan.pl/?utm_source=google&utm_medium=cpc&utm_campaign=GRM+%7C+Auchan+Ecom+%7C+Pure+Brand+%7C+C%26C+%7C+RSA&utm_id=21885820469&gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7oNquECjyI9L7k3HlPNw1wDs2VNo_8bL8C9yNobLRl7AoU_BhiHviAaAmZQEALw_wcB",
        ],
        deadline: "11/20/2024",
        priority: "high",
        assigneesList: [{ name: "John" }, { name: "Mark" }],
        commentsList: [
          {
            user: "Anna",
            hour: "12:00",
            date: "01/12/2024",
            comment: "Written comment lorem ipsum and so on.",
          },
        ],
        status: "in progress",
      },
      {
        title: "Plan a Weekend Getaway",
        id: "640fb8ee-5c1c-404a-8855-0a0950645ee9",
        description:
          "Research and plan a short trip to a nearby destination for relaxation.",
        links: [
          "https://www.lonelyplanet.com/",
          "https://www.tripadvisor.com/",
        ],
        deadline: "11/25/2024",
        priority: "medium",
        assigneesList: [{ name: "Dorothy" }],
        commentsList: [
          {
            user: "Anna",
            hour: "12:00",
            date: "01/12/2024",
            comment: "Written comment lorem ipsum and so on.",
          },
        ],
        status: "in progress",
      },
      {
        title: "Team Presentation Preparation",
        id: "3167edd4-42eb-4588-949f-93cba7342534",
        description:
          "Prepare slides and rehearse for the upcoming quarterly review meeting.",
        links: [
          "https://docs.google.com/presentation",
          "https://www.canva.com/",
        ],
        deadline: "11/30/2024",
        priority: "critical",
        assigneesList: [{ name: "John" }, { name: "Dorothy" }],
        commentsList: [
          {
            user: "Anna",
            hour: "12:00",
            date: "01/12/2024",
            comment: "Written comment lorem ipsum and so on.",
          },
        ],
        status: "in progress",
      },
    ],
  },
  {
    title: "Cooking",
    id: "b5a4dc00-66f4-4dac-a3a7-7ddd336b55bf",
    tasksList: [
      {
        title: "Prepare a meal",
        id: "95353bb2-53da-4cca-9a22-24a7f39c0809",
        description: "Take cabbage, take some meat. Combine.",
        links: [
          "https://www.biedronka.pl/pl?gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7olAg3_W6NQuZf3IK-H8p9rU9kqCOFKbyQJfLgBjPWSzXDuu1d_rcsaAoxkEALw_wcB",
          "https://zakupy.auchan.pl/?utm_source=google&utm_medium=cpc&utm_campaign=GRM+%7C+Auchan+Ecom+%7C+Pure+Brand+%7C+C%26C+%7C+RSA&utm_id=21885820469&gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7oNquECjyI9L7k3HlPNw1wDs2VNo_8bL8C9yNobLRl7AoU_BhiHviAaAmZQEALw_wcB",
        ],
        deadline: "11/20/2024",
        priority: "high",
        assigneesList: [{ name: "Mark" }],
        commentsList: [
          {
            user: "Anna",
            hour: "12:00",
            date: "01/12/2024",
            comment: "Written comment lorem ipsum and so on.",
          },
        ],
        status: "in progress",
      },
      {
        title: "Fix the Leaky Faucet",
        id: "64a8970f-1498-4140-9f4e-c2d662a8be5d",
        description:
          "Identify the cause of the leak and replace any necessary parts to stop the dripping.",
        links: ["https://www.homedepot.com/", "https://www.lowes.com/"],
        deadline: "11/22/2024",
        priority: "high",
        assigneesList: [{ name: "Judy" }, { name: "Mark" }],
        commentsList: [
          {
            user: "Anna",
            hour: "12:00",
            date: "01/12/2024",
            comment: "Written comment lorem ipsum and so on.",
          },
        ],
        status: "in progress",
      },
      {
        title: "Write a Blog Post on Sustainability",
        id: "f18277fe-3f40-471e-8a4b-3fe0df26570f",
        description:
          "Draft and publish a blog post about the benefits of adopting sustainable practices in daily life.",
        links: ["https://www.greenpeace.org/", "https://www.nrdc.org/"],
        deadline: "12/01/2024",
        priority: "medium",
        assigneesList: [{ name: "Mishelle" }, { name: "Judy" }],
        commentsList: [
          {
            user: "Anna",
            hour: "12:00",
            date: "01/12/2024",
            comment: "Written comment lorem ipsum and so on.",
          },
        ],
        status: "in progress",
      },
      {
        title: "Organize Office Holiday Party",
        id: "e21413ee-22d1-4309-b101-c7a08fd13a00",
        description:
          "Coordinate decorations, catering, and activities for the office holiday celebration.",
        links: ["https://www.partycity.com/", "https://www.eventbrite.com/"],
        deadline: "12/15/2024",
        priority: "low",
        assigneesList: [{ name: "Nicolaus" }, { name: "Mark" }],
        commentsList: [
          {
            user: "Anna",
            hour: "12:00",
            date: "01/12/2024",
            comment: "Written comment lorem ipsum and so on.",
          },
        ],
        status: "in progress",
      },
    ],
  },
  { title: "Done", id: "lastStage", tasksList: [] },
]); */

// Async thunk to fetch initial data
export const fetchInitialState = createAsyncThunk(
  "boardState/fetchInitialState",
  async () => {
    console.log("Fetching!");
    const result = await fetchData();
    return Object.values(result)[0];
  }
);

const boardStateSlice = createSlice({
  name: "boardState",
  initialState: { loading: true, error: null, data: null } /* [
    { title: "Queue", id: "firstStage", tasksLimit: "10", tasksList: [] },
    {
      title: "Shopping",
      id: "36847c62-8df1-4711-87ee-71107ad1e0ca",
      tasksList: [
        {
          title: "Go shopping",
          id: "b2a88fbd-7209-45a3-934b-ca02da8b885c",
          description: "You should pick some grocery at your nearest location.",
          links: [
            "https://www.biedronka.pl/pl?gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7olAg3_W6NQuZf3IK-H8p9rU9kqCOFKbyQJfLgBjPWSzXDuu1d_rcsaAoxkEALw_wcB",
            "https://zakupy.auchan.pl/?utm_source=google&utm_medium=cpc&utm_campaign=GRM+%7C+Auchan+Ecom+%7C+Pure+Brand+%7C+C%26C+%7C+RSA&utm_id=21885820469&gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7oNquECjyI9L7k3HlPNw1wDs2VNo_8bL8C9yNobLRl7AoU_BhiHviAaAmZQEALw_wcB",
          ],
          deadline: "11/20/2024",
          priority: "high",
          assigneesList: [{ name: "John" }, { name: "Mark" }],
          commentsList: [
            {
              user: "Anna",
              hour: "12:00",
              date: "01/12/2024",
              comment: "Written comment lorem ipsum and so on.",
            },
          ],
          status: "in progress",
        },
        {
          title: "Plan a Weekend Getaway",
          id: "640fb8ee-5c1c-404a-8855-0a0950645ee9",
          description:
            "Research and plan a short trip to a nearby destination for relaxation.",
          links: [
            "https://www.lonelyplanet.com/",
            "https://www.tripadvisor.com/",
          ],
          deadline: "11/25/2024",
          priority: "medium",
          assigneesList: [{ name: "Dorothy" }],
          commentsList: [
            {
              user: "Anna",
              hour: "12:00",
              date: "01/12/2024",
              comment: "Written comment lorem ipsum and so on.",
            },
          ],
          status: "in progress",
        },
        {
          title: "Team Presentation Preparation",
          id: "3167edd4-42eb-4588-949f-93cba7342534",
          description:
            "Prepare slides and rehearse for the upcoming quarterly review meeting.",
          links: [
            "https://docs.google.com/presentation",
            "https://www.canva.com/",
          ],
          deadline: "11/30/2024",
          priority: "critical",
          assigneesList: [{ name: "John" }, { name: "Dorothy" }],
          commentsList: [
            {
              user: "Anna",
              hour: "12:00",
              date: "01/12/2024",
              comment: "Written comment lorem ipsum and so on.",
            },
          ],
          status: "in progress",
        },
      ],
    },
    {
      title: "Cooking",
      id: "b5a4dc00-66f4-4dac-a3a7-7ddd336b55bf",
      tasksList: [
        {
          title: "Prepare a meal",
          id: "95353bb2-53da-4cca-9a22-24a7f39c0809",
          description: "Take cabbage, take some meat. Combine.",
          links: [
            "https://www.biedronka.pl/pl?gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7olAg3_W6NQuZf3IK-H8p9rU9kqCOFKbyQJfLgBjPWSzXDuu1d_rcsaAoxkEALw_wcB",
            "https://zakupy.auchan.pl/?utm_source=google&utm_medium=cpc&utm_campaign=GRM+%7C+Auchan+Ecom+%7C+Pure+Brand+%7C+C%26C+%7C+RSA&utm_id=21885820469&gad_source=1&gclid=Cj0KCQiAi_G5BhDXARIsAN5SX7oNquECjyI9L7k3HlPNw1wDs2VNo_8bL8C9yNobLRl7AoU_BhiHviAaAmZQEALw_wcB",
          ],
          deadline: "11/20/2024",
          priority: "high",
          assigneesList: [{ name: "Mark" }],
          commentsList: [
            {
              user: "Anna",
              hour: "12:00",
              date: "01/12/2024",
              comment: "Written comment lorem ipsum and so on.",
            },
          ],
          status: "in progress",
        },
        {
          title: "Fix the Leaky Faucet",
          id: "64a8970f-1498-4140-9f4e-c2d662a8be5d",
          description:
            "Identify the cause of the leak and replace any necessary parts to stop the dripping.",
          links: ["https://www.homedepot.com/", "https://www.lowes.com/"],
          deadline: "11/22/2024",
          priority: "high",
          assigneesList: [{ name: "Judy" }, { name: "Mark" }],
          commentsList: [
            {
              user: "Anna",
              hour: "12:00",
              date: "01/12/2024",
              comment: "Written comment lorem ipsum and so on.",
            },
          ],
          status: "in progress",
        },
        {
          title: "Write a Blog Post on Sustainability",
          id: "f18277fe-3f40-471e-8a4b-3fe0df26570f",
          description:
            "Draft and publish a blog post about the benefits of adopting sustainable practices in daily life.",
          links: ["https://www.greenpeace.org/", "https://www.nrdc.org/"],
          deadline: "12/01/2024",
          priority: "medium",
          assigneesList: [{ name: "Mishelle" }, { name: "Judy" }],
          commentsList: [
            {
              user: "Anna",
              hour: "12:00",
              date: "01/12/2024",
              comment: "Written comment lorem ipsum and so on.",
            },
          ],
          status: "in progress",
        },
        {
          title: "Organize Office Holiday Party",
          id: "e21413ee-22d1-4309-b101-c7a08fd13a00",
          description:
            "Coordinate decorations, catering, and activities for the office holiday celebration.",
          links: ["https://www.partycity.com/", "https://www.eventbrite.com/"],
          deadline: "12/15/2024",
          priority: "low",
          assigneesList: [{ name: "Nicolaus" }, { name: "Mark" }],
          commentsList: [
            {
              user: "Anna",
              hour: "12:00",
              date: "01/12/2024",
              comment: "Written comment lorem ipsum and so on.",
            },
          ],
          status: "in progress",
        },
      ],
    },
    { title: "Done", id: "lastStage", tasksList: [] },
  ] */,
  reducers: {
    addNewTask: (state, action) => {
      state.forEach((stage) => {
        return stage.id === "firstStage"
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
    moveTask: (state, action) => {
      const { taskId, currentStageId, newStageId, closestEleIndex } =
        action.payload;
      const currentStageIndex = findStageIndex(state, currentStageId);
      const taskIndex = findTaskIndex(state, taskId, currentStageId);
      const task = state[currentStageIndex]["tasksList"][taskIndex];
      const newStageIndex = findStageIndex(state, newStageId);
      state[currentStageIndex]["tasksList"].splice(taskIndex, 1);
      state[newStageIndex]["tasksList"].splice(closestEleIndex, 0, task);
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
    moveStage: (state, action) => {
      const { stageId, closestStageIndex } = action.payload;
      console.log(closestStageIndex);
      const stageIndex = findStageIndex(state, stageId);
      const newState = JSON.parse(JSON.stringify(state));
      newState.splice(stageIndex, 1);
      const stage = state[stageIndex];
      newState.splice(closestStageIndex, 0, stage);

      return (state = newState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitialState.pending, (state) => {
        console.log("pending");
        state.loading = true;
      })
      .addCase(fetchInitialState.fulfilled, (state, action) => {
        console.log("fulfilled");
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchInitialState.rejected, (state, action) => {
        console.log("rejected");
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
