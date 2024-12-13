const mongoose = require('mongoose');

const penjualanSchema = new mongoose.Schema({
  idPenjualan: { 
    type: String,
    required: true,
    unique: true
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
  namaCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', // Menghubungkan ke model 'Customer'
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  idCart: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart', // Menghubungkan ke model 'Cart'
    required: true
  },
  Nama_lengkap: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Penjualan', penjualanSchema);
