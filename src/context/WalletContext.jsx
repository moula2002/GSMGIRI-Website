import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const { user } = useAuth();
  const [balance, setBalance] = useState(0);
  const [orders, setOrders] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWalletData = async () => {
    if (!user || !user.email) return;
    try {
      const headers = { 'x-user-email': user.email };
      const response = await fetch('https://gsmgiri-website-backend.onrender.com/api/data', { headers });
      if (response.ok) {
        const data = await response.json();
        if (data.balance !== undefined) setBalance(data.balance);
        if (data.orders) setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to load wallet data:', error);
    }
  };

  const fetchUsersList = async () => {
    if (!user || user.role !== 'admin') return;
    try {
      const response = await fetch('https://gsmgiri-website-backend.onrender.com/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsersList(data.users || []);
      }
    } catch (error) {
      console.error('Failed to load admin user list:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWalletData();
      if (user.role === 'admin') {
        fetchUsersList();
      }

      const interval = setInterval(() => {
        fetchWalletData();
        if (user.role === 'admin') {
          fetchUsersList();
        }
      }, 5000);

      return () => clearInterval(interval);
    } else {
      setBalance(0);
      setOrders([]);
      setUsersList([]);
    }
  }, [user]);

  const addFunds = async (amountINR, method) => {
    if (!user || !user.email) return null;
    try {
      setLoading(true);
      const response = await fetch('https://gsmgiri-website-backend.onrender.com/api/balance/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amountINR, method, email: user.email })
      });
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
        fetchWalletData();
        return data;
      }
      return null;
    } catch (error) {
      console.error('Deposit funds failed:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const adminAddFunds = async (targetEmail, amount) => {
    if (!user || user.role !== 'admin') return false;
    try {
      const response = await fetch('https://gsmgiri-website-backend.onrender.com/api/admin/users/add-funds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, amount })
      });
      if (response.ok) {
        fetchUsersList();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Admin funding failed:', error);
      return false;
    }
  };

  const placeOrder = async (orderData) => {
    if (!user || !user.email) return null;
    try {
      const response = await fetch('https://gsmgiri-website-backend.onrender.com/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: orderData })
      });
      if (response.ok) {
        const data = await response.json();
        setBalance(data.balance);
        setOrders(data.orders);
        return data;
      }
      return null;
    } catch (error) {
      console.error('Placement of order failed:', error);
      return null;
    }
  };

  return (
    <WalletContext.Provider value={{
      balance,
      orders,
      usersList,
      loading,
      fetchWalletData,
      fetchUsersList,
      addFunds,
      adminAddFunds,
      placeOrder
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
export default WalletContext;
