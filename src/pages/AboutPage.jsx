import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="border-b pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">About Task Manager</h1>
        <p className="text-gray-600 mt-2">
          A modern task management system with dependency tracking
        </p>
      </div>

      <div className="space-y-8">
        {/* Project Overview */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            Task Manager is a comprehensive task management application that allows users to create, 
            organize, and track tasks with complex dependency relationships. Built with modern 
            web technologies, it provides a clean and intuitive interface for managing projects 
            of any size.
          </p>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">-</span>
              <span>Task creation with optional dependencies</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">-</span>
              <span>Automatic dependency tracking and blocking detection</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">-</span>
              <span>Project-based task organization</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">-</span>
              <span>Real-time task completion and unblocking</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">-</span>
              <span>Professional UI with Tailwind CSS</span>
            </li>
          </ul>
        </section>

        {/* Technology Stack */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Frontend</h3>
              <ul className="space-y-1 text-gray-600">
                <li>React 18 with Hooks</li>
                <li>Vite for development</li>
                <li>React Router for navigation</li>
                <li>Tailwind CSS for styling</li>
                <li>React Context for state management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Backend</h3>
              <ul className="space-y-1 text-gray-600">
                <li>Node.js with Express</li>
                <li>MongoDB with Mongoose ODM</li>
                <li>RESTful API design</li>
                <li>Embedded dependency tracking</li>
                <li>Optimized database queries</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Architecture</h2>
          <p className="text-gray-700 leading-relaxed">
            The application follows a modern client-server architecture with clear separation of concerns. 
            The frontend uses React Context for state management, while the backend implements a 
            RESTful API with optimized database queries. Task dependencies are tracked using an 
            embedded schema approach for performance, allowing efficient blocking detection with 
            maximum 3 database queries for the dashboard view.
          </p>
        </section>

        {/* Version Info */}
        <section className="border-t pt-6">
          <p className="text-sm text-gray-500">
            Version 1.0.0 | Built with React, Node.js, and MongoDB
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
