import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { loginUser } from '../services/auth.js'
import { loginSuccess } from '../store/authSlice.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const location = useLocation()
  const from = location.state?.from
  const destination = from
    ? `${from.pathname}${from.search || ''}${from.hash || ''}`
    : '/'

  if (token) return <Navigate to={destination} replace />

  async function handleSubmit(event) {
    event.preventDefault()
    if (isLoading) return
    setError('')
    setIsLoading(true)

    try {
      const auth = await loginUser(email.trim(), password)
      dispatch(loginSuccess(auth))
    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        'Login failed. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="mx-auto mt-10 max-w-sm p-6">
      <h1 className="mb-6 text-2xl font-semibold">Login to Mini POS</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          disabled={isLoading}
          className="rounded border p-2"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          disabled={isLoading}
          className="rounded border p-2"
        />
        {error && <p role="alert" className="text-red-600">{error}</p>}
        <button type="submit" disabled={isLoading} className="rounded border p-2 bg-green-400">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  )
}
