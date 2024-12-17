import React, { useState } from 'react';
import axios from 'axios';

function UpdateKaryawan({ idKaryawan }) {
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    jenis_kelamin: '',
    golongan_darah: '',
    alamat: '',
    no_telepon: '',
    agama: '',
    email: '',
    password: '',
    foto_ktp: null,
  });

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, foto_ktp: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          form.append(key, formData[key]);
        }
      });

      const response = await axios.put(`http://localhost:3000/api/admin/updateKaryawan/${idKaryawan}`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message || 'Karyawan berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating karyawan:', error);
      setMessage(
        error.response?.data?.error || 'Terjadi kesalahan saat memperbarui karyawan.'
      );
    }
  };

  return (
    <div className="update-karyawan-form" style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '20px auto',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333'
      }}>Update Karyawan</h1>
      {message && <p className="message" style={{
        color: message.includes('berhasil') ? 'green' : 'red',
        marginBottom: '15px',
        textAlign: 'center'
      }}>{message}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '15px',
      }}>
        {/* Input fields remain the same */}
        {/* Code omitted for brevity */}
        <button type="submit" style={{
          padding: '10px 15px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          gridColumn: '1 / -1',
          justifySelf: 'center',
        }}>
          Update
        </button>
      </form>
    </div>
  );
}

export default UpdateKaryawan;
