const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Id_product: {
    type: Number,
    required: true,
    unique: true
  },
  Nama_product: {
    type: String,
    required: true
  },
  Harga: {
    type: Number,
    required: true
  },
  Stock_barang: {
    type: Number,
    required: true
  },
  Tipe: {
    type: String,
    required: true
  },
  Photo_product: {
    type: String,
    required: true
  },
  Tanggal_masuk: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
