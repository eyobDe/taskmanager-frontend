export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block animate-spin">
          <div className="w-8 h-8 border-4 border-gray-300 dark:border-slate-700 border-t-blue-600 rounded-full"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">Loading...</p>
      </div>
    </div>
  );
}
