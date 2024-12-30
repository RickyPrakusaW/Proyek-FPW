// models/ReturGudang.js
const mongoose = require('mongoose');

// Updated schema for ReturGudang
const returGudangSchema = new mongoose.Schema({
  idReturGudang: {
    type: String,
    required: true,
  },
  id_barang: {
    type: String,  // Menyimpan id_barang sebagai string
    required: true,
  },
  namaBarang: {
    type: String,
    required: true,
  },
  jumlahBarang: {
    type: Number,
    required: true,
  },
  photoBarang: {
    type: String,
    required: true,
  },
  tanggal: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],  // Add statuses for the return
    default: 'pending',  // Default status
  }
});

const ReturGudang = mongoose.model('ReturGudang', returGudangSchema);

module.exports = ReturGudang;
