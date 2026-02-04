import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <button onClick={loginWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}
