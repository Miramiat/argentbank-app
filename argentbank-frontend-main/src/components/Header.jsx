import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'

import argentLogo from '../designs/img/argentBankLogo.png'
import userIcon from '../designs/img/user-icon.png'
import settingsIcon from '../designs/img/settings.png'
import logoutIcon from '../designs/img/logout.png'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={argentLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
        {!token || !profile ? (
          <Link className="main-nav-item" to="/sign-in">
            <img
              src={userIcon}
              alt="User Icon"
              title="User"
              style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
            />
            Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to="/profile">
              <img
                src={userIcon}
                alt="User Icon"
                title="Mon profil"
                style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
              />
              {profile.firstName}
            </Link>

            <span className="main-nav-item">
              <img
                src={settingsIcon}
                alt="Settings"
                title="Paramètres"
                style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
              />
            </span>

            <span
              className="main-nav-item"
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={logoutIcon}
                alt="Logout Icon"
                title="Déconnexion"
                style={{ width: '20px', marginRight: '8px', verticalAlign: 'middle' }}
              />
              Sign Out
            </span>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header
