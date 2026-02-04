import { useEffect, useState } from "react";
import { getStudents } from "../firebase/studentService";
import { saveAttendance, getAttendance } from "../firebase/attendanceService";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    loadStudents();
    loadAttendance(date);
  }, [date]);

  const loadStudents = async () => {
    const snapshot = await getStudents();
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(list);
  };

  const loadAttendance = async (selectedDate) => {
    const records = await getAttendance(selectedDate);
    if (records) setAttendance(records);
    else setAttendance({});
  };

  const markAttendance = (id, status) => {
    setAttendance({
      ...attendance,
      [id]: {
        ...students.find((s) => s.id === id),
        status,
      },
    });
  };

  const handleSave = async () => {
    await saveAttendance(date, attendance);
    alert("Attendance saved ✅");
  };

  return (
    <div>
      <h2>Attendance</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {students.map((s) => (
        <div key={s.id} style={{ marginBottom: "6px" }}>
          <span>
            {s.name} - Class {s.class}
          </span>

          <button
            onClick={() => markAttendance(s.id, "present")}
            style={{
              marginLeft: "10px",
              color: attendance[s.id]?.status === "present" ? "green" : "",
            }}
          >
            Present
          </button>

          <button
            onClick={() => markAttendance(s.id, "absent")}
            style={{
              marginLeft: "5px",
              color: attendance[s.id]?.status === "absent" ? "red" : "",
            }}
          >
            Absent
          </button>
        </div>
      ))}

      <br />
      <button onClick={handleSave}>Save Attendance</button>
    </div>
  );
}
