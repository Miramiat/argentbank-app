import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { fetchUserProfile, updateUsername } from '../features/user/userSlice'
import '../designs/css/main.css'

function Profile() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { profile, loading, error } = useSelector((state) => state.user)

  const [editMode, setEditMode] = useState(false)
  const [newUsername, setNewUsername] = useState('')
  const [message, setMessage] = useState('')

  // 🧠 Toujours appeler les hooks avant tout `return`
  useEffect(() => {
    if (token && !profile) {
      dispatch(fetchUserProfile())
    }
  }, [token, profile, dispatch])

  useEffect(() => {
    if (profile?.userName) {
      setNewUsername(profile.userName)
    }
  }, [profile])

  const handleSave = async () => {
    if (!newUsername.trim()) return
    const result = await dispatch(updateUsername(newUsername))
    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('✅ Pseudo mis à jour avec succès.')
    } else {
      setMessage('❌ Erreur lors de la mise à jour.')
    }
    setEditMode(false)
  }

  // ✅ Redirection conditionnelle placée après les hooks
  if (!token) return <Navigate to="/sign-in" />

  return (
    <main className="main bg-dark">
      <div className="header">
        {editMode ? (
          <>
            <h1>Edit Username</h1>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="New username"
              style={{
                padding: '8px',
                fontSize: '1rem',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
            <br /><br />
            <button className="edit-button" onClick={handleSave}>Save</button>
            <button className="edit-button" onClick={() => setEditMode(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h1>
              Welcome back<br />
              {profile?.firstName} {profile?.lastName}!
            </h1>
            <p style={{ color: '#ccc' }}>Username: <strong>{profile?.userName}</strong></p>
            <button className="edit-button" onClick={() => setEditMode(true)}>
              Edit Name
            </button>
          </>
        )}

        {message && <p style={{ marginTop: '1rem', color: '#00bc77' }}>{message}</p>}
        {loading && <p style={{ color: '#ccc' }}>Chargement en cours...</p>}
        {error && <p style={{ color: 'red' }}>Erreur : {error}</p>}
      </div>

      <h2 className="sr-only">Accounts</h2>

      {[{
        title: 'Argent Bank Checking (x8349)',
        amount: '$2,082.79',
        desc: 'Available Balance'
      }, {
        title: 'Argent Bank Savings (x6712)',
        amount: '$10,928.42',
        desc: 'Available Balance'
      }, {
        title: 'Argent Bank Credit Card (x8349)',
        amount: '$184.30',
        desc: 'Current Balance'
      }].map((acc, i) => (
        <section key={i} className="account">
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
