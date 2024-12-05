const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  idCart: { 
    type: String,
    required: true,
  },
  idBarang: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Barang',
    required: true,
  },
  namaBarang: { 
    type: String,
    required: true,
  },
  totalProduct: { 
    type: Number,
    required: true,
    min: 0,
  },
  harga: { 
    type: Number,
    required: true,
    min: 0,
  },
  photo: { 
    type: String,
    required: false,
  },
  totalBelanja: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
