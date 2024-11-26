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
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Penjualan', penjualanSchema);
