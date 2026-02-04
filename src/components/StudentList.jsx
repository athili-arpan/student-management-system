import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../firebase/studentService";

export default function StudentList({ onEdit }) {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    const snapshot = await getStudents();
    setStudents(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete student?")) return;
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div>
      <h3>Student List</h3>

      {students.map((s) => (
        <div key={s.id} style={{ marginBottom: "8px" }}>
          <span>
            {s.name} - Class {s.class}
          </span>

          <button onClick={() => onEdit(s)} style={{ marginLeft: "10px" }}>
            Edit
          </button>

          <button
            onClick={() => handleDelete(s.id)}
            style={{ marginLeft: "6px", color: "red" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}


