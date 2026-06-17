import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gsmgiri_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('gsmgiri_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('gsmgiri_user');
    }
  };

  const logout = async () => {
    try {
      await fetch('https://gsmgiri-website-backend.onrender.com/api/auth/logout', { method: 'POST' });
      setUser(null);
      localStorage.removeItem('gsmgiri_user');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateLocalUser = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem('gsmgiri_user', JSON.stringify(newUserData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateLocalUser, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
