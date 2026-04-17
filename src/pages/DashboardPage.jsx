import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useTask } from '../context/TaskContext';
import CreateTaskForm from '../components/Dashboard/CreateTaskForm';
import TaskList from '../components/Dashboard/TaskList';

const DashboardPage = () => {
  const { user } = useUser();
  const { tasks, projects, selectedProjectId, loading, error, loadDashboard, clearError } = useTask();

  useEffect(() => {
    if (user) {
      loadDashboard(user.id);
    }
  }, [user, loadDashboard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-600">Loading...</div>
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

  // Filter tasks by selected project
  const filteredTasks = selectedProjectId 
    ? tasks.filter(task => task.project_id === selectedProjectId)
    : [];

  const selectedProject = selectedProjectId 
    ? projects.find(p => p.id === selectedProjectId)
    : null;

  return (
    <div className="h-full flex flex-col">
      {!selectedProjectId ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-slate-400 text-lg mb-2">No project selected</div>
            <div className="text-slate-500 text-sm">Select or create a project in the sidebar</div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Project Header */}
          <div className="px-8 py-6 border-b border-slate-200">
            <h1 className="text-xl font-semibold text-slate-900">{selectedProject?.name}</h1>
            <p className="text-slate-600 text-sm mt-1">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Create Task Form */}
          <div className="px-8 py-4 border-b border-slate-200">
            <CreateTaskForm projects={projects.filter(p => p.id === selectedProjectId)} />
          </div>

          {/* Task List */}
          <div className="flex-1 px-8 py-6">
            <TaskList tasks={filteredTasks} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
