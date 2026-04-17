// Centralized API Configuration for Task Manager Frontend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// API Endpoints Object
export const API_ENDPOINTS = {
  dashboard: (userId) => `${API_BASE_URL}/api/users/${userId}/dashboard`,
  createTask: () => `${API_BASE_URL}/api/tasks`,
  completeTask: (taskId) => `${API_BASE_URL}/api/tasks/${taskId}/complete`,
  createProject: () => `${API_BASE_URL}/api/projects`,
  createSubtask: (taskId) => `${API_BASE_URL}/api/tasks/${taskId}/subtasks`,
  completeSubtask: (subtaskId) => `${API_BASE_URL}/api/tasks/subtasks/${subtaskId}/complete`,
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
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    // Throw the specific validation details if they exist, otherwise fallback
    throw new Error(errorData.error || errorData.details || `Failed to create task: ${res.statusText}`);
  }
  
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

// Helper function for creating a project
export const postCreateProject = async (projectData) => {
  const res = await fetch(API_ENDPOINTS.createProject(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projectData),
  });
  if (!res.ok) throw new Error(`Failed to create project: ${res.statusText}`);
  return res.json();
};

// Helper function for creating a subtask
export const postCreateSubtask = async (taskId, subtaskData) => {
  const res = await fetch(API_ENDPOINTS.createSubtask(taskId), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subtaskData),
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.details || `Failed to create subtask: ${res.statusText}`);
  }
  
  return res.json();
};

// Helper function for completing a subtask
export const putCompleteSubtask = async (subtaskId) => {
  const res = await fetch(API_ENDPOINTS.completeSubtask(subtaskId), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || errorData.details || `Failed to complete subtask: ${res.statusText}`);
  }
  
  return res.json();
};

// Export the base URL for reference
export { API_BASE_URL };
