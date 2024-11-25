const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  id_stock: {
    type: Number,
    required: true,
  },
  nama_barang: {
    type: String,
    required: true,
  },
  total_barang: {
    type: String,
    required: true,
  },
  tipe_barang: {
    type: String,
    required: true,
    enum: ['Tas_pakaian', 'Tas_ransel', 'Tas_selempang'],
  },
  photo_barang: {
    type: String,
    required: true,
  },
  tanggal_masuk: {
    type: Date,
    required: true,
  },
  tanggal_keluar: {
    type: Date,
    required: false,
  },
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;
