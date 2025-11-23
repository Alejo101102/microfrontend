# CampusHub - Microfrontend Architecture Demo

## 📋 Project Overview

CampusHub is a student portal application built using **microfrontend architecture**, demonstrating how large-scale applications can be decomposed into smaller, independently deployable modules. This project serves as a practical implementation of microfrontend patterns for educational purposes.

---

## 🏗️ Architecture

### Microfrontends Structure

This application consists of 4 independent applications:

1. **Container (Shell) - Port 5173**
   - Orchestrates all microfrontends
   - Handles global routing and navigation
   - Lazy loads remote modules

2. **Dashboard - Port 5174**
   - Student dashboard with announcements, exams, and events
   - Displays personalized welcome message from profile data
   - Listens to profile updates via custom events

3. **Courses - Port 5175**
   - Course listing and details
   - Internal routing for course navigation
   - Demonstrates nested routes within microfrontends

4. **Profile - Port 5176**
   - User profile management
   - Data persistence using localStorage
   - Broadcasts updates to other microfrontends

### Communication Pattern

```
Profile (5176)
    |
    | dispatches 'profile-updated' event
    ↓
Dashboard (5174)
    |
    | listens and updates UI
    ↓
Container (5173) - Routes between all modules
```

---

## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **Vite** | Build Tool & Dev Server | 5.0.0 |
| **@originjs/vite-plugin-federation** | Module Federation | 1.3.6 |
| **React Router DOM** | Routing | 6.14.1 / 7.9.6 |
| **TailwindCSS** | Styling | 3.0.0 |

### Why Vite Module Federation?

- ✅ Fast build times compared to Webpack
- ✅ Modern ESM-based approach
- ✅ Excellent developer experience
- ✅ Native support for React and modern frameworks
- ✅ Smaller bundle sizes

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd campushub-microfrontends
```

### Step 2: Install Dependencies

Install dependencies for all applications:

```bash
# Container
cd container
npm install

# Dashboard
cd ../dashboard
npm install

# Courses
cd ../courses
npm install

# Profile
cd ../profile
npm install
```

### Step 3: Build Remote Microfrontends

⚠️ **IMPORTANT**: Each remote microfrontend must be built before running the container.

```bash
# Dashboard
cd dashboard
npm run build

# Courses
cd ../courses
npm run build

# Profile
cd ../profile
npm run build
```

### Step 4: Start All Applications

Open **4 separate terminal windows** and run:

```bash
# Terminal 1 - Dashboard
cd dashboard
npm run preview
# Runs on http://localhost:5174

# Terminal 2 - Courses
cd courses
npm run preview
# Runs on http://localhost:5175

# Terminal 3 - Profile
cd profile
npm run preview
# Runs on http://localhost:5176

# Terminal 4 - Container (Host Application)
cd container
npm run dev
# Runs on http://localhost:5173
```

### Step 5: Access the Application

- **Main Application**: http://localhost:5173
- **Dashboard Remote**: http://localhost:5174
- **Courses Remote**: http://localhost:5175
- **Profile Remote**: http://localhost:5176

> **Note**: Accessing remote URLs directly (5174, 5175, 5176) will show standalone versions without the container shell. This is expected behavior.

---

## 📁 Project Structure

```
campushub-microfrontends/
│
├── container/                 # Host application (Shell)
│   ├── src/
│   │   ├── main.jsx          # Entry point with Router
│   │   └── styles.css        # Global styles with animations
│   ├── vite.config.js        # Federation config (consumes remotes)
│   ├── package.json
│   └── tailwind.config.js
│
├── dashboard/                 # Dashboard microfrontend
│   ├── src/
│   │   ├── App.jsx           # Dashboard component with stats
│   │   ├── main.jsx          # Standalone entry
│   │   └── styles.css        # Dashboard-specific animations
│   ├── vite.config.js        # Federation config (exposes ./App)
│   ├── package.json
│   └── tailwind.config.js
│
├── courses/                   # Courses microfrontend
│   ├── src/
│   │   ├── App.jsx           # Courses with internal routing
│   │   ├── main.jsx
│   │   └── styles.css        # Course card animations
│   ├── vite.config.js        # Federation config (exposes ./App)
│   ├── package.json
│   └── tailwind.config.js
│
└── profile/                   # Profile microfrontend
    ├── src/
    │   ├── App.jsx           # Profile editor with localStorage
    │   ├── main.jsx
    │   └── styles.css        # Form animations
    ├── vite.config.js        # Federation config (exposes ./App)
    ├── package.json
    └── tailwind.config.js
