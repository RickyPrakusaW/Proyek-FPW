const mongoose = require('mongoose');

const penjualanSchema = new mongoose.Schema({
  // ID Penjualan untuk tracking
  idPenjualan: { 
    type: String, 
    required: true, 
    unique: true,
    // Menambahkan index untuk pencarian yang lebih cepat
    index: true 
  },

  // Referensi ke Cart
  idCart: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Cart',
    required: true 
  },

  // Informasi Barang
  namaBarang: { 
    type: String, 
    required: true,
    trim: true  // Menghapus spasi di awal dan akhir
  },

  // Jumlah barang yang dibeli
  totalBarang: { 
    type: Number, 
    required: true,
    min: [1, 'Total barang minimal 1'],  // Validasi minimal 1
    validate: {
      validator: Number.isInteger,
      message: 'Total barang harus berupa bilangan bulat'
    }
  },

  // Total harga per item
  totalHarga: { 
    type: Number, 
    required: true,
    min: [0, 'Total harga tidak boleh negatif'],  // Validasi harga tidak negatif
  },

  // Tanggal dan waktu pembelian
  tanggalPembelian: { 
    type: Date, 
    required: true,
    default: Date.now  // Default ke waktu sekarang
  },

  // Referensi ke Customer
  Customer_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
    required: true 
  },

  // Status penjualan (contoh: true = selesai, false = pending)
  status: { 
    type: Boolean, 
    required: true,
    default: false
  },

  // Informasi pembayaran (opsional)
  metodePembayaran: {
    type: String,
    enum: ['CASH', 'TRANSFER', 'QRIS'],
    default: 'CASH'
  },

  // Nomor invoice
  nomorInvoice: {
    type: String,
    unique: true,
    required: true,
    default: function() {
      // Generate nomor invoice: INV/TAHUN/BULAN/ID-RANDOM
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `INV/${year}/${month}/${random}`;
    }
  },

  // Catatan tambahan
  catatan: {
    type: String,
    trim: true,
    maxlength: [500, 'Catatan tidak boleh lebih dari 500 karakter']
  }
}, {
  // Menambahkan timestamps (createdAt & updatedAt)
  timestamps: true,
  
  // Menambahkan virtual untuk mendapatkan informasi lengkap
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes untuk performa query
penjualanSchema.index({ tanggalPembelian: -1 });
penjualanSchema.index({ Customer_id: 1, tanggalPembelian: -1 });

// Virtual untuk total pembayaran (termasuk pajak jika ada)
penjualanSchema.virtual('totalPembayaran').get(function() {
  const pajak = this.totalHarga * 0.11; // PPN 11%
  return this.totalHarga + pajak;
});

// Method untuk mengubah status penjualan
penjualanSchema.methods.updateStatus = async function(newStatus) {
  this.status = newStatus;
  return await this.save();
};

// Static method untuk mencari penjualan berdasarkan rentang tanggal
penjualanSchema.statics.findByDateRange = function(startDate, endDate) {
  return this.find({
    tanggalPembelian: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('Customer_id').populate('idCart');
};

// Middleware sebelum save
penjualanSchema.pre('save', function(next) {
  // Jika tidak ada idPenjualan, generate otomatis
  if (!this.idPenjualan) {
    const timestamp = Date.now();
    this.idPenjualan = `PJ${timestamp}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

// Middleware setelah save
penjualanSchema.post('save', function(doc, next) {
  // Log untuk tracking
  console.log(`Penjualan dengan ID ${doc.idPenjualan} berhasil disimpan`);
  next();
});

// Create model dari schema
const Penjualan = mongoose.model('Penjualan', penjualanSchema);

// Export model
module.exports = Penjualan;