import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import SubjectPage from './pages/Subject'
import ProtectedRoute from './components/ProtectedRoute'


export default function App() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u); if (!u) navigate('/login')
    });
    return () => unsub()
  }, [])
  async function handleSignOut() { await signOut(auth); setUser(null); navigate('/login') }
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={(u) => { setUser(u); navigate('/') }} />} />
      <Route path="/" element={<ProtectedRoute user={user}><Dashboard user={user} onSignOut={handleSignOut} onOpenSubject={(s) => navigate('/subject/' + s.id)} /></ProtectedRoute>} />
      <Route path="/subject/:id" element={<ProtectedRoute user={user}><SubjectPage user={user} subjectId={window.location.pathname.split('/').pop()} onBack={() => navigate('/')} /></ProtectedRoute>} />
    </Routes>
  )
}