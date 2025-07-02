import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loginUser } from '../features/auth/authSlice'
import { fetchUserProfile } from '../features/user/userSlice'

import userIcon from '../designs/img/user-icon.png'
import '../designs/css/main.css'
import './SignIn.css'

function SignIn() {
  const dispatch = useDispatch()
  const { loading, error, token } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // 🚀 Dès qu'on a un token, on charge le profil
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile())
    }
  }, [token, dispatch])

  // ✅ Si token + profil : redirection vers /profile
  if (token && profile) return <Navigate to="/profile" />

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email: username, password }))
  }

  return (
    <>


      <main className="main bg-dark">
        <section className="sign-in-content">
          <img
            src={userIcon}
            alt="User Icon"
            style={{ width: '40px', height: '40px', marginBottom: '10px' }}
          />
          <h1>Sign In</h1>

          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? 'Connexion...' : 'Sign In'}
            </button>

            {error && (
              <p style={{ color: 'red', marginTop: '1rem' }}>
                Erreur : {error}
              </p>
            )}
          </form>
        </section>
      </main>


    </>
  )
}

export default SignIn


