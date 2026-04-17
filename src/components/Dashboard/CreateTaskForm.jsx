import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';

const CreateTaskForm = ({ projects }) => {
  const { createNewTask } = useTask();
  const [formData, setFormData] = useState({
    title: '',
    project_id: '',
    due_date: '',
    dependency_ids: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Filter tasks by selected project for dependencies
  const getAvailableDependencies = () => {
    if (!formData.project_id) return [];
    
    const selectedProject = projects.find(p => p.id === formData.project_id);
    return selectedProject?.tasks || [];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDependencyToggle = (taskId) => {
    setFormData(prev => ({
      ...prev,
      dependency_ids: prev.dependency_ids.includes(taskId)
        ? prev.dependency_ids.filter(id => id !== taskId)
        : [...prev.dependency_ids, taskId]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.title.trim() || !formData.project_id) {
      setError('Title and project are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await createNewTask({
        title: formData.title.trim(),
        project_id: formData.project_id,
        due_date: formData.due_date || null,
        dependency_ids: formData.dependency_ids
      });
      
      // Reset form
      setFormData({
        title: '',
        project_id: '',
        due_date: '',
        dependency_ids: []
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDependencies = getAvailableDependencies();

  return (
    <div className="bg-white rounded-lg border border-gray-300 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Task Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task title"
            required
          />
        </div>

        {/* Project */}
        <div>
          <label htmlFor="project_id" className="block text-sm font-medium text-gray-700 mb-1">
            Project *
          </label>
          <select
            id="project_id"
            name="project_id"
            value={formData.project_id}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a project</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={formData.due_date}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Dependencies */}
        {formData.project_id && availableDependencies.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dependencies (tasks that must be completed first)
            </label>
            <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-md p-2">
              {availableDependencies.map(task => (
                <label key={task.id || task._id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={formData.dependency_ids.includes(task.id || task._id)}
                    onChange={() => handleDependencyToggle(task.id || task._id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    {task.title}
                    {task.is_completed && <span className="text-green-600 ml-1">(completed)</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="text-sm text-red-800">{error}</div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
