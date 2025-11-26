import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './Register.css'

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const navigate = typeof useNavigate === 'function' ? useNavigate() : null

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api'}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (data.success && data.data && data.data.token) {
        localStorage.setItem('token', data.data.token)
        if (navigate) {
          navigate('/projects')
        } else {
          window.location.href = '/projects'
        }
      } else {
        setResult(data)
      }
    } catch (err) {
      setResult({ success: false, message: 'Network error' })
    }
    setLoading(false)
  }

  return (
    <div className="register-container">
      <h2>Login</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Username</label><br />
          <input name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label><br />
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="register-link">
        Dont have Account? <Link to="/register">Register here</Link>
      </div>
      {result && (
        <div className={`register-message ${result.success ? 'success' : 'error'}`}>
          {result.message}
        </div>
      )}
    </div>
  )
}

export default Login
