const mongoose = require('mongoose');


const barangKeluarSchema = new mongoose.Schema({
  Id_barang_keluar: { type: String, required: true, unique: true },
  Nama_barang: { type: String, required: true },
  Total_barang: { type: Number, required: true },
  Tipe_barang: { type: String, required: true },
  Photo_barang_keluar: { type: String, required: false }, // Opsional
  Tanggal_keluar: { type: Date, required: true },
  Pengirim: { type: String, required: true }
}, { timestamps: true });

const BarangKeluar = mongoose.model('BarangKeluar', barangKeluarSchema);

module.exports = BarangKeluar;