import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [nivelAcceso, setNivelAcceso] = useState(null);

  const login = (nivel) => {
    setNivelAcceso(nivel);
    localStorage.setItem('nivelAcceso', nivel);
  };

  const logout = () => {
    setNivelAcceso(null);
    localStorage.removeItem('nivelAcceso');
  };

  return (
    <AuthContext.Provider value={{ nivelAcceso, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}