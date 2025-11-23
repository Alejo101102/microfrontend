import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './styles.css'

const DashboardRemote = React.lazy(() => import('dashboard/App'))
const CoursesRemote = React.lazy(() => import('courses/App'))
const ProfileRemote = React.lazy(() => import('profile/App'))

function Shell() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white shadow p-4 flex gap-4 items-center">
          <h1 className="text-xl font-bold">CampusHub</h1>
          <Link to="/" className="text-slate-600 hover:underline">Home</Link>
          <Link to="/courses" className="text-slate-600 hover:underline">Courses</Link>
          <Link to="/profile" className="text-slate-600 hover:underline">Profile</Link>
        </nav>
        <main className="p-6">
          <React.Suspense fallback={<div>Loading remote…</div>}>
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
