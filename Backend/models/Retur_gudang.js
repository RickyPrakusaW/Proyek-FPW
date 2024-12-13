// models/ReturGudang.js
const mongoose = require('mongoose');
const StockGudang = require('./Stock_gudang'); // pastikan pathnya benar

const returGudangSchema = new mongoose.Schema({
  idReturGudang: {
    type: String,
    required: true,
  },
  idBarang: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StockGudang',  // Harus sesuai dengan nama model yang di-import
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
