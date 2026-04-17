import { useContext, useState, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { UserContext } from '../context/UserContext';
import TaskCard from '../components/Dashboard/TaskCard';
import CreateTaskForm from '../components/Dashboard/CreateTaskForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function DashboardPage() {
  const { projects, tasks, selectedProjectId, loading, error, loadDashboard, clearError } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Load dashboard data when user is available
  useEffect(() => {
    if (user) {
      loadDashboard(user.id);
    }
  }, [user, loadDashboard]);

  useEffect(() => {
    if (selectedProjectId && tasks) {
      const projectTasks = tasks.filter(task => task.project_id === selectedProjectId);
      setFilteredTasks(projectTasks);
    } else if (tasks) {
      setFilteredTasks(tasks);
    }
  }, [selectedProjectId, tasks]);

  const selectedProject = projects?.find(p => p._id === selectedProjectId);
  const completedCount = filteredTasks.filter(t => t.is_completed).length;
  const blockedCount = filteredTasks.filter(t => t.is_blocked && !t.is_completed).length;

  return (
    <div className="flex-1 bg-white dark:bg-slate-950">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-700 px-8 py-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          {selectedProject ? selectedProject.name : 'Dashboard'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {filteredTasks.length} tasks · {completedCount} completed · {blockedCount} blocked
        </p>
      </div>

      {/* Content */}
      <div className="px-8 py-8 space-y-8">
        {loading && <LoadingSpinner />}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
            <div className="flex items-center justify-between">
              <span>{error}</span>
              <button
                onClick={clearError}
                className="ml-4 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Create Task Form */}
        {!loading && <CreateTaskForm />}

        {/* Task List */}
        {!loading && filteredTasks.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200">
            {filteredTasks.map(task => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="text-5xl mb-4">ð</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-600">
                {selectedProject ? 'Create a task to get started' : 'Select a project or create one'}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
