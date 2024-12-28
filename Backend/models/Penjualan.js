const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PenjualanSchema = new Schema({
  idPenjualan: {
    type: String,
    required: true,
    unique: true,
  },
  nomorInvoice: {
    type: String,
    required: true,
    unique: true, // Pastikan setiap nomorInvoice unik
  },
  idCart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cart', // Koleksi yang direferensikan
    },
  ],
  namaBarang: {
    type: String,
    required: true,
  },
  totalBarang: {
    type: Number,
    required: true,
  },
  totalHarga: {
    type: Number,
    required: true,
  },
  tanggalPembelian: {
    type: Date,
    default: Date.now,
  },
  Customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', // Koleksi yang direferensikan
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Penjualan', PenjualanSchema);
