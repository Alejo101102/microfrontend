import React, { useEffect, useState } from 'react'

import "./dashboard.css"

// 📊 Datos simulados del dashboard
const ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Final Exam Schedule Released',
    date: '2025-11-20',
    priority: 'high',
    message: 'Check your email for the complete exam schedule. Finals begin Dec 10.'
  },
  {
    id: 2,
    title: 'Library Hours Extended',
    date: '2025-11-18',
    priority: 'normal',
    message: 'The library will remain open until midnight during finals week.'
  },
  {
    id: 3,
    title: 'Spring 2026 Registration Opens',
    date: '2025-11-15',
    priority: 'normal',
    message: 'Registration for spring semester opens December 1st. Meet with your advisor.'
  }
]

const UPCOMING_EXAMS = [
  {
    id: 1,
    course: 'Data Structures',
    code: 'CS-301',
    date: '2025-11-30',
    time: '10:00 AM',
    room: 'Building A - Room 301',
    type: 'Midterm'
  },
  {
    id: 2,
    course: 'Database Systems',
    code: 'DB-401',
    date: '2025-12-03',
    time: '2:00 PM',
    room: 'Building B - Room 205',
    type: 'Final'
  },
  {
    id: 3,
    course: 'Web Development',
    code: 'WEB-302',
    date: '2025-12-05',
    time: '9:00 AM',
    room: 'Lab 3',
    type: 'Practical'
  }
]

const EVENTS = [
  {
    id: 1,
    title: 'Tech Hackathon 2025',
    date: '2025-12-05',
    time: '9:00 AM - 6:00 PM',
    location: 'Innovation Center',
    tags: ['Competition', 'Prizes']
  },
  {
    id: 2,
    title: 'Career Fair',
    date: '2025-12-08',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    tags: ['Networking', 'Jobs']
  },
  {
    id: 3,
    title: 'Guest Lecture: AI in Healthcare',
    date: '2025-12-12',
    time: '3:00 PM',
    location: 'Conference Hall',
    tags: ['Seminar', 'AI']
  }
]

export default function App(){
  const [profileData, setProfileData] = useState(null)
  const [isNewUpdate, setIsNewUpdate] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    // Cargar perfil guardado
    const loadProfile = () => {
      const savedName = localStorage.getItem('profileName')
      const savedEmail = localStorage.getItem('profileEmail')
      
      if (savedName && savedEmail) {
        setProfileData({ name: savedName, email: savedEmail })
      }
    }
    
    loadProfile()

    // Actualizar reloj cada minuto
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    // Escuchar actualizaciones del perfil
    const handler = (e) => {
      console.log('Profile updated:', e.detail)
      setProfileData(e.detail)
      setIsNewUpdate(true)
      
      setTimeout(() => setIsNewUpdate(false), 5000)
    }
    
    window.addEventListener('profile-updated', handler)
    
    return () => {
      window.removeEventListener('profile-updated', handler)
      clearInterval(timer)
    }
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffDays = Math.ceil((date - today) / (1000 * 60 * 60 * 24))
    
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Tomorrow'
    if (diffDays < 7) return `In ${diffDays} days`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return '🌅 Good Morning'
    if (hour < 18) return '☀️ Good Afternoon'
    return '🌙 Good Evening'
  }

  return (
    <div className="dashboard-root">
      <div className="dashboard-header">
        <h2 className="greeting-title">
          {getGreeting()}{profileData ? `, ${profileData.name.split(' ')[0]}` : ''}
        </h2>
        <p className="current-date">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {/* Banner de bienvenida personalizado */}
      {profileData && (
        <div className={isNewUpdate ? 'welcome-banner updated' : 'welcome-banner'}>
          <p className="banner-title">
            {isNewUpdate ? '✅ Profile Updated!' : '👋 Welcome back!'}
          </p>
          <p className="banner-info">
            {profileData.name} • {profileData.email}
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="stats-grid">
        <div className="stat-card stat-blue">
          <div className="stat-icon">📚</div>
          <div className="stat-number">6</div>
          <div className="stat-label">Active Courses</div>
        </div>
        
        <div className="stat-card stat-green">
          <div className="stat-icon">📝</div>
          <div className="stat-number">3</div>
          <div className="stat-label">Upcoming Exams</div>
        </div>
        
        <div className="stat-card stat-purple">
          <div className="stat-icon">🎯</div>
          <div className="stat-number">85%</div>
          <div className="stat-label">Average Grade</div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Announcements */}
        <div>
          <h3 className="section-title">
            📢 Announcements
          </h3>
          <div className="cards-list">
            {ANNOUNCEMENTS.map(announcement => (
              <div 
                key={announcement.id}
                className={announcement.priority === 'high' ? 'announcement-card high-priority' : 'announcement-card'}
              >
                <div className="announcement-header">
                  <h4 className="announcement-title">{announcement.title}</h4>
                  {announcement.priority === 'high' && (
                    <span className="priority-badge">
                      Important
                    </span>
                  )}
                </div>
                <p className="announcement-message">{announcement.message}</p>
                <p className="announcement-date">
                  {new Date(announcement.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div>
          <h3 className="section-title">
            📝 Upcoming Exams
          </h3>
          <div className="cards-list">
            {UPCOMING_EXAMS.map(exam => (
              <div key={exam.id} className="exam-card">
                <div className="exam-header">
                  <div>
                    <span className="exam-code">{exam.code}</span>
                    <h4 className="exam-title">{exam.course}</h4>
                  </div>
                  <span className="exam-type-badge">
                    {exam.type}
                  </span>
                </div>
                <div className="exam-details">
                  <p>📅 {formatDate(exam.date)} • {exam.time}</p>
                  <p>📍 {exam.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="events-section">
        <h3 className="section-title">
          🎉 Upcoming Events
        </h3>
        <div className="events-grid">
          {EVENTS.map(event => (
            <div key={event.id} className="event-card">
              <h4 className="event-title">{event.title}</h4>
              <div className="event-details">
                <p>📅 {formatDate(event.date)}</p>
                <p>🕐 {event.time}</p>
                <p>📍 {event.location}</p>
              </div>
              <div className="event-tags">
                {event.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="event-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}