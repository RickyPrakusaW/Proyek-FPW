const mongoose = require('mongoose');

// Import model StockGudang untuk referensi
const StockGudang = require('./Stock_gudang');

const returGudangSchema = new mongoose.Schema({
  idReturGudang: { 
    type: String,
    required: true
  },
  // Mengubah referensi ke StockGudang dan menggunakan id_stock sebagai referensi
  idBarang: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'StockGudang',  // Menunjuk ke StockGudang
    required: true
  },
  namaBarang: { 
    type: String,
    required: true
  },
  jumlahBarang: { 
    type: Number,
    required: true
  },
  photoBarang: {
    type: String,
    required: true
  },
  tanggal: {
    type: Date,
    required: true
  },
});

const ReturGudang = mongoose.model('ReturGudang', returGudangSchema);

module.exports = ReturGudang;
