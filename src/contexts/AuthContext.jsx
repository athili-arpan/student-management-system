import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
  getRedirectResult(auth).catch((err) =>
      console.error("Redirect error:", err)
);

  const unsub = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
  });

  return () => unsub();
}, []);

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout: () => signOut(auth) }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
