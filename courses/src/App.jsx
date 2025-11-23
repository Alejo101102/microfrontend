import React from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'

// 📚 Base de datos simulada de cursos
const COURSES_DATA = [
  {
    id: 1,
    code: 'CS-301',
    title: 'Data Structures & Algorithms',
    professor: 'Dr. Sarah Johnson',
    schedule: 'Mon/Wed 10:00-11:30',
    credits: 4,
    enrolled: 45,
    capacity: 50,
    description: 'Advanced study of data structures including trees, graphs, and hash tables. Algorithm analysis and design patterns.',
    topics: ['Binary Trees', 'Graph Algorithms', 'Dynamic Programming', 'Sorting Algorithms']
  },
  {
    id: 2,
    code: 'DB-401',
    title: 'Database Systems',
    professor: 'Prof. Michael Chen',
    schedule: 'Tue/Thu 14:00-15:30',
    credits: 3,
    enrolled: 38,
    capacity: 40,
    description: 'Comprehensive introduction to database design, SQL, normalization, and transaction management.',
    topics: ['SQL Queries', 'Normalization', 'Indexing', 'Transaction Management']
  },
  {
    id: 3,
    code: 'WEB-302',
    title: 'Web Development',
    professor: 'Dr. Emily Rodriguez',
    schedule: 'Mon/Wed/Fri 13:00-14:00',
    credits: 4,
    enrolled: 52,
    capacity: 55,
    description: 'Modern web development using React, Node.js, and cloud deployment. Focus on full-stack applications.',
    topics: ['React Components', 'REST APIs', 'Authentication', 'Cloud Deployment']
  },
  {
    id: 4,
    code: 'ML-501',
    title: 'Machine Learning',
    professor: 'Dr. James Wilson',
    schedule: 'Tue/Thu 16:00-17:30',
    credits: 4,
    enrolled: 35,
    capacity: 40,
    description: 'Introduction to machine learning algorithms, neural networks, and practical applications using Python.',
    topics: ['Supervised Learning', 'Neural Networks', 'Deep Learning', 'Model Evaluation']
  },
  {
    id: 5,
    code: 'SEC-403',
    title: 'Cybersecurity Fundamentals',
    professor: 'Prof. Laura Martinez',
    schedule: 'Wed/Fri 15:00-16:30',
    credits: 3,
    enrolled: 42,
    capacity: 45,
    description: 'Network security, cryptography, and ethical hacking. Hands-on labs with security tools.',
    topics: ['Cryptography', 'Network Security', 'Penetration Testing', 'Security Protocols']
  },
  {
    id: 6,
    code: 'MOB-304',
    title: 'Mobile App Development',
    professor: 'Dr. David Kim',
    schedule: 'Mon/Thu 11:00-12:30',
    credits: 3,
    enrolled: 40,
    capacity: 45,
    description: 'Cross-platform mobile development using React Native. iOS and Android app creation.',
    topics: ['React Native', 'Mobile UI/UX', 'Native APIs', 'App Store Deployment']
  }
]

export default function App(){
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">📚 My Courses</h2>
      <nav className="flex gap-4 mb-4">
        <Link to="/courses" className="px-3 py-1 rounded bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
          All Courses
        </Link>
        <Link to="/courses/details/1" className="text-slate-600 hover:underline">
          View Sample
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  )
}

function List(){
  return (
    <div>
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-700">
          📅 <strong>Spring 2025</strong> • Enrolled in {COURSES_DATA.length} courses
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {COURSES_DATA.map(course => (
          <Link 
            key={course.id} 
            to={`/courses/details/${course.id}`}
            className="block"
          >
            <div className="p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-mono text-slate-500">{course.code}</span>
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                  {course.credits} credits
                </span>
              </div>
              
              <p className="text-sm text-slate-600 mb-2">
                👨‍🏫 {course.professor}
              </p>
              
              <p className="text-sm text-slate-500 mb-2">
                🕐 {course.schedule}
              </p>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">
                  {course.enrolled}/{course.capacity}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Details(){
  const { id } = useParams()
  const course = COURSES_DATA.find(c => c.id === parseInt(id))
  
  if (!course) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
        <h3 className="font-medium text-red-700">Course not found</h3>
        <Link to="/courses" className="text-sm text-red-600 hover:underline">
          ← Back to courses
        </Link>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      <Link 
        to="/courses" 
        className="inline-block text-sm text-slate-600 hover:underline mb-2"
      >
        ← Back to all courses
      </Link>
      
      <div className="p-6 bg-white rounded-xl shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-sm font-mono text-slate-500">{course.code}</span>
            <h3 className="text-2xl font-bold">{course.title}</h3>
          </div>
          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {course.credits} Credits
          </span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👨‍🏫</span>
              <div>
                <p className="text-xs text-slate-500">Professor</p>
                <p className="font-medium">{course.professor}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕐</span>
              <div>
                <p className="text-xs text-slate-500">Schedule</p>
                <p className="font-medium">{course.schedule}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <div>
                <p className="text-xs text-slate-500">Enrollment</p>
                <p className="font-medium">{course.enrolled} / {course.capacity} students</p>
              </div>
            </div>
            
            <div className="flex-1 bg-slate-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-2">📖 Course Description</h4>
          <p className="text-slate-700 leading-relaxed">{course.description}</p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-3">📚 Topics Covered</h4>
          <div className="flex flex-wrap gap-2">
            {course.topics.map((topic, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              View Syllabus
            </button>
            <button className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors">
              Course Materials
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}