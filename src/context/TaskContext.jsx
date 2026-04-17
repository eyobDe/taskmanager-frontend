import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchDashboard, postCreateTask, putCompleteTask, postCreateProject, postCreateSubtask, putCompleteSubtask } from '../services/apiEndpoints.js';

// Create TaskContext
const TaskContext = createContext();

// TaskProvider component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
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
          project_name: projects.find(p => p._id === taskData.project_id)?.name || 'Unknown Project'
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

  // Create a new project
  const createNewProject = useCallback(async (name, userId) => {
    try {
      setLoading(true);
      setError(null);
      
      // Ensure we have valid data before sending
      if (!name || !userId) {
        throw new Error('Project name and user ID are required');
      }
      
      const projectData = {
        name: name.trim(),
        user_id: userId
      };
      
      console.log('Creating project with data:', projectData);
      
      const newProject = await postCreateProject(projectData);
      
      console.log('Project created successfully:', newProject);
      
      // Add the new project to local state with proper ID handling
      const projectToAdd = {
        _id: newProject._id || newProject.id,
        name: newProject.name,
        tasks: []
      };
      
      setProjects(prevProjects => [
        ...prevProjects,
        projectToAdd
      ]);
      
      return newProject;
    } catch (err) {
      console.error('Project creation error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new subtask
  const createNewSubtask = useCallback(async (taskId, title) => {
    try {
      const newSubtask = await postCreateSubtask(taskId, { title });
      
      setTasks(prevTasks => prevTasks.map(task => {
        const currentId = task.id || task._id;
        if (currentId === taskId) {
          // Ensure subtasks array exists before spreading
          const existingSubtasks = task.subtasks || [];
          return { ...task, subtasks: [...existingSubtasks, newSubtask] };
        }
        return task;
      }));
      
      return newSubtask;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Mark a subtask as complete
  const markSubtaskComplete = useCallback(async (taskId, subtaskId) => {
    try {
      await putCompleteSubtask(subtaskId);
      
      setTasks(prevTasks => prevTasks.map(task => {
        const currentId = task.id || task._id;
        if (currentId === taskId) {
          return {
            ...task,
            subtasks: (task.subtasks || []).map(st => 
              (st.id || st._id) === subtaskId ? { ...st, is_completed: true } : st
            )
          };
        }
        return task;
      }));
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
    selectedProjectId,
    setSelectedProjectId,
    loading,
    error,
    loadDashboard,
    createNewTask,
    createTask: createNewTask, // Alias for new components
    createNewProject,
    markTaskComplete,
    completeTask: markTaskComplete, // Alias for new components
    createNewSubtask,
    markSubtaskComplete,
    clearError
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use TaskContext
// Export the TaskContext directly for components that need it
export { TaskContext };

// Custom hook to use TaskContext
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export default TaskContext;
