const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  Id_cart: {
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
  Total_product: {
    type: Number,
    required: true,
    min: 0,
  },
  Harga: {
    type: Number,
    required: true,
    min: 0,
  },
  Photo: {
    type: String,
    required: false,
  },
  Total_belanja: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
