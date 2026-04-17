import { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { UserContext } from '../../context/UserContext';

export default function CreateTaskForm() {
  const { createTask, selectedProjectId, projects, tasks } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    due_date: '',
    dependency_ids: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDependencies, setShowDependencies] = useState(false);

  const currentProjectTasks = tasks?.filter(
    t => t.project_id === selectedProjectId && !t.is_completed
  ) || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !selectedProjectId || !user) return;

    setIsSubmitting(true);
    try {
      await createTask({
        ...formData,
        project_id: selectedProjectId,
        assignee_id: user.id,
      });
      setFormData({ title: '', due_date: '', dependency_ids: [] });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show project selection guard if no project is selected
  if (!selectedProjectId) {
    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center text-gray-500">
        Please select a project from the sidebar to create a task.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex-1">
          <input
            type="text"
            placeholder="+ Add a task, press Enter to save..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 bg-transparent border-none text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0"
            disabled={!selectedProjectId}
          />
        </div>
        
        {/* Quick Actions */}
        {selectedProjectId && (
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              className="px-2 py-1 text-sm border border-gray-300 rounded bg-white text-gray-700"
            />
            
            {currentProjectTasks.length > 0 && (
              <button
                type="button"
                onClick={() => setShowDependencies(!showDependencies)}
                className="px-2 py-1 text-xs text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-100"
              >
                Deps
              </button>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting || !formData.title.trim()}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? '...' : 'Add'}
            </button>
          </div>
        )}
      </div>

      {/* Dependencies Panel */}
      {showDependencies && currentProjectTasks.length > 0 && (
        <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
          <div className="text-xs font-medium text-gray-600 mb-2">Dependencies:</div>
          <div className="space-y-1">
            {currentProjectTasks.map(task => (
              <label key={task._id} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={formData.dependency_ids.includes(task._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        dependency_ids: [...formData.dependency_ids, task._id]
                      });
                    } else {
                      setFormData({
                        ...formData,
                        dependency_ids: formData.dependency_ids.filter(id => id !== task._id)
                      });
                    }
                  }}
                  className="w-3 h-3 rounded"
                />
                <span className="text-gray-700">{task.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}
