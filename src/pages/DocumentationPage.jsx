export default function DocumentationPage() {
  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Documentation</h1>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Getting Started</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            TaskMaster Pro helps you manage projects and track task dependencies. Create a project, add tasks, and mark them complete.
          </p>
          <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
            <h3 className="font-medium text-slate-900 dark:text-white mb-2">Quick Start:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Create your first project</li>
              <li>Add tasks with dependencies</li>
              <li>Track progress and completion</li>
            </ol>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">API Endpoints</h2>
          <div className="space-y-3">
            <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded overflow-x-auto text-sm font-mono">
              <div className="mb-2 text-green-400"># Get Dashboard Data</div>
              <div>GET /api/users/:id/dashboard</div>
            </div>
            <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded overflow-x-auto text-sm font-mono">
              <div className="mb-2 text-blue-400"># Create Task</div>
              <div>POST /api/tasks</div>
            </div>
            <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded overflow-x-auto text-sm font-mono">
              <div className="mb-2 text-yellow-400"># Complete Task</div>
              <div>PUT /api/tasks/:id/complete</div>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Tech Stack</h2>
          <ul className="space-y-2 text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <strong>Backend:</strong> Node.js + Express + MongoDB
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <strong>Frontend:</strong> React + Vite + Tailwind CSS
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <strong>Deployment:</strong> Railway + Vercel
            </li>
          </ul>
        </section>

        <section className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Task Management</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Create, organize, and track tasks with dependencies</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Project Organization</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Group tasks by projects for better organization</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Dependency Tracking</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Visualize and manage task dependencies</p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              <h3 className="font-medium text-slate-900 dark:text-white mb-2">Dark Mode</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Switch between light and dark themes</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
