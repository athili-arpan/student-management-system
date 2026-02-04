import { useEffect, useState } from "react";
import { addStudent, updateStudent } from "../firebase/studentService";

export default function StudentForm({ editingStudent, clearEdit }) {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setClassName(editingStudent.class);
    }
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !className) return alert("Fill all fields");

    if (editingStudent) {
      await updateStudent(editingStudent.id, {
        name,
        class: className,
      });
      clearEdit();
    } else {
      await addStudent({
        name,
        class: className,
        createdAt: new Date(),
      });
    }

    setName("");
    setClassName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingStudent ? "Edit Student" : "Add Student"}</h3>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Class"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
      />

      <button type="submit">
        {editingStudent ? "Update Student" : "Add Student"}
      </button>

      {editingStudent && (
        <button type="button" onClick={clearEdit}>
          Cancel
        </button>
      )}
    </form>
  );
}

