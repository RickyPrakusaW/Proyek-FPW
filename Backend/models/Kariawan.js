const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema Karyawan
const KaryawanSchema = mongoose.Schema({
  id_karyawan: { // ID auto-generate (contoh: K001, K002)
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
  foto_ktp: { // Nama file foto KTP
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ['Aktif', 'Nonaktif'], // Nilai yang diperbolehkan
    required: true,
    default: 'Aktif',
  },
  password: { // Password baru
    type: String,
    required: true,
  },
});

// Hash password sebelum disimpan ke database
KaryawanSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Skip hashing jika password tidak diubah
  }

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt untuk hash
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (error) {
    next(error); // Jika ada error, lanjutkan ke next dengan error
  }
});

// Method untuk memverifikasi password yang dimasukkan dengan password di database
KaryawanSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Karyawan = mongoose.model('Karyawan', KaryawanSchema);

module.exports = Karyawan;
