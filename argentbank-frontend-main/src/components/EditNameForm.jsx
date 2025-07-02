// src/components/EditNameForm.jsx
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateUsername } from '../features/user/userSlice'

function EditNameForm({ currentUsername, onClose }) {
  const dispatch = useDispatch()
  const [newUsername, setNewUsername] = useState(currentUsername)
  const [message, setMessage] = useState(null)

  const handleSave = async () => {
    if (!newUsername.trim()) return
    const result = await dispatch(updateUsername(newUsername))
    if (result.meta.requestStatus === 'fulfilled') {
      setMessage('✅ Pseudo mis à jour avec succès.')
      onClose()
    } else {
      setMessage('❌ Erreur lors de la mise à jour.')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        placeholder="New username"
        style={{
          padding: '8px',
          fontSize: '1rem',
          borderRadius: '5px',
          border: '1px solid #ccc',
          marginBottom: '10px',
        }}
      />
      <br />
      <button className="edit-button" onClick={handleSave}>Save</button>
      <button className="edit-button" onClick={onClose}>Cancel</button>
      {message && <p style={{ marginTop: '1rem', color: '#00bc77' }}>{message}</p>}
    </div>
  )
}

export default EditNameForm
