import React, { createContext, useContext, useReducer } from 'react';

const TaskContext = createContext();

// State management logic will be implemented in Phase 3

export const TaskProvider = ({ children }) => {
  return (
    <TaskContext.Provider value={{}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
