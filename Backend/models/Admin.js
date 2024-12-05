const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  Id_admin: {
    type: Number,
    required: true,
    unique: true
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Id_karyawan: {
    type: String,
    required: true
  },
  Id_kepala_gudang: {
    type: String,
    required: true
  },
  Id_product: {
    type: Number,
    required: true
  },
  Id_stock: {
    type: Number,
    required: true
  },
  Id_penjualan: {
    type: String,
    required: true
  },
  Id_barang_masuk: {
    type: Number,
    required: true
  },
  Id_barang_keluar: {
    type: String,
    required: true
  },
  Id_retur_gudang: {
    type: String,
    required: true
  },
  Id_retur_admin: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Admin', adminSchema);
