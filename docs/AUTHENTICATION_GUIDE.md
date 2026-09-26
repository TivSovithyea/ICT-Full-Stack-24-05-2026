# Mini POS Authentication Build Guide

Build login, logout, and protected routes for the Mini POS application using Laravel Sanctum, React, Redux Toolkit, and React Router. By the end, a guest will be redirected to login, a signed-in user will return to the requested page, and logout will revoke the API token and clear the browser session.

For a frontend lesson that begins with public pages and no authentication, follow [Mini POS Frontend Authentication From the Beginning](FRONTEND_AUTHENTICATION_GUIDE.md). It includes complete files and checkpoints for login, current user, protected routes, logout, and refresh persistence.

This lesson follows the existing frontend's bearer-token design. Laravel recommends cookie-based Sanctum authentication for a first-party production SPA; that uses a different login and CSRF flow. See [Sanctum authentication](https://laravel.com/docs/13.x/sanctum#spa-authentication). Keep this lesson's token flow consistent throughout.

## 1 Understand the starting point

The project folders are:

```text
Backend/MiniPosSystemAPI       Laravel API
Frontend/MiniPosSystemUI       React application
```

The React authentication files already exist. Use the frontend steps below to understand or reproduce them. The backend steps are additions to make the frontend work end to end.

| Part | Current state | Work in this lesson |
| --- | --- | --- |
| Sanctum package and token migration | Present | Run pending migrations |
| User model | No `HasApiTokens` trait | Enable issuing tokens |
| Login, current user, logout API | Missing | Add a controller and routes |
| Product, category, brand, order API routes | Public | Add authentication middleware |
| Redux, login page, route guard, logout UI | Present | Trace their connections |
| Refresh persistence and API interceptors | Present | Verify restored and revoked sessions |

Authentication answers “Who is signed in?” Authorization answers “What can this person do?” This lesson requires login for all admin pages and API resources. It does not implement staff roles or administrator-only permissions.

## 2 Follow the request flow

```text
Login form
  -> POST /api/login with email and password
  <- token
  -> GET /api/current-user with Bearer token
  <- user
  -> dispatch(loginSuccess({ user, token }))
  -> Redux updates and sessionStorage is saved
  -> ProtectedRoute renders the requested page

Logout button
  -> POST /api/logout with Bearer token
  -> Laravel deletes that token
  -> dispatch(logout()) clears Redux and sessionStorage
  -> ProtectedRoute redirects to /login
```

The route guard controls what React displays. Laravel must independently reject requests without a valid token, including requests made outside the browser.

## 3 Prepare the application

Use PHP and Composer versions compatible with `composer.lock`, and Node and npm versions compatible with the frontend lockfile. The backend manifest declares PHP `^8.3`; development dependencies may require a newer version. Let Composer's platform check identify the requirements of the installed package set.

From the workspace root:

```sh
cd Backend/MiniPosSystemAPI
composer install
composer check-platform-reqs
```

For a new local installation only, copy `.env.example` to `.env`, configure an existing local development database, and generate the application key. Preserve an existing `.env` and application key.

```sh
# New local installation only
cp .env.example .env
php artisan key:generate
```

The supplied example uses MySQL. Set `DB_DATABASE`, `DB_USERNAME`, and `DB_PASSWORD` for your own development database before continuing.

```sh
php artisan migrate
php artisan db:seed --class=UserSeeder
```

The user seeder creates fictional staff accounts without requiring the full product catalog. For a newly created account, use:

```text
Email:    sokha@twpcstore.example
Password: TWPC-demo-2026!
```

Existing accounts are preserved, including their passwords. These credentials are development fixtures.

In another terminal, from the workspace root:

```sh
cd Frontend/MiniPosSystemUI
npm ci
```

Create or update the frontend `.env` entry:

```dotenv
VITE_API_URL=http://localhost:8000/api/
```

Use `localhost` consistently and restart Vite after changing this value. The frontend already declares the necessary authentication dependencies; no additional frontend packages are needed.

## 4 Enable tokens on the User model

Edit `Backend/MiniPosSystemAPI/app/Models/User.php`.

Add this import:

