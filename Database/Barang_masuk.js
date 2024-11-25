const mongoose = require('mongoose');


const barangMasukSchema = new mongoose.Schema({
  Id_barang_masuk: { type: Number, required: true, unique: true },
  Nama_barang: { type: String, required: true },
  Jumlah_barang: { type: Number, required: true },
  Tipe_barang: { type: String, required: true },
  Photo_barang_masuk: { type: String, required: false },
  Tanggal_masuk: { type: Date, required: true }
}, { timestamps: true });

const BarangMasuk = mongoose.model('BarangMasuk', barangMasukSchema);

module.exports = BarangMasuk;
