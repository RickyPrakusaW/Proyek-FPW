const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  Customer_id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  Nama_lengkap: {
    type: String,
    required: true,
  },
  No_telepone: {
    type: String,
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
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', customerSchema);


module.exports = Customer;
