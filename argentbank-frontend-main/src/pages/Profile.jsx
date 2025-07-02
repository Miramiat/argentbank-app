import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { fetchUserProfile } from '../features/user/userSlice'
import EditNameForm from '../components/EditNameForm'
import '../designs/css/main.css'

function Profile() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { profile, loading, error } = useSelector((state) => state.user)

  const [editMode, setEditMode] = useState(false)

  // 🔄 Charger le profil utilisateur au montage
  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchUserProfile())
    }
  }, [token, profile, dispatch])

  // 🔐 Redirection si non connecté
  if (!token) return <Navigate to="/sign-in" />

  return (
    <main className="main bg-dark">
      <div className="header">
        {editMode ? (
          <EditNameForm
            currentUsername={profile?.userName || ''}
            onCancel={() => setEditMode(false)}
            onSuccess={() => setEditMode(false)}
          />
        ) : (
          <>
            <h1>
              Welcome back<br />
              {profile?.firstName} {profile?.lastName}!
            </h1>
            <p style={{ color: '#ccc' }}>
              Username: <strong>{profile?.userName}</strong>
            </p>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Name
            </button>
          </>
        )}

        {loading && <p style={{ color: '#ccc' }}>Chargement en cours...</p>}
        {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {[ // Données bancaires fictives
        {
          title: 'Argent Bank Checking (x8349)',
          amount: '$2,082.79',
          desc: 'Available Balance',
        },
        {
          title: 'Argent Bank Savings (x6712)',
          amount: '$10,928.42',
          desc: 'Available Balance',
        },
        {
          title: 'Argent Bank Credit Card (x8349)',
          amount: '$184.30',
          desc: 'Current Balance',
        }
      ].map((acc, index) => (
        <section key={index} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{acc.title}</h3>
            <p className="account-amount">{acc.amount}</p>
            <p className="account-amount-description">{acc.desc}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  )
}

export default Profile

