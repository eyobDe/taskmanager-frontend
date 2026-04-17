import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No tasks found</div>
        <p className="text-gray-400 mt-2">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
        All Tasks ({tasks.length})
      </h2>
      <div className="grid gap-4">
        {tasks.map(task => (
          <TaskCard key={task.id || task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
