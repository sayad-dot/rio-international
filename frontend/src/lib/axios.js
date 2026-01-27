import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Log API URL for debugging
console.log('=== API CONFIGURATION ===');
console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('API_URL:', API_URL);
console.log('Mode:', import.meta.env.MODE);

// Create axios instance with longer timeout for free-tier database wake-up
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 seconds to handle database cold starts on free tier
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('   Token exists:', !!token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('   Token attached:', token.substring(0, 30) + '...');
    } else {
      console.warn('   ⚠️ NO TOKEN FOUND IN LOCALSTORAGE');
    }
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add retry logic for network failures and timeouts
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    
    // Retry logic for timeouts and network errors (max 2 retries)
    if (!config.__retryCount) {
      config.__retryCount = 0;
    }
    
    // Retry on timeout or network errors (but not on 4xx/5xx errors)
    const shouldRetry = (
      (error.code === 'ECONNABORTED' || error.message.includes('timeout') || !error.response) &&
      config.__retryCount < 2
    );
    
    if (shouldRetry) {
      config.__retryCount += 1;
      console.log(`Retrying request (attempt ${config.__retryCount + 1}/3)...`);
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * config.__retryCount));
      return axiosInstance.request(config);
    }
    
    // Log the full error for debugging
    console.error('=== API ERROR ===');
    console.error('URL:', error.config?.url);
    console.error('Method:', error.config?.method);
    console.error('Status:', error.response?.status);
    console.error('Message:', error.message);
    console.error('Config:', error.config);
    console.error('Response:', error.response);
    
    if (error.response) {
      // Handle specific error codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          console.error('🚫 401 Unauthorized - Token invalid or expired');
          
          // Check if user was admin before clearing storage
          const storedUser = localStorage.getItem('user');
          let isAdminUser = false;
          if (storedUser) {
            try {
              const user = JSON.parse(storedUser);
              isAdminUser = user.role === 'ADMIN' || user.role === 'SUPER_ADMIN';
            } catch (e) {
              console.error('Error parsing stored user:', e);
            }
          }
          
          // Clear auth data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          // Redirect to appropriate login page
          const currentPath = window.location.pathname;
          if (!currentPath.includes('/login') && !currentPath.includes('/auth')) {
            const redirectUrl = isAdminUser ? '/auth/admin/login' : '/login';
            window.location.href = redirectUrl;
          }
          break;
        case 403:
          // Forbidden
          console.error('Access denied');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received from server');
      console.error('Request:', error.request);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
