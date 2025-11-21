import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Projects from './Projects.jsx'
import Notes from './Notes.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/notes/:projectId" element={<Notes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
