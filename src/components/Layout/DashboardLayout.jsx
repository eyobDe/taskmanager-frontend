import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { useTask } from '../../context/TaskContext';
import { useTheme } from '../../context/ThemeContext';

const DashboardLayout = ({ children }) => {
  const { user } = useUser();
  const { projects, selectedProjectId, setSelectedProjectId, createNewProject } = useTask();
  const { theme, toggleTheme } = useTheme();

  const handleCreateProject = () => {
    const name = prompt('Enter project name:');
    if (name && user) {
      createNewProject(name, user.id);
    }
  };

  const navClass = ({ isActive }) => 
    `block px-4 py-2 rounded text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-600 text-white' 
        : 'text-slate-300 hover:bg-slate-700 hover:text-white'
    }`;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      {/* Left Side Panel (Sidebar) */}
      <aside className="w-64 bg-slate-800 dark:bg-slate-950 flex flex-col border-r border-transparent dark:border-slate-800 transition-colors">
        <div className="h-16 flex items-center px-6 border-b border-slate-700 dark:border-slate-800 font-bold text-xl text-white">
          TaskMaster Pro
        </div>
        
        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
          <NavLink to="/projects" className={navClass}>Projects</NavLink>
          <NavLink to="/settings" className={navClass}>Settings</NavLink>
          <NavLink to="/docs" className={navClass}>Documentation</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
        </nav>

        {/* Projects Section */}
        <div className="flex-1 px-4 py-6 border-t border-slate-700 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Projects</h3>
            <button
              onClick={handleCreateProject}
              className="text-slate-400 hover:text-slate-300 transition-colors"
              title="New Project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedProjectId === project.id
                    ? 'bg-slate-700 text-white font-medium'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {project.name}
              </button>
            ))}
            
            {projects.length === 0 && (
              <div className="text-slate-500 text-sm px-3 py-2">
                No projects yet
              </div>
            )}
          </div>
        </div>
        
        {/* User Info */}
        <div className="px-4 py-4 border-t border-slate-700 dark:border-slate-800">
          <div className="text-sm text-slate-300">
            {user ? `Logged in as: ${user.name}` : 'Loading...'}
          </div>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 shadow-sm transition-colors">
          <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            {selectedProjectId 
              ? projects.find(p => p.id === selectedProjectId)?.name || 'Project'
              : 'Select a project'
            }
          </h2>
          
          <div className="flex items-center gap-4 text-sm font-medium">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <div className="text-slate-600 dark:text-slate-300">
              {user ? `Logged in as: ${user.name}` : 'Loading...'}
            </div>
          </div>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
