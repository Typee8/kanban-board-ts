import { getDatabase, ref, get, push, remove, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);

export const fetchData = async (boardId) => {
  const db = getDatabase(app);
  const dbRef = ref(db, boardId);

  try {
    const snapshot = await get(dbRef);
    const result = snapshot.val();
    console.log("Data fetched successfully!");
    return result;
  } catch (error) {
    throw new Error(`FETCH - failed, status: ${error}`);
  }
};

export const pushData = async (data) => {
  const db = getDatabase(app);
  const dbRef = ref(db);

  try {
    await push(dbRef, data);
    console.log("Data pushed successfully!");
  } catch (error) {
    throw new Error(`PUSH - failed, status: ${error}`);
  }
};

export const setData = async (data, boardId, path = "") => {
  const db = getDatabase(app);
  const dbRef = ref(db, `${boardId}/${path}`);

  try {
    await set(dbRef, data);
    console.log("Data set successfully!");
  } catch (error) {
    throw new Error(`SET - failed, status: ${error}`);
  }
};

export const removeData = async (boardId, path) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `${boardId}/${path}`);

  try {
    await remove(dbRef);
    console.log("Data removed successfully!");
  } catch (error) {
    throw new Error(`REMOVE - failed, status: ${error}`);
  }
};

export const updateData = async (id, obj) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `${dataLocation}/${id}`);

  try {
    await set(dbRef, obj);
    console.log("Data updated successfully!");
  } catch (error) {
    throw new Error(`UPDATE - failed, status: ${error}`);
  }
};