```php
use Laravel\Sanctum\HasApiTokens;
```

Update the trait line inside the existing class:

```php
use HasApiTokens, HasFactory, Notifiable;
```

Keep the existing fillable attributes, hidden password fields, and password cast. `HasApiTokens` provides the token methods used below. See [Sanctum token issuance](https://laravel.com/docs/13.x/sanctum#issuing-api-tokens).

## 5 Create the authentication controller

From `Backend/MiniPosSystemAPI`:

```sh
php artisan make:controller AuthController
```

Put the following in `app/Http/Controllers/AuthController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid email or password.',
            ], 401);
        }

        $token = $user->createToken(
            'minipos-browser',
            ['*'],
            now()->addHours(8),
        )->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function currentUser(Request $request)
    {
        return response()->json(
            $request->user()->only(['id', 'name', 'email']),
        );
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}
```

The same error message covers an unknown email and a wrong password. Return only the user fields the frontend needs. The eight-hour token lifetime is a lesson choice, and the logout method revokes the token used for that request. It does not log out every device. This method assumes the bearer-token flow used in this lesson.

## 6 Protect the backend routes

Replace the active route definitions in `Backend/MiniPosSystemAPI/routes/api.php` with the following. Move the existing resource routes into the protected group; do not leave duplicate public routes outside it.

```php
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/current-user', [AuthController::class, 'currentUser']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::apiResource('products', ProductController::class);
    Route::apiResource('brands', BrandController::class);
    Route::post('/orders', [OrderController::class, 'save']);
});
```

Laravel already registers this file with the `/api` prefix in `bootstrap/app.php`. Do not add `/api` again to each route. The example limits login requests to five per minute per throttle key; a classroom sharing an IP may reach that limit quickly. See [Laravel route rate limiting](https://laravel.com/docs/13.x/routing#rate-limiting).

Check the route list, then start the API:

```sh
php artisan optimize:clear
php artisan route:list --path=api -v
php artisan serve --host=localhost --port=8000
```

Protected routes should show `auth:sanctum`. A guest requesting one with `Accept: application/json` should receive HTTP 401.

### API contract

| Method and endpoint | Request | Success response |
| --- | --- | --- |
| `POST /api/login` | JSON email and password | `200 { "token": "..." }` |
| `GET /api/current-user` | Bearer token | `200 { "id": 1, "name": "...", "email": "..." }` |
| `POST /api/logout` | Bearer token | `204` with no body |

Invalid input returns 422, invalid credentials or tokens return 401, and excessive login attempts return 429. The existing frontend accepts these successful response shapes.

### Allow the local frontend origin

If browser requests fail CORS checks, publish Laravel's CORS configuration from the backend directory:

```sh
php artisan config:publish cors
```

In `config/cors.php`, configure the relevant values for this bearer-token lesson:

```php
'paths' => ['api/*'],
'allowed_methods' => ['*'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['Accept', 'Authorization', 'Content-Type'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => false,
```

Use the actual origin printed by Vite if its port differs, then run `php artisan config:clear`. This flow sends a bearer header and does not need Axios `withCredentials` or a CSRF-cookie request. See [Laravel CORS configuration](https://laravel.com/docs/13.x/routing#cross-origin-resource-sharing-cors).

## 7 Build the shared authentication state

All paths in this section are relative to `Frontend/MiniPosSystemUI`.

Read `src/store/authSlice.js` first. Its state contains `user` and `token`. `loginSuccess` saves both values; `logout` sets both to `null`.

```js
loginSuccess(state, action) {
  state.user = action.payload.user
  state.token = action.payload.token
},
logout(state) {
  state.user = null
  state.token = null
},
```

Next, read `src/store/store.js`. Registering the reducer under `auth` makes the data available through `state.auth`. The store restores data using `loadAuth()` and subscribes to updates using `saveAuth()`.

`src/main.jsx` makes the store available to the whole component tree:

```jsx
<Provider store={store}>
  <AuthSession>
    <App />
  </AuthSession>
</Provider>
```

Use `useSelector` to read state and `useDispatch` to send actions. Keep passwords, form errors, and loading indicators in local component state. See the [Redux Toolkit quick start](https://redux-toolkit.js.org/tutorials/quick-start).

## 8 Connect Axios to the current token

Read `src/services/api.js`. It creates one Axios instance using `VITE_API_URL` and adds the latest Redux token to each request:

```js
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

Reading the token at request time avoids capturing an old value. Preserving an explicitly supplied header allows login to fetch the current user before the new token enters Redux.

The response interceptor clears authentication on a 401 only when the failed request used the current token. This prevents an old request's failure from logging out a newer session. Normal API failures such as 422 or 500 do not clear the active session through this interceptor.

Use this shared `api` instance in protected pages. A separate Axios instance or plain `fetch` call will not automatically inherit its token handling.

## 9 Implement the login sequence

Read `src/services/auth.js`. Its `loginUser(email, password)` function:

1. Sends credentials with `api.post('login', { email, password })`.
2. Extracts and validates the returned token.
3. Calls `getCurrentUser(token)` with an explicit Authorization header.
4. Returns `{ token, user }` only after the user request succeeds.

Read `src/pages/Login.jsx` next. Its submit handler prevents the default form submission, blocks duplicate submissions, and performs:

```js
const auth = await loginUser(email.trim(), password)
dispatch(loginSuccess(auth))
```

A failure appears in the form and leaves the user able to retry. A successful dispatch causes the component to render a redirect. The destination preserves the requested pathname, query string, and hash:

```jsx
const from = location.state?.from
const destination = from
  ? `${from.pathname}${from.search || ''}${from.hash || ''}`
  : '/'

if (token) return <Navigate to={destination} replace />
```

The page also redirects already signed-in users who open `/login`.

## 10 Protect React routes

The complete guard in `src/components/ProtectedRoute.jsx` is:

```jsx
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function ProtectedRoute() {
  const token = useSelector((state) => state.auth.token)
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
```

`Navigate` redirects a guest and remembers the attempted location. `Outlet` renders the matching child route for a signed-in user. See [Navigate](https://reactrouter.com/api/components/Navigate) and [Outlet](https://reactrouter.com/api/components/Outlet).

In `src/App.jsx`, keep `/login` outside the guard and nest the admin pages inside it. The following is a shortened example of the existing route structure, not a replacement for the full file:

```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route element={<ProtectedRoute />}>
    <Route element={<AdminLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
  </Route>
</Routes>
```

Keep the category routes and product form routes in that same group. `AdminLayout` must also render an `Outlet` for its child pages.

## 11 Restore login after refresh

`src/store/authStorage.js` stores `{ user, token }` under the `minipos-auth` sessionStorage key. The store restores it when the application starts. A malformed value is treated as logged out, and blocked storage still permits an in-memory login.

`src/components/AuthSession.jsx` then verifies a restored token with `GET /api/current-user`. While it waits, it shows “Checking your session…” and does not render the application. Success updates the user; failure clears the session.

There is an intentional difference between startup and later requests in the current code: **any startup verification failure**, including a network failure, clears the restored session. The Axios interceptor clears an active session only on a matching 401. A future improvement could offer a retry screen when startup fails because the API is temporarily unavailable.

Session storage survives refresh within a tab. Clearing it locally does not revoke a token on the server, and closing a tab is not a server logout. Never store the password there.

## 12 Revoke the token on logout

`src/services/auth.js` sends the logout request through the shared Axios instance:

```js
export async function logoutUser() {
  await api.post('logout')
}
```

The handler in `src/components/layouts/AdminSidebar.jsx` waits for server success before clearing local authentication:

```js
try {
  await logoutUser()
  dispatch(logout())
} catch {
  setLogoutError('Logout failed. Please try again.')
}
```

The full handler also disables repeated clicks and resets its loading state. When Redux clears, the store subscription removes sessionStorage and the route guard redirects to login. On a network or server failure, the UI keeps the session and offers retry. If the API returns 401 for the current token, the interceptor clears it because the server no longer accepts it.

## 13 Verify the completed flow

Start the frontend from `Frontend/MiniPosSystemUI`:

```sh
npm run dev
```

Complete these checks after implementing the backend steps:

| Check | Expected result |
| --- | --- |
| Open `/profile?lesson=1` while logged out | Redirect to login |
| Submit a wrong password | Error message and no authenticated Redux state |
| Submit correct credentials | Login request followed by current-user request |
| Finish login from the protected URL | Return to `/profile?lesson=1` |
| Open `/login` while signed in | Redirect into the application |
| Refresh a protected page | Session check, then the page |
| Click logout | Logout returns 204; storage clears; login appears |
| Use Back or reopen `/products` after logout | Login is required |
| Reuse the revoked token in an API client | API returns 401 |
| Request products without a token | API returns 401 |
| Stop the API and attempt logout | Error and retry remain available |
| Refresh while the API is stopped | Current startup behavior clears the saved session |

Use an API client such as curl to confirm server protection independently of React:

```sh
# Must return 401 after the protected route group is added
curl -i http://localhost:8000/api/products \
  -H 'Accept: application/json'

# Development fixture login
curl -i http://localhost:8000/api/login \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{"email":"sokha@twpcstore.example","password":"TWPC-demo-2026!"}'
```

Use the returned token as a temporary value in your local API client. First call `GET /api/current-user`, then `POST /api/logout`, then repeat the current-user request. Expect 200, 204, and 401 respectively. Do not commit tokens to source files.

Run `npm run build` from the frontend directory to check compilation. The current package has an `npm test` script referring to `tests/*.test.mjs`, but that test directory is absent in this checkout. Add actual tests before treating that command as evidence of authentication coverage. Existing backend seeder tests do not test this login flow either.

For backend automated coverage, add feature tests for valid login, invalid credentials, missing fields, authenticated current-user, guests rejected from each resource, logout token deletion, and rejection of the revoked token. Use an isolated test database. For frontend coverage, test redirects, preserved destinations, startup verification, logout retry, and a stale request returning 401 after a newer login.

## 14 Troubleshoot by symptom

| Symptom | Check |
| --- | --- |
| Login returns 404 | Controller route exists; base URL ends in `/api/`; route cache is cleared |
| `createToken` is undefined | `HasApiTokens` import and trait are added to `User` |
| Token table does not exist | Run migrations against the database configured in `.env` |
| Correct demo credentials return 401 | UserSeeder ran; an existing account may retain a different password |
| Login returns a token but the form still fails | Inspect the following current-user request and its Bearer header |
| Browser reports a CORS error | Exact frontend origin, allowed headers, API path, and backend availability |
| Requests return 429 | Wait for the login throttle window to reset |
| Login disappears on refresh | Inspect current-user response, sessionStorage, and API availability |
| Private pages appear but API calls fail | Use the shared Axios instance and verify the backend token |
| Admin layout is visible but its page is blank | Ensure the layout renders an `Outlet` |

## 15 Finish the lesson

The lesson is complete when a guest cannot read protected API resources, valid credentials open the requested React page, refresh verifies the saved token, and logout makes the old token unusable.

For a production extension, use HTTPS, choose the appropriate Sanctum session design, and add server-side policies for staff permissions. Redux state and browser storage can be modified by the user; they are never proof of permission. See [Laravel authorization](https://laravel.com/docs/13.x/authorization).

### Project reading order

1. `Backend/MiniPosSystemAPI/app/Models/User.php`
2. `Backend/MiniPosSystemAPI/app/Http/Controllers/AuthController.php` after creating it
3. `Backend/MiniPosSystemAPI/routes/api.php`
4. `Frontend/MiniPosSystemUI/src/store/authSlice.js`
5. `Frontend/MiniPosSystemUI/src/store/authStorage.js` and `store.js`
6. `Frontend/MiniPosSystemUI/src/services/api.js` and `auth.js`
7. `Frontend/MiniPosSystemUI/src/pages/Login.jsx`
8. `Frontend/MiniPosSystemUI/src/components/ProtectedRoute.jsx` and `src/App.jsx`
9. `Frontend/MiniPosSystemUI/src/components/AuthSession.jsx` and `src/main.jsx`
10. `Frontend/MiniPosSystemUI/src/components/layouts/AdminSidebar.jsx`
