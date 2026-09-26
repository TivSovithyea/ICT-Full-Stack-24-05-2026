# Mini POS Frontend Authentication From the Beginning

Build a React frontend from public pages with no authentication to a working login, current-user profile, protected routes, and logout. Then add session persistence and token verification after refresh.

Work inside `Frontend/MiniPosSystemUI`. All `src/...` paths below are relative to that folder. The examples use this project's React, Redux Toolkit, Axios, and React Router dependencies. They assume basic familiarity with components, props, state, and async functions.

The current project already contains authentication code. Follow this lesson in a separate learning copy to reproduce the progression; do not remove working authentication from the main application just to begin the lesson. Each code block identifies whether to create, replace, or extend a file. The early store and entry point are intentionally replaced later.

For the matching Laravel implementation, use the [backend authentication guide](AUTHENTICATION_GUIDE.md), especially steps 3 through 6. This document teaches the frontend; the API must be available for real login to succeed.

## Learning checkpoints

| Stage | What you build | What you can verify |
| --- | --- | --- |
| No authentication | Public pages and links | Anyone can open Profile |
| Shared state | Redux store and Provider | Components can read `state.auth` |
| Login and current user | API functions and login form | Credentials become a token and user |
| Protected routes | Route guard | Guests are redirected to login |
| Logout | Server revocation and local cleanup | Old token no longer works |
| Refresh support | Storage and startup verification | A valid session survives refresh |

## 1 Prepare the frontend and API contract

From the workspace root:

```sh
cd Frontend/MiniPosSystemUI
npm ci
```

The project already declares `@reduxjs/toolkit`, `react-redux`, `axios`, and `react-router-dom`. If you are adapting this lesson to a different existing Vite React project that lacks them, install them in that project:

```sh
npm install @reduxjs/toolkit react-redux axios react-router-dom
```

Create or update `.env`:

```dotenv
VITE_API_URL=http://localhost:8000/api/
```

Start the frontend with `npm run dev`. Restart it whenever you change `.env`. Use the origin printed by Vite when configuring backend CORS; this is commonly `http://localhost:5173`.

The frontend expects this API:

| Request | Body or header | Successful response |
| --- | --- | --- |
| `POST /api/login` | `{ "email": "...", "password": "..." }` | `{ "token": "..." }` |
| `GET /api/current-user` | `Authorization: Bearer <token>` | `{ "id": 1, "name": "Teacher", "email": "teacher@example.com" }` |
| `POST /api/logout` | `Authorization: Bearer <token>` | Any successful 2xx response, such as 204 |

The service below also accepts a `{ "data": ... }` wrapper for login and current-user. A rejected token should return 401. Invalid form data normally returns 422. The API must allow the frontend origin and the Authorization header.

This lesson follows the project's bearer-token flow. Do not add cookie authentication options to only one side of this contract. The backend guide explains the different Sanctum design used for a first-party production SPA.

## 2 Start with public pages and no authentication

In the learning copy, begin with this simple `src/App.jsx`. It deliberately uses inline pages, so existing sidebar or profile components do not introduce authentication before the lesson does.

**File `src/App.jsx` — initial version**

```jsx
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-4">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<h1>Mini POS Home</h1>} />
          <Route path="/profile" element={<h1>Profile is public</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
```

**File `src/main.jsx` — initial version**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**Checkpoint:** Open `/profile` directly. It renders without asking for credentials. There is no shared user, no token, and no route guard. Hiding the Profile link would not prevent someone from entering its URL.

## 3 Create the authentication slice

Create `src/store/authSlice.js`. The shared authentication state has two values: the API token and the current user's public details.

**File `src/store/authSlice.js` — complete contents**

```js
import { createSlice } from '@reduxjs/toolkit'

// Redux holds the login data so every component can use it.
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    logout(state) {
      state.user = null
      state.token = null
    },
  },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
```

`loginSuccess({ user, token })` stores a successful session. `logout()` clears it. Components dispatch these actions; they do not write directly to the store. Keep passwords and form loading indicators in the login component.

## 4 Create the store and connect React

**File `src/store/store.js` — first version without persistence**

```js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
```

Registering the reducer as `auth` gives the state this shape:

```json
{
  "auth": {
    "user": null,
    "token": null
  }
}
```

Replace `src/main.jsx` with this version:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import './index.css'
import './style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
```

`Provider` gives descendant components access to the store. `useSelector` reads it, and `useDispatch` sends actions. These are the connections described in the [Redux Toolkit quick start](https://redux-toolkit.js.org/tutorials/quick-start).

**Checkpoint:** The two public pages still work. If Redux DevTools is installed, `auth.user` and `auth.token` are both `null`. Refresh still resets all in-memory state at this stage.

## 5 Create the shared Axios client

Create `src/services/api.js`. This single client will serve login and all authenticated API calls.

**File `src/services/api.js` — complete contents**

```js
import axios from 'axios'
import { store } from '../store/store.js'
import { logout } from '../store/authSlice.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { Accept: 'application/json' },
  timeout: 15000,
})

