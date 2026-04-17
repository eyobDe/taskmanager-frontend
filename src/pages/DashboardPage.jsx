import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useTask } from '../context/TaskContext';
import CreateTaskForm from '../components/Dashboard/CreateTaskForm';
import TaskList from '../components/Dashboard/TaskList';

const DashboardPage = () => {
  const { user } = useUser();
  const { tasks, projects, loading, error, loadDashboard, clearError } = useTask();

  useEffect(() => {
    if (user) {
      loadDashboard(user.id);
    }
  }, [user, loadDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="text-red-800">Error: {error}</div>
        <button 
          onClick={clearError}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold text-gray-900">Task Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage your tasks and track dependencies across {projects.length} projects
        </p>
      </div>

      {/* Create Task Form */}
      <CreateTaskForm projects={projects} />

      {/* Task List */}
      <TaskList tasks={tasks} />
    </div>
  );
};

export default DashboardPage;
