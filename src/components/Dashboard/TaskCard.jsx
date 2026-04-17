import React, { useState } from 'react';
import { useTask } from '../../context/TaskContext';
import { useToast } from '../common/ToastContainer';

const TaskCard = ({ task }) => {
  const { markTaskComplete } = useTask();
  const { addToast } = useToast();
  const [isCompleting, setIsCompleting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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

  const formatDate = (dateString) => {
    if (!dateString) return 'No due date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`bg-white rounded-lg border p-4 transition-all ${
      isCompleted ? 'opacity-60 border-gray-200' : 'border-gray-300 hover:shadow-md'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-semibold text-gray-900 ${
              isCompleted ? 'line-through text-gray-500' : ''
            }`}>
              {task.title}
            </h3>
            
            {/* Blocked Badge */}
            {isBlocked && !isCompleted && (
              <div className="relative">
                <span 
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 cursor-help"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  Blocked
                </span>
                
                {/* Tooltip */}
                {showTooltip && blockedByTitles.length > 0 && (
                  <div className="absolute z-10 w-64 p-2 mt-1 text-sm text-white bg-gray-800 rounded-lg shadow-lg">
                    <div className="font-semibold mb-1">Waiting for:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {blockedByTitles.map((title, index) => (
                        <li key={index}>{title}</li>
                      ))}
                    </ul>
                    <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-800 transform rotate-45"></div>
                  </div>
                )}
              </div>
            )}
            
            {/* Completed Badge */}
            {isCompleted && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Completed
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-600 space-y-1">
            <div>Project: {task.project_name}</div>
            <div>Due: {formatDate(task.due_date)}</div>
            {task.subtasks && task.subtasks.length > 0 && (
              <div>Subtasks: {task.subtasks.filter(st => !st.is_completed).length}/{task.subtasks.length} remaining</div>
            )}
          </div>
        </div>
        
        {/* Action Button */}
        <div className="ml-4">
          {!isCompleted && (
            <button
              onClick={handleMarkComplete}
              disabled={isCompleting || isBlocked}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                isBlocked 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : isCompleting
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isCompleting ? 'Completing...' : isBlocked ? 'Blocked' : 'Mark Done'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
