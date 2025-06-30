// src/features/user/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

/**
 * 🔄 Action asynchrone pour récupérer le profil utilisateur
 */
export const fetchUserProfile = createAsyncThunk(
  'user/fetchUserProfile',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token
    try {
      const res = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET', // ✅ CORRECTION : GET au lieu de POST
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()

      if (res.ok) {
        return data.body
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message })
    }
  }
)

/**
 * ✏️ Action asynchrone pour mettre à jour le pseudo (userName)
 */
export const updateUsername = createAsyncThunk(
  'user/updateUsername',
  async (newUsername, thunkAPI) => {
    const token = thunkAPI.getState().auth.token
    try {
      const res = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName: newUsername }),
      })

      const data = await res.json()

      if (res.ok) {
        return data.body
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message })
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // 📦 Récupération du profil
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Erreur lors du chargement du profil'
      })

      // ✏️ Mise à jour du username
      .addCase(updateUsername.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUsername.fulfilled, (state, action) => {
        state.loading = false
        if (state.profile) {
          state.profile.userName = action.payload.userName
        }
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.payload?.message || 'Erreur lors de la mise à jour du pseudo'
      })
  },
})

export default userSlice.reducer
