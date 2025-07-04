import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUsername } from '../features/user/userSlice'

function EditNameForm({ onSuccess, onCancel }) {
  const dispatch = useDispatch()
  const { profile } = useSelector((state) => state.user)

  const [newUsername, setNewUsername] = useState(profile?.userName || '')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') // 'success' ou 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newUsername.trim()) return

    const result = await dispatch(updateUsername(newUsername))

    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('✅ Username updated successfully!')
      setMessageType('success')
      if (onSuccess) onSuccess()
    } else {
      setMessage('❌ Failed to update username.')
      setMessageType('error')
    }
  }

  // Effacer le message automatiquement après 3 secondes
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('')
        setMessageType('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Edit user info</h2>

      {message && (
        <div
          style={{
            marginBottom: '1.5rem',
            padding: '10px',
            borderRadius: '5px',
            color: messageType === 'success' ? '#155724' : '#721c24',
            backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da',
            border: `1px solid ${messageType === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* User name */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ width: '120px', color: 'white', textAlign: 'right', marginRight: '1rem' }}>
            User name
          </label>
          <input
            id="username"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* First name */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <label htmlFor="firstName" style={{ width: '120px', color: 'white', textAlign: 'right', marginRight: '1rem' }}>
            First name
          </label>
          <input
            id="firstName"
            type="text"
            value={profile?.firstName}
            disabled
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#eee',
            }}
          />
        </div>

        {/* Last name */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <label htmlFor="lastName" style={{ width: '120px', color: 'white', textAlign: 'right', marginRight: '1rem' }}>
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            value={profile?.lastName}
            disabled
            style={{
              flex: 1,
              padding: '8px',
              fontSize: '1rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: '#eee',
            }}
          />
        </div>

        {/* Buttons */}
        <div>
          <button
            type="submit"
            className="edit-button"
            style={{ marginRight: '10px' }}
          >
            Save
          </button>
          <button
            type="button"
            className="edit-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditNameForm








