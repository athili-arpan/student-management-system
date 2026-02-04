import { db } from "./firebaseConfig";
import { collection, 
  addDoc, getDocs, deleteDoc, updateDoc 
  ,doc, setDoc, getDoc } from "firebase/firestore";

const studentRef = collection(db, "students");

// ADD student
export const addStudent = async (student) => {
  return await addDoc(studentRef, student);
};

// GET all students
export const getStudents = async () => {
  return await getDocs(studentRef);
};

// DELETE student
export const deleteStudent = async (id) => {
  const studentDoc = doc(db, "students", id);
  return await deleteDoc(studentDoc);
};
// UPDATE
export const updateStudent = async (id, data) => {
  return await updateDoc(doc(db, "students", id), data);
};
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
