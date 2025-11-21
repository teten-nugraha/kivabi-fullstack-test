import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Projects.css'

function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newProject, setNewProject] = useState('')
  const [creating, setCreating] = useState(false)
  const [createMsg, setCreateMsg] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    setError(null)
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('http://localhost:8080/api/projects', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (res.status === 401) {
        navigate('/login')
        return
      }
      const data = await res.json()
      if (data.success) {
        setProjects(data.data)
      } else {
        setError(data.message || 'Gagal mengambil data project')
      }
    } catch (err) {
      setError('Network error')
    }
    setLoading(false)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newProject.trim()) return
    setCreating(true)
    setCreateMsg(null)
    const token = localStorage.getItem('token')
    try {
      const res = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newProject })
      })
      if (res.status === 401) {
        navigate('/login')
        return
      }
      const data = await res.json()
      if (data.success) {
        setCreateMsg({ success: true, message: data.message })
        setProjects([data.data, ...projects])
        setNewProject('')
      } else {
        setCreateMsg({ success: false, message: data.message || 'Gagal membuat project' })
      }
    } catch (err) {
      setCreateMsg({ success: false, message: 'Network error' })
    }
    setCreating(false)
  }

  return (
    <div className="projects-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="notes-title flex items-center gap-2">
          <span role="img" aria-label="folder">📁</span> Projects List
        </h2>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
          onClick={() => {
            localStorage.removeItem('token')
            navigate('/login')
          }}
        >
          Logout
        </button>
      </div>
      <form className="project-create-form" onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Nama project baru"
          value={newProject}
          onChange={e => setNewProject(e.target.value)}
          disabled={creating}
        />
        <button type="submit" disabled={creating || !newProject.trim()}>
          <span role="img" aria-label="plus">➕</span>
          {creating ? 'Membuat...' : 'Buat Project'}
        </button>
      </form>
      {createMsg && (
        <div className={`project-create-msg ${createMsg.success ? 'success' : 'error'}`}>
          {createMsg.message}
        </div>
      )}
      {loading && <div className="projects-loading">Loading...</div>}
      {error && <div className="projects-error">{error}</div>}
      {!loading && !error && (
        <div className="projects-list">
          {projects.length === 0 ? (
            <div className="projects-empty">Tidak ada project ditemukan.</div>
          ) : (
            projects.map(project => (
              <div className="project-card" key={project.id}>
                <div className="project-title">{project.name}</div>
                <div className="project-id">ID: {project.id}</div>
                <Link to={`/notes/${project.id}`} className="project-notes-link">
                  <span role="img" aria-label="notes">📝</span> Lihat Notes
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Projects
