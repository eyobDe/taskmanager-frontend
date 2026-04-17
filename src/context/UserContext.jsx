import React, { createContext, useContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Mock user data for case study (no real auth yet)
const MOCK_USER = {
  id: '60d5ecb8b392d700153ee123',
  name: 'John Doe',
  email: 'john@example.com'
};

// UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(MOCK_USER);

  const value = {
    user,
    setUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Export the UserContext directly for components that need it
export { UserContext };

// Custom hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
