import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import { UserContext } from '../context/UserContext';

export default function Sidebar() {
  const { projects, setSelectedProjectId, createNewProject } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'ð' },
    { label: 'Settings', path: '/settings', icon: 'â' },
    { label: 'Documentation', path: '/documentation', icon: 'ð' },
    { label: 'About', path: '/about', icon: 'â' }
  ];

  const isActive = (path) => location.pathname === path;

  const handleProjectSelect = (projectId) => {
    setSelectedProjectId(projectId);
    setSelectedProject(projectId);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim() || !user) return;

    setIsCreating(true);
    try {
      await createNewProject(newProjectName.trim(), user.id);
      setNewProjectName('');
      setShowCreateProject(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <aside className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-[calc(100vh-64px)] sticky top-16">
      {/* Projects Section - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Projects
          </h3>
          <button
            onClick={() => setShowCreateProject(!showCreateProject)}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            +
          </button>
        </div>
        
        {/* Create Project Form */}
        {showCreateProject && (
          <form onSubmit={handleCreateProject} className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isCreating || !newProjectName.trim()}
                className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {isCreating ? 'Creating...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateProject(false);
                  setNewProjectName('');
                }}
                className="flex-1 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        
        <div className="space-y-2">
          {projects && projects.length > 0 ? (
            projects.map(project => (
              <button
                key={project._id || project.id}
                onClick={() => handleProjectSelect(project._id || project.id)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition ${
                  selectedProject === (project._id || project.id)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                ð {project.name}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No projects yet</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 mx-4"></div>

      {/* Navigation Menu */}
      <div className="px-6 py-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Menu
        </h3>
        <div className="space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive(item.path)
                  ? 'bg-gray-200 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-200 mx-4"></div>

      {/* User Profile Section - Always Visible at Bottom */}
      <div className="px-6 py-6 space-y-4">
        {/* User Info */}
        {user && (
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {user.name || 'User'}
            </p>
            <p className="text-xs text-gray-500">
              {user.email || 'user@example.com'}
            </p>
          </div>
        )}

        {/* Logout Button */}
        <button className="w-full px-4 py-2 rounded-lg bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition">
          Logout
        </button>
      </div>
    </aside>
  );
}
