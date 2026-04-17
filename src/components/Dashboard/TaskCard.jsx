import { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useToast } from '../common/ToastContainer';

export default function TaskCard({ task }) {
  const { markTaskComplete, createNewSubtask, markSubtaskComplete } = useContext(TaskContext);
  const { addToast } = useToast();
  const [isCompleting, setIsCompleting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [subtaskTitle, setSubtaskTitle] = useState('');

  const taskId = task.id || task._id;
  const isCompleted = task.is_completed;
  const isBlocked = task.is_blocked;
  const blockedByTitles = task.blocked_by_titles || [];

  const handleMarkComplete = async () => {
    if (isCompleted || isCompleting) return;
    
    setIsCompleting(true);
    try {
      const result = await markTaskComplete(taskId);
      
      // Show success toast
      if (result.unblocked_task_titles?.length > 0) {
        addToast(
          `Task completed! Unblocked: ${result.unblocked_task_titles.join(', ')}`,
          'success',
          5000
        );
      } else {
        addToast('Task completed successfully!', 'success');
      }
    } catch (error) {
      addToast('Failed to complete task', 'error');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleMarkSubtaskComplete = async (subtaskId) => {
    try {
      await markSubtaskComplete(taskId, subtaskId);
      addToast('Subtask completed!', 'success');
    } catch (error) {
      addToast('Failed to complete subtask', 'error');
    }
  };

  const handleCreateSubtask = (e) => {
    if (e.key === 'Enter' && subtaskTitle.trim()) {
      e.preventDefault();
      createNewSubtask(taskId, subtaskTitle.trim())
        .then(() => {
          addToast('Subtask created!', 'success');
          setSubtaskTitle('');
        })
        .catch(() => {
          addToast('Failed to create subtask', 'error');
        });
    }
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className={`group py-2 px-3 border-b border-gray-100 hover:bg-gray-50 transition ${
      isCompleted ? 'opacity-60' : ''
    }`}>
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleMarkComplete}
          disabled={isCompleting}
          className="w-4 h-4 rounded cursor-pointer"
        />

        {/* Task Title */}
        <div className="flex-1 min-w-0">
          <div className={`text-sm ${
            isCompleted ? 'line-through text-gray-500' : 'text-gray-900'
          }`}>
            {task.title}
          </div>
          
          {/* Meta Info */}
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
            {task.due_date && (
              <span>{formatDate(task.due_date)}</span>
            )}
            {isBlocked && !isCompleted && (
              <span className="text-orange-600 font-medium">Blocked</span>
            )}
            {isCompleted && (
              <span className="text-green-600 font-medium">Done</span>
            )}
            {task.subtasks?.length > 0 && (
              <span>
                {task.subtasks.filter(s => s.is_completed).length}/{task.subtasks.length}
              </span>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {!isCompleted && (
          <button
            onClick={handleMarkComplete}
            disabled={isCompleting || isBlocked}
            className={`px-2 py-1 text-xs rounded transition disabled:opacity-50 disabled:cursor-not-allowed ${
              isBlocked 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : isCompleting
                  ? 'bg-gray-100 text-gray-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCompleting ? '...' : 'Done'}
          </button>
        )}
      </div>

      {/* Subtasks - Collapsible */}
      {task.subtasks?.length > 0 && (
        <div className="ml-7 mt-2 space-y-1">
          {task.subtasks.map((st) => (
            <div key={st._id || st.id} className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={st.is_completed} 
                onChange={() => handleMarkSubtaskComplete(st._id || st.id)}
                disabled={st.is_completed}
                className="w-3 h-3 rounded cursor-pointer disabled:opacity-50"
              />
              <span className={`text-xs ${st.is_completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {st.title}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add Subtask */}
      {!isCompleted && (
        <div className="ml-7 mt-2">
          <input 
            type="text" 
            value={subtaskTitle}
            onChange={(e) => setSubtaskTitle(e.target.value)}
            onKeyDown={handleCreateSubtask}
            placeholder="+ Add subtask..." 
            className="w-full text-xs px-2 py-1 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-400 text-gray-600"
          />
        </div>
      )}
    </div>
  );
}
