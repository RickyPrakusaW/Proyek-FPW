const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  Nama_lengkap: {
    type: String,
    required: true,
  },
  No_telepone: {
    type: Number,
    required: true,
  },
  Alamat: {
    type: String,
    required: true,
  },
  Kota: {
    type: String,
    required: true,
  },
  Negara: {
    type: String,
    required: true,
  },
  Kodepos: {
    type: Number,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
