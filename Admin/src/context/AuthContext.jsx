import React, { createContext, useContext, useState } from 'react';
import { getAdminByCredentials } from '../services/firebase'; // ✅ Import your Firebase utility

// Create the context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔐 Real login using Firebase Firestore admin credentials
  const login = async (username, password) => {
    const admin = await getAdminByCredentials(username, password);
    if (!admin) {
      throw new Error('Invalid username or password');
    }
    setUser(admin);
  };

  // 🔐 Optional: simulate or use Firebase register logic
  const register = async (name, email, password) => {
    // Normally you'd push to Firestore or use Firebase Auth
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({
      id: 'temp-id',
      name,
      email,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
