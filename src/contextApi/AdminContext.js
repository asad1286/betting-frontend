/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../AxiosInstance';
import Cookies from 'js-cookie';
const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [users, setUsers] = useState({
    users: [],
    totalCount: 0
  });
  const [token, setToken] = useState(null);
  const [adminDetails, setAdminDetails] = useState({
    usdtBalance: 0.00,
    transactionHistory: {
      transactions: [],
      totalSent: 0.00,
      totalReceived: 0.00
    }

  });
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [invitationsAmounts, setInvitationsAmounts] = useState([]);
  const [btcGames, setBtcGames] = useState([]);
  const [timer, setTimer] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUser = Cookies.get('admin');

    if (storedToken && storedUser) {
      setToken(storedToken, { expires: 5 / 24 });
      setAdmin(JSON.parse(storedUser), { expires: 5 / 24 });
      fetchAdminDetails(); // Fetch admin details when context loads
    }
  }, []);

  // Function to fetch admin details
  const fetchAdminDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/admin-details');
      const data = response.data.data;


      if (response.status === 200) {

        setAdminDetails({
          usdtBalance: data.usdtBalance,
          transactionHistory: {
            transactions: data.transactionHistory.transactions,  // Remove the unnecessary array wrapping
            totalReceived: data.transactionHistory.totals.totalReceived,
            totalSent: data.transactionHistory.totals.totalSent,
          },
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/users');
      const data = response.data;

      if (response.status === 200) {
        setUsers({
          users: data.users,
          totalCount: data.totalCount
        })
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllInvitationsAmounts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/invitations');
      const data = response.data;
      console.log("invitations",data)

      if (response.status === 200) {
        setInvitationsAmounts(data.invitations)
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllBtcGames = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/get-btc-games');
      const data = response.data;

      if (response.status === 200) {
        setBtcGames(data.btcGames)
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // Function to fetch withdraw requests
  const fetchWithdrawRequests = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/withdraw-requests');
      console.log("withdraw requests",response.data)
      if (response.data.success) {
        setWithdrawRequests(response.data.withdrawRequests);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSectionTimer = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/admin/latest-timer');
      // console.log(response.data)
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

  // Add a new plan
  const addPlan = async (planData) => {
    try {
      await axiosInstance.post('/admin/add-plan', planData, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchWithdrawRequests();
    fetchAllBtcGames();
    fetchAllUsers();
    fetchAllInvitationsAmounts();
    fetchSectionTimer();
  }, []);

  // Login function
  const adminLogin = async (loginInput, password) => {
    try {
      const isEmail = loginInput.includes('@') || loginInput.includes('.');
      const isPhone = /^\d+$/.test(loginInput) && loginInput.length >= 8;

      if (!isEmail && !isPhone) {
        throw new Error('Please enter a valid email or phone number.');
      }

      const payload = isEmail
        ? { email: loginInput, password }
        : { phoneNumber: loginInput, password };

      const response = await axiosInstance.post('/admin/admin-login', payload);

      const { token, admin } = response.data;

      setToken(token);
      setAdmin(admin);
      Cookies.set('token', token, { expires: 5 / 24 });
      Cookies.set('admin', JSON.stringify(admin), { expires: 5 / 24 });

      // Fetch detailed admin info after login
      await fetchAdminDetails();

      return { status: response.status, data: response.data };
    } catch (error) {
      if (error.response && error.response.data) {
        return { status: error.response.status, message: error.response.data.message };
      }
      console.error('Login failed:', error);
      return { status: 500, message: 'An unexpected error occurred.' };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setAdmin(null);
    Cookies.remove('token');
    Cookies.remove('admin');
  };

  const isAdminAuthenticated = !!token;

  return (
    <AdminContext.Provider
      value={{
        admin,
        token,
        adminLogin,
        adminDetails,
        timer,
        invitationsAmounts,
        fetchAllInvitationsAmounts,
        fetchSectionTimer,
        btcGames,
        fetchAllBtcGames,
        fetchAdminDetails,
        fetchAllUsers,
        users,
        withdrawRequests,
        fetchWithdrawRequests,
        logout,
        isAdminAuthenticated,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook to access admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
