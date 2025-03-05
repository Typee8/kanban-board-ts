import { getDatabase, ref, get, push, remove, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const dataLocation = "/tasksList";

export const fetchData = async () => {
  const db = getDatabase(app);
  const dbRef = ref(db /* , dataLocation */);
  /*   let resultArray = []; */

  try {
    const snapshot = await get(dbRef);
    const result = snapshot.val();

    console.log(result);
    /*     for (const key in result) {
      resultArray.push({ ...result[key], id: key });
    } */
    console.log("Data fetched successfully!");
    return result;
  } catch (error) {
    throw new Error(`FETCH - failed, status: ${error}`);
  }
};

export const pushData = async (obj) => {
  const db = getDatabase(app);
  const dbRef = ref(db /* , dataLocation */);

  try {
    await push(dbRef, obj);
    console.log("Data pushed successfully!");
  } catch (error) {
    throw new Error(`PUSH - failed, status: ${error}`);
  }
};

export const removeData = async (id) => {
  const db = getDatabase(app);
  const dbRef = ref(db, `${dataLocation}/${id}`);

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
