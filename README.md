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


## 🛠️ Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2.0 |
| **Vite** | Build Tool & Dev Server | 5.0.0 |
| **@originjs/vite-plugin-federation** | Module Federation | 1.3.6 |
| **React Router DOM** | Routing | 6.14.1 / 7.9.6 |

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Step 1: Clone the Repository

```bash
git clone https://github.com/Alejo101102/microfrontend.git
cd microfrontend
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
npm run dev
# Runs on http://localhost:5174

# Terminal 2 - Courses
cd courses
npm run dev
# Runs on http://localhost:5175

# Terminal 3 - Profile
cd profile
npm run dev
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
│   │   └── main.css        # Global styles with animations
│   ├── vite.config.js        # Federation config (consumes remotes)
│   └── package.json
│
├── dashboard/                 # Dashboard microfrontend
│   ├── src/
│   │   ├── App.jsx           # Dashboard component with stats
│   │   ├── main.jsx          # Standalone entry
│   │   └── dashboard.css        # Dashboard-specific animations
│   ├── vite.config.js        # Federation config (exposes ./App)
│   └── package.json
│
├── courses/                   # Courses microfrontend
│   ├── src/
│   │   ├── App.jsx           # Courses with internal routing
│   │   ├── main.jsx
│   │   └── courses.css        # Course card animations
│   ├── vite.config.js        # Federation config (exposes ./App)
│   └── package.json
│
└── profile/                   # Profile microfrontend
    ├── src/
    │   ├── App.jsx           # Profile editor with localStorage
    │   ├── main.jsx
    │   └── profile.css        # Form animations
    ├── vite.config.js        # Federation config (exposes ./App)
    └── package.json
```
