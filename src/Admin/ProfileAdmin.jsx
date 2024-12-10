import React, { useState } from 'react';

function ProfileAdmin() {
  const [oldEmail, setOldEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/admin/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldEmail,
          oldPassword,
          newEmail,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setOldEmail('');
        setOldPassword('');
        setNewEmail('');
        setNewPassword('');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error during update:', error);
      setMessage('Failed to update admin. Please try again later.');
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007BFF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
      fontWeight: 'bold',
    },
    message: {
      textAlign: 'center',
      margin: '10px 0',
      color: '#007BFF',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Update Admin Profile</h2>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleUpdate}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Old Email</label>
          <input
            type="text"
            value={oldEmail}
            onChange={(e) => setOldEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>New Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileAdmin;
