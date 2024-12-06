const mongoose = require('mongoose');

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
  agama: {
    type: String,
    required: true,
  },
  ktp: {
    type: String,
    required: true,
  },
  foto_ktp: { // Menambahkan field untuk foto KTP
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Karyawan = mongoose.model('Karyawan', KaryawanSchema);

module.exports = Karyawan;
