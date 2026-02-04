import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Save attendance for a date
export const saveAttendance = async (date, records) => {
  const attendanceRef = doc(db, "attendance", date);
  await setDoc(attendanceRef, { records });
};

// Get attendance for a date
export const getAttendance = async (date) => {
  const attendanceRef = doc(db, "attendance", date);
  const snapshot = await getDoc(attendanceRef);
  return snapshot.exists() ? snapshot.data().records : null;
};
