const mongoose = require('mongoose');

const penjualanSchema = new mongoose.Schema({
  idPenjualan: { 
    type: String,
    required: true,
    unique: true
  },
  idCart: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  namaBarang: { 
    type: String,
    required: true
  },
  totalBarang: { 
    type: Number,
    required: true
  },
  totalHarga: { 
    type: Number,
    required: true
  },
  tanggalPembelian: {
    type: Date,
    required: true
  },
  Customer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer', // Menghubungkan ke model 'Customer'
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
});

module.exports = mongoose.model('Penjualan', penjualanSchema);
