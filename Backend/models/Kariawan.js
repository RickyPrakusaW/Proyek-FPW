const mongoose = require('mongoose');

// Schema Karyawan
const KaryawanSchema = mongoose.Schema({
  id_karyawan: {
    type: String,
    required: true,
    unique: true,
  },
  nama_lengkap: {
    type: String,
    required: true,
  },
  tempat_lahir: {
    type: String,
    required: true,
  },
  tanggal_lahir: {
    type: Date,
    required: true,
  },
  jenis_kelamin: {
    type: String,
    enum: ['Pria', 'Perempuan'],
    required: true,
  },
  golongan_darah: {
    type: String,
    enum: ['A', 'B', 'AB', 'O'],
    required: false,
  },
  alamat: {
    type: String,
    required: true,
  },
  no_telepon: {
    type: String,
    required: true,
    match: [/^\d+$/, 'Nomor telepon harus berupa angka'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Format email tidak valid'],
  },
  agama: {
    type: String,
    required: true,
  },
  foto_ktp: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Aktif', 'Nonaktif'],
    required: true,
    default: 'Aktif',
  },
  password: { 
    type: String,
    required: true,
  },
});

const Karyawan = mongoose.model('Karyawan', KaryawanSchema);

module.exports = Karyawan;
