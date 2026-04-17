export default function AboutPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">About TaskMaster Pro</h1>
      
      <div className="space-y-6 text-slate-600 dark:text-slate-400">
        <p className="text-lg leading-relaxed">
          TaskMaster Pro is a modern task management system designed for teams. 
          Built with a focus on dependency tracking and productivity.
        </p>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Features</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Task dependency management
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Multi-project support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Dark mode support
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              Real-time blocking status
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              Subtask management
            </li>
          </ul>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-3">Frontend</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">React</span> 18 with Hooks
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">Vite</span> for development
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">React Router</span> for navigation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">Tailwind CSS</span> for styling
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-slate-900 dark:text-white mb-3">Backend</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">Node.js</span> with Express
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-400">MongoDB</span> with Mongoose
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">RESTful API</span> design
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-400">Optimized</span> database queries
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Built by</h2>
          <p className="text-sm">A case study in modern full-stack development.</p>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Version 1.0.0 | Production-ready UI/UX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
