// Debug environment variables
console.log('All env vars:', import.meta.env);
console.log('Production API URL:', import.meta.env.VITE_REACT_APP_PRODUCTION_API_URL);

// Use Railway URL in production, fallback to localhost in development
const API_URL = import.meta.env.VITE_REACT_APP_PRODUCTION_API_URL || 'http://localhost:3000';

console.log('Final API URL:', API_URL);

// Generic API request helper
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  return await apiRequest('/health');
};

export const fetchUserDashboard = async (userId) => {
  return await apiRequest(`/api/users/${userId}/dashboard`);
};

export const createTask = async (taskData) => {
  return await apiRequest('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
};

export const completeTask = async (taskId) => {
  return await apiRequest(`/api/tasks/${taskId}/complete`, {
    method: 'PUT',
  });
};
