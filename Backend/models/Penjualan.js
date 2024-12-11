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
  idKaryawan: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Karyawan', 
    required: true
  },
  namaCustomer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'customer'
  },
  status: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('Penjualan', penjualanSchema);
