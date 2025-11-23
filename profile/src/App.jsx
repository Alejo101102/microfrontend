import React, {useState} from 'react'
import './profile.css'   // ✅ Importante: agregar esto

export default function App(){

  const [name, setName] = useState(() => {
    return localStorage.getItem('profileName') || 'Juan Estudiante'
  })
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('profileEmail') || 'juan@univalle.edu.co'
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem('profileName', name)
    localStorage.setItem('profileEmail', email)

    window.dispatchEvent(new CustomEvent('profile-updated', { 
      detail: { name, email } 
    }))
    
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="profile-root">        
      
      <h2>Profile</h2>                     

      {saved && (
        <div className="saved-alert">      
          ✓ Profile saved successfully!
        </div>
      )}
      
      <div className="card">              
        
        <label>Name</label>
        <input 
          value={name} 
          onChange={e=>setName(e.target.value)} 
          className="input"               
        />
        
        <label className="mt-3">Email</label>
        <input 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          className="input"            
          type="email"
        />
        
        <div className="btn-row"> 
          
          <button 
            onClick={handleSave}
            className="btn btn-save"
          >
            Save
          </button>
          
          <button 
            onClick={() => {
              localStorage.clear()
              setName('Juan Estudiante')
              setEmail('juan@univalle.edu.co')
            }}
            className="btn btn-reset"
          >
            Reset
          </button>
        </div>
        
        <div className="storage-info">
          <p className="title">Storage Info:</p>
          <p>Data persists in browser's localStorage</p>
        </div>

      </div>
    </div>
  )
}
