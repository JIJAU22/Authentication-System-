import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Send cookies (refresh token) with requests
});

// Interceptor to handle token refresh on 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token using standard axios to avoid interceptor loop
        const res = await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
        
        const newAccessToken = res.data.accessToken;
        
        // Update authorization header for future requests
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Update header for THIS request and retry
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed (e.g., refresh token expired)
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
