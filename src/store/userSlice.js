import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: '',
  name: '',
  email: '',
  role: '',
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.role = action.payload.role || ''
      state.isAuthenticated = true
    },
    clearUser: () => initialState
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer