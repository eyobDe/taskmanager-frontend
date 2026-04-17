import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { useUser } from '../../context/UserContext';

const CreateTaskForm = ({ projects }) => {
  const { createNewTask, tasks, selectedProjectId } = useTask();
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dependencyIds, setDependencyIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDependencies, setShowDependencies] = useState(false);

  const availableDependencies = selectedProjectId 
    ? tasks.filter(task => task.project_id === selectedProjectId && !task.is_completed)
    : [];

  const handleDependencyToggle = (taskId) => {
    setDependencyIds(prev => 
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !selectedProjectId) return;

    setIsSubmitting(true);
    try {
      await createNewTask({
        title: title.trim(),
        project_id: selectedProjectId,
        assignee_id: user.id,
        due_date: dueDate || null,
        dependency_ids: dependencyIds
      });
      
      // Reset form
      setTitle('');
      setDueDate('');
      setDependencyIds([]);
      setShowDependencies(false);
    } catch (err) {
      console.error('Error creating task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border-b border-slate-200">
      <form onSubmit={handleSubmit} className="px-8 py-4">
        <div className="flex items-center gap-3">
          {/* Task Title Input */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a task name and press Enter..."
            className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            disabled={!selectedProjectId || isSubmitting}
          />

          {/* Due Date Input */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent"
            disabled={!selectedProjectId || isSubmitting}
          />

          {/* Dependencies Toggle */}
          {availableDependencies.length > 0 && (
            <button
              type="button"
              onClick={() => setShowDependencies(!showDependencies)}
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                dependencyIds.length > 0
                  ? 'bg-slate-100 border-slate-300 text-slate-700'
                  : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
              disabled={!selectedProjectId || isSubmitting}
            >
              Dependencies {dependencyIds.length > 0 && `(${dependencyIds.length})`}
            </button>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!title.trim() || !selectedProjectId || isSubmitting}
            className="px-4 py-2 text-sm bg-slate-900 text-white rounded-md hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? '...' : 'Add'}
          </button>
        </div>

        {/* Dependencies Dropdown */}
        {showDependencies && availableDependencies.length > 0 && (
          <div className="mt-3 p-3 bg-slate-50 rounded-md border border-slate-200">
            <div className="text-xs font-medium text-slate-600 mb-2">Depends on:</div>
            <div className="space-y-1">
              {availableDependencies.map(task => (
                <label key={task.id || task._id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dependencyIds.includes(task.id || task._id)}
                    onChange={() => handleDependencyToggle(task.id || task._id)}
                    className="rounded border-slate-300 text-slate-600 focus:ring-slate-400"
                  />
                  <span className="text-sm text-slate-700">{task.title}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateTaskForm;
