import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initial authentication check on load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Attempt to refresh the token using the httpOnly cookie
        const res = await axiosInstance.post('/auth/refresh');
        const token = res.data.accessToken;
        
        // Set the new token in headers
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Fetch the user's profile
        const profileRes = await axiosInstance.get('/user/profile');
        setUser(profileRes.data);
      } catch (error) {
        // Expected error if no refresh token exists or it's expired
        delete axiosInstance.defaults.headers.common['Authorization'];
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    const res = await axiosInstance.post('/auth/login', { email, password });
    const { accessToken, ...userData } = res.data;
    
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setUser(userData);
  };

  const signup = async (name, email, password) => {
    const res = await axiosInstance.post('/auth/signup', { name, email, password });
    const { accessToken, ...userData } = res.data;
    
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
       console.error("Logout error", error);
    } finally {
      delete axiosInstance.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const updateProfile = async (data) => {
    const res = await axiosInstance.put('/user/profile', data);
    setUser(res.data);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