// Every API request uses the latest token from Redux.
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = store.getState().auth.token
    // An expired token logs the user out. Ignore failures from an old session.
    if (error.response?.status === 401 && token &&
        error.config?.headers.Authorization === `Bearer ${token}`) {
      store.dispatch(logout())
    }
    return Promise.reject(error)
  },
)

export default api
```

The request interceptor reads the latest token from Redux and attaches it to the request. It preserves an Authorization header supplied explicitly by the caller. That matters during login, when a new token exists but has not yet entered Redux.

The response interceptor clears the current session when a request using that session receives 401. Comparing the failed request's header with the current token avoids clearing a newer login because an older request failed. It rethrows the error so the calling page can still handle it. A network failure, 403, 422, or 500 does not trigger this interceptor's logout behavior. See [Axios interceptors](https://axios-http.com/docs/interceptors).

Keep the dependency direction as `api -> store -> authSlice`. Do not import `api` into the store or reducer; that would create a circular dependency.

## 6 Add login and current user API functions

Create `src/services/auth.js`:

**File `src/services/auth.js` — complete contents**

```js
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
```

The sequence matters:

1. Submit the email and password to `login`.
2. Extract the token from the response.
3. Use that token explicitly to request `current-user`.
4. Return `{ token, user }` to the login page.
5. Only then dispatch `loginSuccess`.

The frontend does not derive the user's name or email from the token. It requests the user from the API. If current-user fails, `loginUser` rejects and no successful session is saved. The backend may already have issued a token, so production designs should also consider token expiry and cleanup.

`response.data` is Axios's response body. If the server wraps that body in its own `data` property, the expression `response.data.data ?? response.data` unwraps it.

## 7 Create the login page

Create `src/pages/Login.jsx` using the complete example below. It uses ordinary HTML inputs so the authentication lesson does not depend on shadcn components. The project's existing styled login page can use the same logic.

```jsx
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
    <main className="mx-auto max-w-sm p-6">
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
        <button type="submit" disabled={isLoading} className="rounded border p-2">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </main>
  )
}
```

The form owns its input, error, and loading state. Redux owns the successful user and token. A successful dispatch causes the component to render `Navigate`; no second manual navigation is necessary. `replace` replaces the current browser history entry. The saved destination will become useful when the guard is added in step 9. See [React Router Navigate](https://reactrouter.com/api/components/Navigate).

## 8 Display the current user

Create `src/pages/Profile.jsx`:

**File `src/pages/Profile.jsx` — complete contents**

```jsx
import { useSelector } from 'react-redux'

export default function Profile() {
  // useSelector reads shared data from the Redux store.
  const user = useSelector((state) => state.auth.user)

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <dl className="space-y-3">
        <div>
          <dt className="text-sm text-gray-500">Name</dt>
          <dd>{user?.name || '—'}</dd>
        </div>
        <div>
          <dt className="text-sm text-gray-500">Email</dt>
          <dd>{user?.email || '—'}</dd>
        </div>
      </dl>
    </section>
  )
}
```

The profile reads the user fetched during login. It does not need a second fetch whenever the page opens. Other components, such as a header, can use the same selector. This is a snapshot of the user; edits made elsewhere will require a refetch to appear.

Replace `src/App.jsx` with this intermediate version to test login before adding protection:

```jsx
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-4">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Mini POS Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
```

**Checkpoint:** With the backend ready, sign in. In the browser Network panel, observe `POST /api/login` followed by `GET /api/current-user`. Open Profile and confirm the returned name and email. Refresh clears the session because persistence has not been added yet. Profile remains publicly reachable for now and shows placeholders when signed out.

## 9 Create the protected route

Create `src/components/ProtectedRoute.jsx`:

**File `src/components/ProtectedRoute.jsx` — complete contents**

```jsx
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const token = useSelector((state) => state.auth.token)
  const location = useLocation()

  if (!token) {
    // Remember the requested page so login can send the user back to it.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Render the nested routes when the user is logged in.
  return <Outlet />
}
```

If there is no token, the guard redirects to login and stores the attempted location. If a token exists, `Outlet` renders the matching nested page. The backend remains responsible for checking whether the token is actually valid.

Replace `src/App.jsx` with this protected version. The small layout is defined here to keep the lesson independent of the project's styled sidebar.

```jsx
import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

