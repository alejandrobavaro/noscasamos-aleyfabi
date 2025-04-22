import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear el proveedor del contexto
export function AuthProvider({ children }) {
  const [nivelAcceso, setNivelAcceso] = useState(null);

  // Verificar si hay un nivel de acceso guardado al cargar la aplicación
  useEffect(() => {
    const accesoGuardado = localStorage.getItem('nivelAcceso');
    if (accesoGuardado) {
      setNivelAcceso(accesoGuardado);
    }
  }, []);

  // Función para iniciar sesión
  const login = (nivel) => {
    setNivelAcceso(nivel);
    localStorage.setItem('nivelAcceso', nivel);
  };

  // Función para cerrar sesión
  const logout = () => {
    setNivelAcceso(null);
    localStorage.removeItem('nivelAcceso');
  };

  // Valor que estará disponible para todos los componentes
  const value = {
    nivelAcceso,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Crear el hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}