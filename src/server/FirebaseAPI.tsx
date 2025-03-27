import { getDatabase, ref, get, remove, set } from "firebase/database";
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

export const removeBoard = async () => {
  const db = getDatabase(app);
  const dbRef = ref(db);

  try {
    await remove(dbRef);
    console.log("Data removed successfully!");
  } catch (error) {
    throw new Error(`REMOVE - failed, status: ${error}`);
  }
};
