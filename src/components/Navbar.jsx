import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-8 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TM</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            TaskMaster Pro
          </h1>
        </Link>

        {/* Empty right space */}
        <div className="w-48"></div>
      </div>
    </nav>
  );
}
