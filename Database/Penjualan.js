const mongoose = require('mongoose');

const penjualanSchema = new mongoose.Schema({
  Id_penjualan: {
    type: String,
    required: true,
    unique: true
  },
  Id_barang: {
    type: mongoose.Schema.Types.Number, 
    ref: 'Product',
    required: true
  },
  Nama_barang: {
    type: String,
    required: true
  },
  Total_barang: {
    type: Number,
    required: true
  },
  Total_harga: {
    type: Number,
    required: true
  },
  Tanggal_pembelian: {
    type: Date,
    required: true
  },
  Id_karyawan: {
    type: mongoose.Schema.Types.Number,
    ref: 'Admin',
    required: true
  },
  Nama_customer: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Penjualan', penjualanSchema);
