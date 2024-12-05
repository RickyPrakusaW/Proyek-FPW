const mongoose = require('mongoose');

const returGudangSchema = new mongoose.Schema({
  idReturGudang: { 
    type: String,
    required: true
  },
  idBarang: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barang', 
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
  idKepalaGudang: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KepalaGudang', 
    required: true
  }
});

const ReturGudang = mongoose.model('ReturGudang', returGudangSchema);

module.exports = ReturGudang;