```

---

## 🎯 Key Features Demonstrated

### ✅ Independent Deployments

Each microfrontend can be:
- Developed independently by different teams
- Built and deployed separately
- Updated without affecting other modules
- Scaled independently based on traffic

### ✅ Module Federation

Uses Vite's Module Federation plugin to:
- Share dependencies (React, React-DOM) across microfrontends
- Load remote modules dynamically at runtime
- Avoid dependency duplication
- Reduce overall bundle size

### ✅ Routing Integration

- **Centralized routing**: Container manages top-level routes
- **Nested routes**: Courses has internal sub-routes (`/courses/details/:id`)
- **Clean URLs**: Navigation works seamlessly
- **Browser history**: Back/forward buttons work correctly

### ✅ Inter-Microfrontend Communication

- **Custom Events**: Profile dispatches `profile-updated` event
- **Event Listeners**: Dashboard listens and updates UI in real-time
- **LocalStorage**: Persistent data storage across sessions
- **Loose Coupling**: Microfrontends remain independent

### ✅ Enhanced UI/UX

- **Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Loading States**: Proper feedback during remote loading
- **Visual Hierarchy**: Clear information architecture

---

## 🏆 Microfrontend Benefits (Demonstrated)

### 1. **Team Autonomy**
- Each team can work on their microfrontend independently
- Different teams can use different development approaches
- No merge conflicts between teams
- Parallel development accelerates delivery

### 2. **Independent Deployments**
- Update Profile without redeploying Dashboard or Courses
- Faster release cycles
- Reduced deployment risk
- Easy rollbacks for individual modules

### 3. **Technology Flexibility**
- Each microfrontend could use different React versions (with careful management)
- Easy to migrate or experiment with new technologies
- Legacy and modern code can coexist
- Gradual modernization path

### 4. **Scalability**
- Add new microfrontends without touching existing code
- Scale teams horizontally
- Distribute workload across multiple teams
- Independent performance optimization

### 5. **Faster Build Times**
- Each microfrontend builds independently
- Parallel builds reduce overall build time
- Only rebuild what changed
- Efficient CI/CD pipelines

---

## ⚠️ Challenges & Solutions

### Challenge 1: Multiple Router Instances

**Problem**: Each microfrontend initially had `<BrowserRouter>`, causing "Cannot render Router inside Router" error.

**Solution**: 
- Centralized routing in the Container
- Remote microfrontends use only `<Routes>` and `<Route>`
- Container manages all navigation

```jsx
<Routes>...</Routes>
```

### Challenge 2: Build Process Complexity

**Problem**: Vite Module Federation doesn't generate `remoteEntry.js` in dev mode.

**Solution**:
- Build remotes first: `npm run build`
- Serve with preview: `npm run preview`
- Container runs in dev mode for hot reload

### Challenge 3: Shared Dependencies Management

**Problem**: Risk of dependency version conflicts and duplication.

**Solution**:
- Configure `shared` in federation config
- Align dependency versions across all microfrontends
- Use `package.json` to enforce version consistency

```javascript
// vite.config.js
shared: ['react', 'react-dom', 'react-router-dom']
```

### Challenge 4: Communication Between Microfrontends

**Problem**: How to share data between independent modules without tight coupling?

**Solution**:
- Custom Events for real-time updates
- LocalStorage for persistent data
- Event-driven architecture maintains independence

```javascript
// Profile dispatches
window.dispatchEvent(new CustomEvent('profile-updated', { 
  detail: { name, email } 
}))

// Dashboard listens
window.addEventListener('profile-updated', handler)
```

---

## 🧪 Testing the Application

### Test Scenario 1: Independent Deployment

1. Update only the Profile microfrontend code
2. Run `npm run build` in the profile directory
3. Restart preview: `npm run preview`
4. Container automatically picks up changes
5. Dashboard and Courses remain unaffected

### Test Scenario 2: Inter-Microfrontend Communication

1. Navigate to Profile
2. Change name and email
3. Click "Save"
4. Navigate back to Dashboard
5. See updated profile data with green animation

### Test Scenario 3: Routing

1. Navigate to `/courses`
2. Click any course card
3. URL changes to `/courses/details/:id`
4. View detailed course information
5. Browser back button works correctly

### Test Scenario 4: Data Persistence

1. Update profile and save
2. Refresh the browser (F5)
3. Navigate to Dashboard
4. Profile data persists (localStorage)

---

## 🌐 Real-World Examples

Companies successfully using microfrontends:

| Company | Use Case | Scale |
|---------|----------|-------|
| **Spotify** | Multiple teams, feature teams own microfrontends | 1000+ developers |
| **IKEA** | E-commerce platform with independent checkout, catalog | Global scale |
| **Zalando** | Fashion e-commerce, product pages, checkout | Multi-region |
| **DAZN** | Sports streaming, player, schedule, payments | High traffic |
| **Amazon** | Product pages, checkout, recommendations | Massive scale |

---

## 📚 Configuration Details

### Container vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'container',
      remotes: {
        dashboard: 'http://localhost:5174/assets/remoteEntry.js',
        courses: 'http://localhost:5175/assets/remoteEntry.js',
        profile: 'http://localhost:5176/assets/remoteEntry.js'
      },
      shared: ['react','react-dom','react-router-dom']
    })
  ],
  build: {
    target: 'esnext'  // Required for top-level await
  },
  server: { port: 5173 }
})
```

### Remote vite.config.js (Dashboard, Courses, Profile)

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'dashboard',  // Unique name per remote
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.jsx'  // Expose component
      },
      shared: ['react','react-dom']
    })
  ],
  build: {
    target: 'esnext',      // Support modern JS features
    minify: false,         // Easier debugging
    cssCodeSplit: false    // Single CSS bundle
  },
  server: { port: 5174 }  // Unique port per remote
})
```

---

