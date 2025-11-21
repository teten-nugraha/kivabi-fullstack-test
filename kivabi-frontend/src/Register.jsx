import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Register.css'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ success: false, message: 'Network error' })
    }
    setLoading(false)
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Nama</label><br />
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label><br />
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Username</label><br />
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label><br />
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {result && (
        <div className={`register-message ${result.success ? 'success' : 'error'}`}>
          {result.message}
          {result.data && result.data.message && (
            <div>{result.data.message}</div>
          )}
        </div>
      )}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Link to="/login" style={{ color: '#646cff', textDecoration: 'underline' }}>
          Sudah punya akun? Login di sini
        </Link>
      </div>
    </div>
  )
}

export default Register