function LearningLayout() {
  return (
    <>
      <nav className="flex gap-4 p-4">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <main className="p-4"><Outlet /></main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<LearningLayout />}>
            <Route path="/" element={<h1>Mini POS Home</h1>} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
```

Keep `/login` outside the protected group. Putting it inside the guard would make the login page itself require login. Both the guard and layout render an `Outlet`, each for its own nested route level. See [React Router nested routing](https://reactrouter.com/start/declarative/routing).

**Checkpoint:** Refresh to clear the current in-memory session. Open `/profile?lesson=1#details`. Login should appear. After successful login, the address should return to `/profile?lesson=1#details`. The URL hash is preserved even if the sample page has no matching anchor. Opening `/login` while signed in redirects home.

## 10 Add logout

Create a reusable button in `src/components/LogoutButton.jsx`. This lesson component provides the same behavior as the existing logout handler in `AdminSidebar.jsx`.

```jsx
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../services/auth.js'
import { logout } from '../store/authSlice.js'

export default function LogoutButton() {
  const dispatch = useDispatch()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState('')

  async function handleLogout() {
    if (isLoggingOut) return
    setIsLoggingOut(true)
    setError('')

    try {
      await logoutUser()
      dispatch(logout())
    } catch {
      setError('Logout failed. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div>
      <button type="button" onClick={handleLogout} disabled={isLoggingOut}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
      {error && <p role="alert" className="text-red-600">{error}</p>}
    </div>
  )
}
```

In `src/App.jsx`, add this import:

```jsx
import LogoutButton from './components/LogoutButton.jsx'
```

Then replace only the `LearningLayout` function with:

```jsx
function LearningLayout() {
  return (
    <>
      <nav className="flex items-center gap-4 p-4">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <LogoutButton />
      </nav>
      <main className="p-4"><Outlet /></main>
    </>
  )
}
```

The server revokes the token before the UI clears its session. Clearing only Redux would leave that token usable against the API. A successful logout updates Redux, which makes the guard redirect automatically.

A network or server failure leaves the current session in place and offers a retry. A 401 for the current token clears the session through the Axios interceptor because the backend no longer accepts it.

**Checkpoint:** Log in, click Logout, and confirm that login appears. Try opening Profile directly or using Back. Both require login again. In a local API client, reuse the old token for current-user and expect 401.

## 11 Keep the session after refresh

So far, login exists only in memory. Create `src/store/authStorage.js`:

**File `src/store/authStorage.js` — complete contents**

```js
const STORAGE_KEY = 'minipos-auth'

// sessionStorage keeps the login after a refresh, in this browser tab.
export function loadAuth() {
  try {
    const auth = JSON.parse(sessionStorage.getItem(STORAGE_KEY))

    if (typeof auth?.token === 'string' && auth.token && auth.user?.id) {
      return { user: auth.user, token: auth.token }
    }
  } catch {
    // Missing, invalid, or blocked storage means we start logged out.
  }

  return { user: null, token: null }
}

export function saveAuth(auth) {
  try {
    if (auth.token) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(auth))
    } else {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Login still works in memory if the browser blocks storage.
  }
}
```

Replace `src/store/store.js` with this final version:

**File `src/store/store.js` — complete contents**

```js
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import { loadAuth, saveAuth } from './authStorage.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: loadAuth(),
  },
})

// Keep browser storage outside the reducers: reducers only update state.
store.subscribe(() => {
  saveAuth(store.getState().auth)
})
```

`preloadedState` restores the saved state when the store starts. The subscription persists subsequent login and logout changes. Storage operations stay outside reducers. When the token becomes null, `saveAuth` removes the saved entry.

`sessionStorage` normally survives refresh within a tab. It does not coordinate logout across tabs, and closing a tab does not revoke the server token. JavaScript can access browser storage, so store only the token and necessary public user details, never the password.

Complete step 12 before treating restored data as a usable session. A saved token may have expired or been revoked.

## 12 Verify the saved token and refresh current user

Create `src/components/AuthSession.jsx`:

**File `src/components/AuthSession.jsx` — complete contents**

```jsx
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../services/auth'
import { loginSuccess, logout } from '../store/authSlice'
import { store } from '../store/store'

export default function AuthSession({ children }) {
  const dispatch = useDispatch()
  const [isChecking, setIsChecking] = useState(() => Boolean(store.getState().auth.token))

  useEffect(() => {
    const token = store.getState().auth.token
    if (!token) return

    let ignore = false

    async function checkSession() {
      try {
        // After a refresh, ask the backend whether the saved token is valid.
        const user = await getCurrentUser()
        if (!ignore) dispatch(loginSuccess({ token, user }))
      } catch {
        if (!ignore) dispatch(logout())
      } finally {
        if (!ignore) setIsChecking(false)
      }
    }

    checkSession()
    return () => { ignore = true }
  }, [dispatch])

  if (isChecking) {
    return <div className="grid min-h-screen place-items-center" role="status">Checking your session…</div>
  }

  return children
}
```

Replace `src/main.jsx` with its final version:

**File `src/main.jsx` — complete contents**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import AuthSession from './components/AuthSession'
import './index.css'
import App from './App.jsx'
import './style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthSession>
        <App />
      </AuthSession>
    </Provider>
  </StrictMode>,
)
```

On startup, a saved token triggers a current-user request before the application is displayed. A successful response refreshes Redux with the server's current user details. The `ignore` flag stops a cleaned-up effect from applying its result; development Strict Mode can run an extra effect setup and cleanup cycle.

This implementation clears restored state on **any** startup verification failure, including a network failure. During normal use, the Axios interceptor clears an active session only on a matching 401. A retry screen for temporary startup network failures would be a separate enhancement.

**Checkpoint:** Sign in and refresh Profile. A session check should run, then Profile should show the user. Revoke the token on the backend and refresh again; login should appear. Logout should remove `minipos-auth` from sessionStorage.

## 13 Apply the lesson to the full Mini POS routes

Once the small learning app works, replace `src/App.jsx` with the full project route map below. It uses the existing product, category, home, and admin layout components from this repository.

**File `src/App.jsx` — complete contents**

```jsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layouts/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import CategoryList from './pages/category/CategoryList'
import CategoryCreate from './pages/category/CategoryCreate'
import CategoryEdit from './pages/category/CategoryEdit'
import ProductList from './pages/product/ProductList'
import ProductForm from './pages/product/ProductForm'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Every route inside this guard requires a login. */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/categories/create" element={<CategoryCreate />} />
            <Route path="/categories/edit/:id" element={<CategoryEdit />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/form/:id?" element={<ProductForm />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
```

The existing `AdminLayout.jsx` already renders an `Outlet`. Its sidebar already contains a logout handler. If rebuilding a pre-authentication sidebar, import the lesson's `LogoutButton` from `../LogoutButton.jsx` and render `<LogoutButton />` in the sidebar footer, replacing the old logout placeholder. Choose either that component or the inline handler; keep one logout control.

To show the current user's name in the header, import `useSelector` from `react-redux` and read `state.auth.user` inside the header component, as Profile does. Display `user?.name` in its JSX. No extra API request is necessary.

Use the shared `api` instance for protected product and category requests so they receive the token automatically. The React guard does not secure API endpoints: Laravel must protect them with `auth:sanctum` as shown in the backend guide.

## 14 Test the whole user journey

| Action | Expected result |
| --- | --- |
| Open Profile without a session | Login appears |
| Submit a wrong password | Error appears; no user or token is saved |
| Submit valid credentials | Login and current-user both succeed |
| Log in after opening a protected URL | Original pathname, query, and hash are restored |
| Open Profile | Name and email come from current-user |
| Refresh while signed in | Saved token is verified before pages render |
| Open Login while signed in | Redirect into the application |
| Click Logout | Server revokes the token; Redux and storage clear |
| Use Back after logout | Private pages remain guarded |
| Send a revoked token to current-user | Backend returns 401 |
| Fail a normal API request with 422 or 500 | Session is preserved |
| Stop the API before clicking Logout | Error appears and retry is possible |
| Stop the API before refreshing | Current startup behavior clears the saved session |

Run the frontend build from `Frontend/MiniPosSystemUI`:

```sh
npm run build
```

A successful build checks compilation, not the real API flow. Use the walkthrough above with the backend running. The existing `npm test` script points to `tests/*.test.mjs`, but that directory is absent in this checkout; do not describe it as a working authentication test suite.

### Common problems

| Symptom | Likely fix |
| --- | --- |
| Redux context error | Put Provider around every component using Redux hooks |
| Router context error | Keep Login and the guard inside BrowserRouter |
| Login returns 404 | Check `VITE_API_URL`, `/api/`, and the backend routes |
| Token is returned but login fails | Inspect the following current-user request |
| Current-user has no Authorization header | Pass the new token explicitly before Redux is updated |
| Profile is blank after login | Check the user response has `id`, `name`, and `email` |
| Guest can open a private page | Put that route inside ProtectedRoute |
| Nested page is missing | Add Outlet to its parent layout |
| Login is lost on every refresh | Check storage and the startup current-user request |
| API works in curl but fails in browser | Check CORS origin and allowed headers |
| Logout clears UI but old token still works | Revoke the token on the backend |

## 15 Explain the flow in your own words

```text
Component input state
  -> login API
  -> token
  -> current-user API
  -> Redux loginSuccess
  -> route guard allows the page
  -> Profile reads the shared user

Refresh
  -> load sessionStorage
  -> verify token with current-user
  -> show protected pages or return to login

Logout
  -> backend revokes token
  -> Redux logout
  -> sessionStorage entry removed
  -> route guard returns to login
```

You have completed the frontend lesson when you can explain why the current-user request happens before `loginSuccess`, why both React and Laravel need protection, and why logout must update both the server and browser.

