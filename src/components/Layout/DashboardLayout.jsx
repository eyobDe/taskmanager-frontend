import React from 'react';
import { useUser } from '../../context/UserContext';
import { useTask } from '../../context/TaskContext';

const DashboardLayout = ({ children }) => {
  const { user } = useUser();
  const { projects, selectedProjectId, setSelectedProjectId, createNewProject } = useTask();

  const handleCreateProject = () => {
    const name = prompt('Enter project name:');
    if (name && user) {
      createNewProject(name, user.id);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Left Side Panel (Sidebar) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200 font-semibold text-slate-900">
          TaskMaster Pro
        </div>
        
        {/* Projects Section */}
        <div className="flex-1 px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Projects</h3>
            <button
              onClick={handleCreateProject}
              className="text-slate-400 hover:text-slate-600 transition-colors"
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
                    ? 'bg-slate-100 text-slate-900 font-medium'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {project.name}
              </button>
            ))}
            
            {projects.length === 0 && (
              <div className="text-slate-400 text-sm px-3 py-2">
                No projects yet
              </div>
            )}
          </div>
        </div>
        
        {/* User Info */}
        <div className="px-4 py-4 border-t border-slate-200">
          <div className="text-sm text-slate-600">
            {user ? `Logged in as: ${user.name}` : 'Loading...'}
          </div>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8">
          <h2 className="text-lg font-semibold text-slate-700">
            {selectedProjectId 
              ? projects.find(p => p.id === selectedProjectId)?.name || 'Project'
              : 'Select a project'
            }
          </h2>
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
