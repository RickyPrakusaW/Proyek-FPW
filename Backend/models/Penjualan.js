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
    unique: true, // Ensure unique invoice numbers
  },
  idCart: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Cart', // Reference to Cart collection
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
    default: Date.now, // Use Date.now directly for the default value
  },
  Customer_id: {
    type: Schema.Types.ObjectId,
    ref: 'Customer', // Reference to Customer collection
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

// Use safeguard to prevent overwriting the model
module.exports = mongoose.models.Penjualan || mongoose.model('Penjualan', PenjualanSchema);
