const mongoose = require('mongoose');

const ReturGudangSchema = new mongoose.Schema({
  id_retur_gudang: {type: String,required: true},
  id_barang: {type: Number,required: true},
  nama_barang: {type: String,required: true},
  jumlah_barang: {type: Number,required: true},
  photo_barang: {type: String,required: true},
  tanggal: {type: Date,required: true},
  id_kepala_gudang: {type: String,required: true},
});

const ReturGudang = mongoose.model('ReturGudang', ReturGudangSchema);

module.exports = ReturGudang;
