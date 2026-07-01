// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const MOCK_USER = { email: "admin@zionpg.com", password: "zion123" };

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = (email, password) => {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      setUser({ email });
      setError("");
      return true;
    }
    setError("Invalid email or password.");
    return false;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}