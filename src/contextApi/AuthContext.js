import React, { createContext, useState, useContext, useEffect } from 'react';

import axiosInstance from '../AxiosInstance';
import Cookies from 'js-cookie';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState(0);
  const [timer, setTimer] = useState({});
  const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUser = Cookies.get('user');
    const storedBalance = Cookies.get('balance');
  
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
  }, []);
  

  // Function to fetch logged-in user's plans


  // Function to update user details in state and localStorage
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    Cookies.set('user', JSON.stringify(updateUser),{ expires: 5 / 24 });
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
      Cookies.set('token', token,{ expires: 5 / 24 });
      Cookies.set('user', JSON.stringify(response.data.user),{ expires: 5 / 24 });
      await fetchUserTRXBalance();
      console.log('Login successful:', balance);
      
      

      return { status: response.status, data: response.data };
    } catch (error) {
      if (error.response && error.response.data) {
        return { status: error.response.status, message: error.response.data.message };
      }
      console.error('Login failed:', error);
      return { status: 500, message: "An unexpected error occurred." };
    }
  };

  const fetchUserTRXBalance = async () => {
    try {
      const response = await axiosInstance.get('/auth/user/trx_balance');
      if (response.data.success) {
        const userUsdtBalance = response.data.userUsdtBalance;
        console.log("Fetched balance from API:", userUsdtBalance);
        setBalance(userUsdtBalance);
        Cookies.set('balance', userUsdtBalance, { expires: 5 / 24 }); // store in cookies
      } else {
        console.error('Failed to fetch balance:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching balance:', error.message);
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
    setBalance(0);
    Cookies.remove('token');
    Cookies.remove('user');
    Cookies.remove('balance');
  };
  

  const fetchSectionTimer = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/latest-timer');
      console.log(response.data)
      if (response.data.success) {
        setTimer(response.data.timer);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    
    fetchSectionTimer();
  }, []);
  const isUserAutenticated = !!token;

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      signup, 
      timer,
      logout, 
      balance,
      fetchUserTRXBalance,
      isUserAutenticated,
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
