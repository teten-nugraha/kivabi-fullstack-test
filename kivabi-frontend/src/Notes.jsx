import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './Projects.css'

function Notes() {
  const { projectId } = useParams()
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newNote, setNewNote] = useState("")
  const [creating, setCreating] = useState(false)
  const [createMsg, setCreateMsg] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchNotes()
  }, [projectId])

  const fetchNotes = async () => {
    setLoading(true)
    setError(null)
    const token = localStorage.getItem('token')
    try {
      const res = await fetch(`http://localhost:8080/api/notes?projectId=${projectId}`, {
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
        setNotes(data.data)
      } else {
        setError(data.message || 'Gagal mengambil data notes')
      }
    } catch (err) {
      setError('Network error')
    }
    setLoading(false)
  }

  return (
    <div className="projects-container">
      <div className="flex justify-between items-center mb-6">
        <button className="notes-back-btn" onClick={() => navigate('/projects')}>
          ← Back to Projects
        </button>
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
      <h2 className="notes-title">Notes Project #{projectId}</h2>
      <form className="project-create-form" onSubmit={async e => {
        e.preventDefault()
        if (!newNote.trim()) return
        setCreating(true)
        setCreateMsg(null)
        const token = localStorage.getItem('token')
        try {
          const res = await fetch(`http://localhost:8080/api/notes?projectId=${projectId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: newNote })
          })
          if (res.status === 401) {
            navigate('/login')
            return
          }
          const data = await res.json()
          if (data.success) {
            setCreateMsg({ success: true, message: data.message })
            setNotes([data.data, ...notes])
            setNewNote('')
          } else {
            setCreateMsg({ success: false, message: data.message || 'Gagal membuat note' })
          }
        } catch (err) {
          setCreateMsg({ success: false, message: 'Network error' })
        }
        setCreating(false)
      }}>
        <input
          type="text"
          placeholder="Tulis catatan baru"
          value={newNote}
          onChange={e => setNewNote(e.target.value)}
          disabled={creating}
        />
        <button type="submit" disabled={creating || !newNote.trim()}>
          <span role="img" aria-label="plus">➕</span>
          {creating ? 'Membuat...' : 'Tambah Note'}
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
          {notes.length === 0 ? (
            <div className="projects-empty">Tidak ada notes ditemukan.</div>
          ) : (
            notes.map(note => (
              <div className="project-card" key={note.id}>
                <div className="project-title">Note #{note.id}</div>
                <div className="project-id">ID: {note.id}</div>
                <div className="note-content">{note.content}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default Notes
