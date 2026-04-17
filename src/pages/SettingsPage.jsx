export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Settings</h1>
      
      <div className="space-y-6 max-w-2xl">
        {/* Notification Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Notifications</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-sm text-slate-600 dark:text-slate-300">Email on task completion</span>
          </label>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Account</h2>
          <div className="space-y-3">
            <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline transition-colors">
              Change Password
            </button>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              <p>Email: john@example.com</p>
              <p>Account created: January 2024</p>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Appearance</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Compact view</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Show task dependencies</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
