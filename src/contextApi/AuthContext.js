import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../AxiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
 

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to fetch logged-in user's plans


  // Function to update user details in state and localStorage
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Login function
  const login = async (loginInput, password) => {
    try {
      const isEmail = loginInput.includes("@") || loginInput.includes(".");
      const isPhone = /^\d+$/.test(loginInput) && loginInput.length >= 8;

      if (!isEmail && !isPhone) {
        throw new Error("Please enter a valid email or phone number.");
      }

      const payload = isEmail ? { email: loginInput, password } : { phoneNumber: loginInput, password };
      const response = await axiosInstance.post('/auth/user/signin', payload);

      const { token, user } = response.data;

      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      console.log("token in context",token)
      

      return { status: response.status, data: response.data };
    } catch (error) {
      if (error.response && error.response.data) {
        return { status: error.response.status, message: error.response.data.message };
      }
      console.error('Login failed:', error);
      return { status: 500, message: "An unexpected error occurred." };
    }
  };

  // Signup function
  const signup = async (firstName, lastName, email, phoneNumber, password, withdrawPassword, invitationCode) => {
    try {
      const response = await axiosInstance.post('/auth/user/signup', {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        withdrawPassword,
        invitationCode
      });
      return response;
    } catch (error) {
      if (error.response && error.response.data.errors) {
        throw error.response.data.errors;
      }
      console.error('Signup failed:', error);
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      signup, 
      logout, 
      isAuthenticated,
      updateUser,
  
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
