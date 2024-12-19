// models/ReturGudang.js
const mongoose = require('mongoose');

const returGudangSchema = new mongoose.Schema({
  idReturGudang: {
    type: String,
    required: true,
  },
  id_stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock', // Nama model Stock yang digunakan untuk referensi
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
});

const ReturGudang = mongoose.model('ReturGudang', returGudangSchema);

module.exports = ReturGudang;
