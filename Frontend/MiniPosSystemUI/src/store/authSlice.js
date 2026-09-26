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