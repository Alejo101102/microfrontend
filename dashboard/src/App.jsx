import React, { useEffect, useState } from 'react'

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
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">
          {getGreeting()}{profileData ? `, ${profileData.name.split(' ')[0]}` : ''}
        </h2>
        <p className="text-slate-600">
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
        <div className={`mb-6 p-4 rounded-lg transition-all ${
          isNewUpdate 
            ? 'bg-green-100 border border-green-400 text-green-700 animate-pulse' 
            : 'bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 text-indigo-700'
        }`}>
          <p className="font-semibold">
            {isNewUpdate ? '✅ Profile Updated!' : '👋 Welcome back!'}
          </p>
          <p className="text-sm mt-1">
            {profileData.name} • {profileData.email}
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold">6</div>
          <div className="text-sm opacity-90">Active Courses</div>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow">
          <div className="text-3xl mb-2">📝</div>
          <div className="text-2xl font-bold">3</div>
          <div className="text-sm opacity-90">Upcoming Exams</div>
        </div>
        
        <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-2xl font-bold">85%</div>
          <div className="text-sm opacity-90">Average Grade</div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Announcements */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📢 Announcements
          </h3>
          <div className="space-y-3">
            {ANNOUNCEMENTS.map(announcement => (
              <div 
                key={announcement.id}
                className={`p-4 rounded-xl shadow border-l-4 ${
                  announcement.priority === 'high' 
                    ? 'bg-red-50 border-red-500' 
                    : 'bg-white border-blue-500'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{announcement.title}</h4>
                  {announcement.priority === 'high' && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                      Important
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mb-2">{announcement.message}</p>
                <p className="text-xs text-slate-500">
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
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📝 Upcoming Exams
          </h3>
          <div className="space-y-3">
            {UPCOMING_EXAMS.map(exam => (
              <div key={exam.id} className="p-4 bg-white rounded-xl shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-mono text-slate-500">{exam.code}</span>
                    <h4 className="font-semibold">{exam.course}</h4>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    {exam.type}
                  </span>
                </div>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>📅 {formatDate(exam.date)} • {exam.time}</p>
                  <p>📍 {exam.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          🎉 Upcoming Events
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EVENTS.map(event => (
            <div key={event.id} className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow">
              <h4 className="font-semibold mb-2">{event.title}</h4>
              <div className="space-y-1 text-sm text-slate-600 mb-3">
                <p>📅 {formatDate(event.date)}</p>
                <p>🕐 {event.time}</p>
                <p>📍 {event.location}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {event.tags.map((tag, idx) => (
                  <span 
                    key={idx}
                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
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