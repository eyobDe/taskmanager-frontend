// Centralized API Configuration for Task Manager Frontend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// API Endpoints Object
export const API_ENDPOINTS = {
  dashboard: (userId) => `${API_BASE_URL}/api/users/${userId}/dashboard`,
  createTask: () => `${API_BASE_URL}/api/tasks`,
  completeTask: (taskId) => `${API_BASE_URL}/api/tasks/${taskId}/complete`,
};

// Helper function for fetching dashboard data
export const fetchDashboard = async (userId) => {
  const res = await fetch(API_ENDPOINTS.dashboard(userId));
  if (!res.ok) throw new Error(`Failed to fetch dashboard: ${res.statusText}`);
  return res.json();
};

// Helper function for creating a task
export const postCreateTask = async (taskData) => {
  const res = await fetch(API_ENDPOINTS.createTask(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error(`Failed to create task: ${res.statusText}`);
  return res.json();
};

// Helper function for completing a task
export const putCompleteTask = async (taskId) => {
  const res = await fetch(API_ENDPOINTS.completeTask(taskId), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error(`Failed to complete task: ${res.statusText}`);
  return res.json();
};

// Export the base URL for reference
export { API_BASE_URL };
