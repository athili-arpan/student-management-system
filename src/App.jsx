import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import Attendance from "./components/Attendance";
import Login from "./components/Login";

function App() {
  const { user, logout } = useAuth();
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAttendance, setShowAttendance] = useState(false);

  // 🔒 NOT LOGGED IN
  if (!user) {
    return <Login />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management System</h1>

      <div style={{ marginBottom: "15px" }}>
        <span>{user.displayName}</span>
        <button onClick={logout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      </div>

      <button onClick={() => setShowAttendance(!showAttendance)}>
        {showAttendance ? "Back to Students" : "Attendance"}
      </button>

      <hr />

      {showAttendance ? (
        <Attendance />
      ) : (
        <>
          <StudentForm
            editingStudent={editingStudent}
            clearEdit={() => setEditingStudent(null)}
          />
          <StudentList onEdit={setEditingStudent} />
        </>
      )}
    </div>
  );
}

export default App;


