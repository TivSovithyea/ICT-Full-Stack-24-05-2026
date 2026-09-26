import api from './api.js'

export async function loginUser(email, password) {
  const response = await api.post('login', { email, password })
  // Accept a plain response or a Laravel-style { data: ... } wrapper.
  const data = response.data.data ?? response.data

  if (typeof data.token !== 'string' || !data.token) {
    throw new Error('The login response must contain a token.')
  }

  // Login returns only a token, so fetch the user's details separately.
  const user = await getCurrentUser(data.token)
  return { token: data.token, user }
}

export async function getCurrentUser(token) {
  // During login the new token is not in Redux yet, so pass it explicitly.
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  const response = await api.get('current-user', config)
  const user = response.data.data ?? response.data

  if (!user?.id) {
    throw new Error('The current-user response must contain a user with an id.')
  }

  return user
}

export async function logoutUser() {
  await api.post('logout')
}
