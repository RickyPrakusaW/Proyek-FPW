const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  idAdmin: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  idKaryawan: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Karyawan',
    required: true
  },
  idKepalaGudang: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KepalaGudang',
    required: true
  },
  idProduct: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  idStock: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
    required: true
  },
  idPenjualan: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Penjualan',
    required: true
  },
  idBarangMasuk: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BarangMasuk', 
    required: true
  },
  idBarangKeluar: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BarangKeluar',
    required: true
  },
  idReturGudang: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReturGudang',
    required: true
  },
  idReturAdmin: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReturAdmin',
    required: true
  }
});

module.exports = mongoose.model('Admin', adminSchema);
