const mongoose = require('mongoose');

const returAdminSchema = new mongoose.Schema({
  Id_retur_admin: {
    type: String,
    required: true,
  },
  Id_barang: {
    type: Number,
    required: true,
  },
  Nama_barang: {
    type: String,
    required: true,
  },
  Jumlah_barang: {
    type: Number,
    required: true,
    min: 0,
  },
  Photo_product: {
    type: String,
    required: false,
  },
  Tanggal: {
    type: Date,
    required: true,
  },
});

const ReturAdmin = mongoose.model('ReturAdmin', returAdminSchema);

module.exports = ReturAdmin;
