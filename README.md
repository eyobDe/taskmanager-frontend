# TaskMaster Pro - Frontend

![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

## Overview

A modern, Notion-inspired task management interface built with React and Tailwind CSS. Features complex state management with optimistic UI updates, task dependencies, and a clean, professional design.

## Live Application

**Production URL**: `https://taskmanager-frontend-one.vercel.app/`

## Tech Stack

- **Framework**: React 18 with Hooks
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router v6
- **State Management**: React Context API (no Redux overhead)
- **HTTP Client**: Fetch API with centralized service layer

## Key Features

### Complex State Management
- **React Context API**: Manages global state without Redux complexity
- **Optimistic Updates**: Immediate UI feedback for all actions
- **Error Handling**: Comprehensive error states with dismissible notifications
- **Loading States**: Smooth loading indicators throughout app

### Task Dependencies
- **Visual Dependency Chains**: See which tasks block others
- **Dependency Validation**: Backend enforces completion rules
- **Circular Dependency Prevention**: API prevents infinite loops
- **Smart Blocking**: Tasks automatically blocked when dependencies are incomplete

### Modern UI/UX
- **Notion-Inspired Design**: Clean, card-based interface
- **Light Mode Only**: Focused design without dark mode complexity
- **Responsive Layout**: Works seamlessly on all screen sizes
- **Toast Notifications**: Non-intrusive feedback for all user actions
- **Inline Task Creation**: Quick task creation with optional details

### Navigation & Layout
- **Fixed Sidebar**: Always visible, never cut off
- **Bottom Navigation**: Menu moved from top navbar to sidebar for better UX
- **Sticky Components**: Navbar and sidebar stay in view while scrolling
- **Professional Typography**: Clean hierarchy and spacing

## Component Architecture

```
src/
├── components/
│   ├── common/           # Reusable components
│   │   ├── LoadingSpinner.jsx
│   │   └── ToastContainer.jsx
│   ├── Dashboard/        # Task management components
│   │   ├── TaskCard.jsx
│   │   └── CreateTaskForm.jsx
│   ├── Navbar.jsx         # Top navigation
│   └── Sidebar.jsx        # Project navigation & user profile
├── context/              # Global state management
│   ├── TaskContext.jsx    # Task, project, subtask state
│   └── UserContext.jsx    # User authentication state
├── pages/                # Route components
│   ├── DashboardPage.jsx
│   ├── SettingsPage.jsx
│   ├── DocumentationPage.jsx
│   └── AboutPage.jsx
├── services/             # API layer
│   ├── api.js
│   └── apiEndpoints.js
└── styles/               # Global styles
    └── globals.css
```

## Request/Response Flow

### Task Creation
```javascript
// Optimistic update pattern
const handleCreateTask = async (taskData) => {
  // 1. Add task to UI immediately
  setTasks(prev => [...prev, optimisticTask]);
  
  // 2. Send to API
  try {
    const newTask = await createTask(taskData);
    // 3. Replace optimistic task with real data
    setTasks(prev => prev.map(t => 
      t.id === optimisticTask.id ? newTask : t
    ));
  } catch (error) {
    // 4. Revert on error
    setTasks(prev => prev.filter(t => t.id !== optimisticTask.id));
  }
};
```

### Dependency Management
```javascript
// Automatic blocking calculation
const isBlocked = task.dependsOn?.some(dep => !dep.is_completed);

// UI automatically updates when dependencies change
useEffect(() => {
  // Recalculate blocked status
  updateTaskBlockingStatus();
}, [tasks, task.dependsOn]);
```

## Local Development Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Git

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd taskmanager-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create `.env` file in root:
   ```env
   # API Configuration
   VITE_API_URL=http://localhost:3000
   # For production: VITE_API_URL=https://taskmanager-backend-production-049a.up.railway.app
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Design System

### Color Palette
```css
/* Primary Colors */
--blue-600: #2563eb;      /* Primary buttons, links */
--gray-50: #f9fafb;       /* Backgrounds */
--gray-100: #f3f4f6;     /* Hover states */
--gray-200: #e5e7eb;     /* Borders */
--gray-500: #6b7280;     /* Secondary text */
--gray-900: #111827;     /* Primary text */

/* Semantic Colors */
--red-600: #dc2626;       /* Errors, destructive actions */
--green-600: #16a34a;     /* Success states */
--orange-600: #ea580c;     /* Warnings, blocked tasks */
```

### Typography Scale
```css
/* Font sizes using Tailwind */
text-xs    /* 12px - Labels, metadata */
text-sm    /* 14px - Body text, buttons */
text-base  /* 16px - Larger body text */
text-lg    /* 18px - Section headers */
text-xl    /* 20px - Page titles */
text-2xl   /* 24px - Large titles */
```

## Performance Optimizations

- **Code Splitting**: Automatic with React Router lazy loading
- **Tree Shaking**: Vite eliminates unused code
- **Asset Optimization**: Images and fonts optimized automatically
- **Bundle Analysis**: `npm run build` shows bundle sizes
- **Fast Refresh**: Instant development feedback

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

The application is deployed on Vercel with automatic deployments from `main` branch.

### Environment Variables
- **Development**: Uses local backend at `http://localhost:3000`
- **Production**: Uses Railway backend at `https://taskmanager-backend-production-049a.up.railway.app`

## Contributing

1. Fork repository
2. Create a feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request

## Code Style

- **ESLint**: Configured for consistent code style
- **Prettier**: Automatic formatting on save
- **Component Patterns**: Functional components with hooks
- **File Naming**: PascalCase for components, camelCase for utilities

## License

This project is licensed under the MIT License.
