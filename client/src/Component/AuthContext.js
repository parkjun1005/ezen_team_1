import React, { createContext, useState } from 'react';

// AuthContext를 생성합니다.
export const AuthContext = createContext();

// AuthProvider 컴포넌트를 생성합니다.
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('ACCESS_TOKEN'));

  const login = (token) => {
    localStorage.setItem('ACCESS_TOKEN', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
