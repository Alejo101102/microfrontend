import React, {useState, useEffect} from 'react'

export default function App(){
  // Cargar datos guardados al iniciar
  const [name, setName] = useState(() => {
    return localStorage.getItem('profileName') || 'Juan Estudiante'
  })
  const [email, setEmail] = useState(() => {
    return localStorage.getItem('profileEmail') || 'juan@univalle.edu.co'
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    // Guardar en localStorage
    localStorage.setItem('profileName', name)
    localStorage.setItem('profileEmail', email)

    window.dispatchEvent(new CustomEvent('profile-updated', { 
      detail: { name, email } 
    }))
    
    console.log('Saved to localStorage:', { name, email })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      
      {saved && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          ✓ Profile saved successfully!
        </div>
      )}
      
      <div className="p-4 bg-white rounded-xl shadow">
        <label className="block text-sm font-medium">Name</label>
        <input 
          value={name} 
          onChange={e=>setName(e.target.value)} 
          className="w-full p-2 border rounded mt-1" 
        />
        
        <label className="block text-sm font-medium mt-3">Email</label>
        <input 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          className="w-full p-2 border rounded mt-1"
          type="email"
        />
        
        <div className="mt-4 flex gap-2">
          <button 
            onClick={handleSave}
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Save
          </button>
          
          <button 
            onClick={() => {
              localStorage.clear()
              setName('Juan Estudiante')
              setEmail('juan@univalle.edu.co')
            }}
            className="px-4 py-2 rounded bg-slate-300 text-slate-700 hover:bg-slate-400"
          >
            Reset
          </button>
        </div>
        
        <div className="mt-4 p-3 bg-slate-50 rounded text-xs">
          <p className="font-medium">Storage Info:</p>
          <p className="text-slate-600">Data persists in browser's localStorage</p>
        </div>
      </div>
    </div>
  )
}