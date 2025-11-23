import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './main.css'

const DashboardRemote = React.lazy(() => import('dashboard/App'))
const CoursesRemote = React.lazy(() => import('courses/App'))
const ProfileRemote = React.lazy(() => import('profile/App'))

function Shell() {
  return (
    <BrowserRouter>
      <div className="shell-container">
        <nav className="nav">
          <h1 className="nav-title">CampusHub</h1>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/courses" className="nav-link">Courses</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
        </nav>
        <main className="main">
          <React.Suspense fallback={<div className="loading-message">Loading remote…</div>}>
            <Routes>
              <Route path="/" element={<DashboardRemote />} />
              <Route path="/courses/*" element={<CoursesRemote />} />
              <Route path="/profile/*" element={<ProfileRemote />} />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<Shell />)