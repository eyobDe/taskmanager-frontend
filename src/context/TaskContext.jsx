import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchDashboard, postCreateTask, putCompleteTask } from '../services/apiEndpoints.js';

// Create TaskContext
const TaskContext = createContext();

// TaskProvider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load dashboard data for a user
  const loadDashboard = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      
      const dashboardData = await fetchDashboard(userId);
      
      // Set projects and extract all tasks
      setProjects(dashboardData.projects);
      
      // Flatten tasks from all projects into a single array
      const allTasks = dashboardData.projects.flatMap(project => 
        project.tasks.map(task => ({
          ...task,
          project_id: project.id,
          project_name: project.name
        }))
      );
      
      setTasks(allTasks);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new task
  const createNewTask = useCallback(async (taskData) => {
    try {
      setLoading(true);
      setError(null);
      
      const newTask = await postCreateTask(taskData);
      
      // Optimistically add the new task to local state
      setTasks(prevTasks => [
        ...prevTasks,
        {
          ...newTask,
          project_name: projects.find(p => p.id === taskData.project_id)?.name || 'Unknown Project'
        }
      ]);
      
      return newTask;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [projects]);

  // Mark a task as complete
  const markTaskComplete = useCallback(async (taskId) => {
    try {
      setError(null);
      
      const result = await putCompleteTask(taskId);
      
      setTasks(prevTasks => prevTasks.map(task => {
        // Handle both id and _id for flexibility
        const currentTaskId = task.id || task._id;
        
        // 1. Mark the current task as completed
        if (currentTaskId === taskId) {
          return { 
            ...task, 
            is_completed: true,
            is_blocked: false,
            blocked_by_titles: []
          };
        }
        
        // 2. Unblock any tasks that the backend told us are now free
        if (result.unblocked_task_ids?.includes(currentTaskId)) {
          return { 
            ...task, 
            is_blocked: false,
            blocked_by_titles: task.blocked_by_titles.filter(title => 
              title !== result.title
            )
          };
        }
        
        return task;
      }));
      
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    tasks,
    projects,
    loading,
    error,
    loadDashboard,
    createNewTask,
    markTaskComplete,
    clearError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use TaskContext
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
