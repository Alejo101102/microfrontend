import React from 'react'
import { Routes, Route, Link, useParams } from 'react-router-dom'
import './courses.css'

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
      <h2>📚 My Courses</h2>

      <nav className="nav-bar">
        <Link to="/courses" className="nav-link">
          All Courses
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
      <div className="info-banner">
        <p>
          📅 <strong>Spring 2025</strong> • Enrolled in {COURSES_DATA.length} courses
        </p>
      </div>

      <div className="courses-grid">
        {COURSES_DATA.map(course => (
          <Link 
            key={course.id}
            to={`/courses/details/${course.id}`}
            className="course-link"
          >
            <div className="course-card">

              <div className="course-card-header">
                <div>
                  <span className="course-code">{course.code}</span>
                  <h3 className="course-title">{course.title}</h3>
                </div>

                <span className="credits-badge">
                  {course.credits} credits
                </span>
              </div>

              <p className="course-professor">👨‍🏫 {course.professor}</p>
              <p className="course-schedule">🕐 {course.schedule}</p>

              <div className="course-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                  />
                </div>

                <span className="capacity-text">
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
      <div className="not-found">
        <h3>Course not found</h3>
        <Link to="/courses" className="back-link">
          ← Back to courses
        </Link>
      </div>
    )
  }

  return (
    <div className="course-detail">

      <Link to="/courses" className="back-link">
        Back to all courses
      </Link>

      <div className="detail-card">

        <div className="detail-header">
          <div>
            <span className="course-code">{course.code}</span>
            <h3 className="detail-title">{course.title}</h3>
          </div>

          <span className="credits-badge">
            {course.credits} Credits
          </span>
        </div>

        <div className="detail-grid">

          <div className="detail-item">
            <span className="info-icon">👨‍🏫</span>
            <div>
              <p className="label">Professor</p>
              <p className="value">{course.professor}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="info-icon">🕐</span>
            <div>
              <p className="label">Schedule</p>
              <p className="value">{course.schedule}</p>
            </div>
          </div>

          <div className="detail-item">
            <span className="info-icon">👥</span>
            <div>
              <p className="label">Enrollment</p>
              <p className="value">{course.enrolled} / {course.capacity}</p>
            </div>
          </div>

          <div className="progress-bar big">
            <div 
              className="progress-fill"
              style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
            />
          </div>

        </div>

        <div className="description-section">
          <h4>📖 Course Description</h4>
          <p>{course.description}</p>
        </div>

        <div className="topics-section">
          <h4>📚 Topics Covered</h4>

          <div className="topics-container">
            {course.topics.map((topic, idx) => (
              <span key={idx} className="topic-tag">
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-actions">
          <button className="course-button primary">View Syllabus</button>
          <button className="course-button secondary">Course Materials</button>
        </div>

      </div>

    </div>
  )
}
