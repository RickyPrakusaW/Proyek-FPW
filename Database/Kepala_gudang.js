const mongoose = require('mongoose');

const kepalaGudangSchema = new mongoose.Schema({
    Id_kepala_gudang: { type: String, required: true, unique: true },
    First_name: { type: String, required: true },
    Last_name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    Ktp: { type: String, required: true },
    Status: { type: Boolean, required: true }
  }, { timestamps: true });

  const KepalaGudang = mongoose.model('KepalaGudang', kepalaGudangSchema);
  module.exports = KepalaGudang;