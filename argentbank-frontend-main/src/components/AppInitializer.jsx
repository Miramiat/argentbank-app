import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserProfile } from '../features/user/userSlice'
import { setToken } from '../features/auth/authSlice'

function AppInitializer({ children }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.user)

  useEffect(() => {
    // Charger le token du localStorage si présent au démarrage
    const storedToken = localStorage.getItem('token')
    if (storedToken && !token) {
      dispatch(setToken(storedToken))
    }
  }, [dispatch, token])

  useEffect(() => {
    // Si on a un token mais pas encore de profil, on le récupère
    if (token && !profile) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, token, profile])

  return children
}

export default AppInitializer
