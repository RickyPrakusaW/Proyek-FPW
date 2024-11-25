const mongoose = require('mongoose');

const KaryawanSchema = new mongoose.Schema({
  id_karyawan: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: true,
  },
  ktp: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const Karyawan = mongoose.model('Karyawan', KaryawanSchema);

module.exports = Karyawan;
