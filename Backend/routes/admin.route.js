const express = require('express');
const multer = require('multer');
const path = require('path');
const Admin = require('../models/Admin');
const Karyawan = require('../models/Kariawan');
const Product = require('../models/Product');
const Stock = require('../models/Stock_gudang');
const ReturAdmin = require('../models/Retur_admin');
const ReturGudang = require('../models/Retur_gudang');
const moment = require('moment');
const bcrypt = require('bcrypt');

const router = express.Router();

// Fungsi untuk setup storage engine Multer
const createStorage = (destinationPath) =>
  multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

// Fungsi untuk filter file
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (JPEG, JPG, PNG) yang diizinkan.'));
  }
};

// Setup Multer untuk masing-masing kebutuhan
const uploadKaryawan = multer({
  storage: createStorage('uploads/karyawan'),
  fileFilter,
}).single('foto_ktp');

const uploadProduct = multer({
  storage: createStorage('uploads/product'),
  fileFilter,
}).single('photo_product'); // Pastikan field di frontend menggunakan 'photo_product'

const uploadRetur = multer({
  storage: createStorage('uploads/retur'),
  fileFilter,
}).single('photo_product'); // Pastikan field di frontend menggunakan 'photo_product'

const uploadStock = multer({
  storage: createStorage('uploads/stock'),
  fileFilter,
}).single('photo_barang');

const uploadReturGudang = multer({
  storage: createStorage('uploads/retur_gudang'), // Direktori penyimpanan file
  fileFilter, // Filter file untuk memvalidasi jenis file
}).single('photo_product');


//login
const initializeAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ Email: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      const newAdmin = new Admin({
        Id_admin: 1,
        Email: 'admin',
        Password: hashedPassword,
        Id_karyawan: 'default_karyawan',
        Id_kepala_gudang: 'default_kepala_gudang',
        Id_product: 0,
        Id_stock: 0,
        Id_penjualan: 'default_penjualan',
        Id_barang_masuk: 0,
        Id_barang_keluar: 'default_barang_keluar',
        Id_retur_gudang: 'default_retur_gudang',
        Id_retur_admin: 'default_retur_admin',
      });
      await newAdmin.save();
      console.log('Default admin created');
    } else {
      console.log('Admin already exists');
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
};

initializeAdmin();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek apakah email ada di koleksi Admin
    const admin = await Admin.findOne({ Email: email });
    if (admin) {
      const isPasswordValid = await bcrypt.compare(password, admin.Password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.status(200).json({ message: 'Selamat datang Admin' });
    }

    // Jika bukan admin, cek di koleksi Karyawan
    const karyawan = await Karyawan.findOne({ email: email });
    if (karyawan) {
      // Pastikan akun karyawan aktif
      if (!karyawan.status) {
        return res.status(401).json({ message: 'Akun Anda telah dinonaktifkan' });
      }
      

      const isPasswordValid = await bcrypt.compare(password, karyawan.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.status(200).json({ message: `Halo, ${karyawan.nama_lengkap}!` });
    }

    // Jika email tidak ditemukan di kedua koleksi
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/update', async (req, res) => {
  const { oldEmail, oldPassword, newEmail, newPassword } = req.body;

  try {
    // Cari admin berdasarkan email lama
    const admin = await Admin.findOne({ Email: oldEmail });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Verifikasi password lama
    const isPasswordValid = await bcrypt.compare(oldPassword, admin.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid old credentials' });
    }

    // Hash password baru jika diberikan
    const hashedPassword = newPassword ? await bcrypt.hash(newPassword, 10) : admin.Password;

    // Update email dan/atau password
    admin.Email = newEmail || admin.Email;
    admin.Password = hashedPassword;

    // Simpan perubahan ke database
    await admin.save();

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Route untuk menambahkan Karyawan
router.post('/addKaryawan', uploadKaryawan, async (req, res) => {
  try {
    const {
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      golongan_darah,
      alamat,
      no_telepon,
      agama,
      email, // Tambahkan email
      password, // Password
    } = req.body;

    const foto_ktp = req.file?.filename;

    // Validasi input
    if (
      !nama_lengkap ||
      !tempat_lahir ||
      !tanggal_lahir ||
      !jenis_kelamin ||
      !alamat ||
      !no_telepon ||
      !agama ||
      !email || // Validasi email
      !password // Validasi password
    ) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    // Validasi format email
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Format email tidak valid!' });
    }

    // Periksa apakah email sudah terdaftar
    const existingEmail = await Karyawan.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: 'Email sudah digunakan!' });
    }

    // Hash password sebelum menyimpan ke database
    const hashedPassword = await bcrypt.hash(password, 10);

    const lastKaryawan = await Karyawan.findOne().sort({ id_karyawan: -1 });
    const lastId = lastKaryawan ? lastKaryawan.id_karyawan : 'K000';
    const newId = `K${String(parseInt(lastId.substring(1)) + 1).padStart(3, '0')}`;

    const newKaryawan = new Karyawan({
      id_karyawan: newId,
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      golongan_darah,
      alamat,
      no_telepon,
      agama,
      email, // Simpan email
      foto_ktp,
      password: hashedPassword, // Simpan password yang sudah di-hash
    });

    const savedKaryawan = await newKaryawan.save();
    res.status(201).json({ message: 'Karyawan berhasil ditambahkan', data: savedKaryawan });
  } catch (error) {
    console.error('Error saat menambahkan karyawan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

router.get('/getKaryawan', async (req, res) => {
  try {
    // Ambil semua karyawan kecuali password
    const karyawan = await Karyawan.find().select('-password'); // '-password' mengecualikan field password
    
    if (!karyawan || karyawan.length === 0) {
      return res.status(404).json({ error: 'Tidak ada karyawan ditemukan' });
    }

    res.status(200).json({ message: 'Data karyawan ditemukan', data: karyawan });
  } catch (error) {
    console.error('Error saat mengambil data karyawan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});


// Route untuk menambah produk
router.post('/addProduct', uploadProduct, async (req, res) => {
  try {
    const { Id_product, Nama_product, Harga, Stock_barang, Tipe, Tanggal_masuk } = req.body;
    const Photo_product = req.file?.filename; // Ambil nama file dari foto produk

    // Validasi input
    if (!Id_product || !Nama_product || !Harga || !Stock_barang || !Tipe || !Photo_product || !Tanggal_masuk) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    // Periksa apakah produk dengan ID yang sama sudah ada
    const existingProduct = await Product.findOne({ Id_product });
    if (existingProduct) {
      return res.status(400).json({ error: 'Produk dengan ID tersebut sudah ada.' });
    }

    // Membuat objek produk baru
    const newProduct = new Product({
      Id_product,
      Nama_product,
      Harga,
      Stock_barang,
      Tipe,
      Photo_product,
      Tanggal_masuk,
    });

    // Simpan produk ke database
    const savedProduct = await newProduct.save();
    res.status(201).json({ message: 'Produk berhasil ditambahkan', data: savedProduct });
  } catch (error) {
    console.error('Error saat menambahkan produk:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
// Mengambil semua data produk
router.get('/getProduct', async (req, res) => {
  try {
    // Mengambil semua produk
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ error: 'Tidak ada produk ditemukan' });
    }

    // Mengembalikan response dengan data produk
    res.status(200).json({ message: 'Data produk ditemukan', data: products });
  } catch (error) {
    console.error('Error saat mengambil data produk:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});


// Route untuk menambahkan retur barang
router.post('/addRetur', uploadRetur, async (req, res) => {
  try {
    const { Id_retur_admin, Id_barang, Nama_barang, Jumlah_barang, Tanggal } = req.body;
    const Photo_product = req.file?.filename; // Ambil nama file foto produk

    if (!Id_retur_admin || !Id_barang || !Nama_barang || !Jumlah_barang || !Tanggal || !Photo_product) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    const newRetur = new ReturAdmin({
      Id_retur_admin,
      Id_barang,
      Nama_barang,
      Jumlah_barang,
      Photo_product,
      Tanggal,
    });

    const savedRetur = await newRetur.save();
    res.status(201).json({ message: 'Retur barang berhasil ditambahkan', data: savedRetur });
  } catch (error) {
    console.error('Error saat menambahkan retur barang:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
router.get('/getRetur', async (req, res) => {
  try {
    const returs = await ReturAdmin.find(); // Mengambil semua data retur dari database
    res.status(200).json({ message: 'Data retur berhasil diambil', data: returs });
  } catch (error) {
    console.error('Error saat mengambil data retur:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});



//kepala gudang
router.post('/addStock', uploadStock, async (req, res) => {
  try {
    const { id_stock, nama_barang, total_barang, tipe_barang, tanggal_masuk, tanggal_keluar } = req.body;
    const photo_barang = req.file?.filename;

    // Validasi input
    if (!id_stock || !nama_barang || !total_barang || !tipe_barang || !photo_barang || !tanggal_masuk) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    if (!['Tas_pakaian', 'Tas_ransel', 'Tas_selempang'].includes(tipe_barang)) {
      return res.status(400).json({ error: 'Tipe barang tidak valid!' });
    }

    const newStock = new Stock({
      id_stock,
      nama_barang,
      total_barang,
      tipe_barang,
      photo_barang,
      tanggal_masuk,
      tanggal_keluar,
    });

    const savedStock = await newStock.save();
    res.status(201).json({ message: 'Stock berhasil ditambahkan', data: savedStock });
  } catch (error) {
    console.error('Error saat menambahkan stock:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
//barang keluar
router.post('/barangKeluar', async (req, res) => {
  try {
    const { id_stock, jumlah_keluar, tanggal_keluar } = req.body;

    // Validasi input
    if (!id_stock || !jumlah_keluar || !tanggal_keluar) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    if (jumlah_keluar <= 0) {
      return res.status(400).json({ error: 'Jumlah keluar harus lebih besar dari 0!' });
    }

    // Cari stok berdasarkan ID
    const stock = await Stock.findOne({ id_stock });
    if (!stock) {
      return res.status(404).json({ error: 'Stock tidak ditemukan!' });
    }

    // Validasi stok yang tersedia
    if (parseInt(stock.total_barang) < jumlah_keluar) {
      return res.status(400).json({ error: 'Jumlah barang keluar melebihi stok yang tersedia!' });
    }

    // Kurangi stok
    stock.total_barang = parseInt(stock.total_barang) - jumlah_keluar;
    stock.tanggal_keluar = tanggal_keluar;

    // Simpan perubahan
    const updatedStock = await stock.save();
    res.status(200).json({ message: 'Barang keluar berhasil diproses', data: updatedStock });
  } catch (error) {
    console.error('Error saat memproses barang keluar:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
router.get('/barangKeluar', async (req, res) => {
  try {
    // Ambil semua data barang keluar dari database
    const allBarangKeluar = await Stock.find();

    // Jika tidak ada data
    if (allBarangKeluar.length === 0) {
      return res.status(404).json({ message: 'Belum ada barang keluar yang tercatat.' });
    }

    // Kirimkan data barang keluar
    res.status(200).json({ message: 'Data barang keluar berhasil diambil', data: allBarangKeluar });
  } catch (error) {
    console.error('Error saat mengambil data barang keluar:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
// Route untuk mendapatkan semua data Stock
router.get('/getStock', async (req, res) => {
  try {
    const stocks = await Stock.find();
    if (!stocks || stocks.length === 0) {
      return res.status(404).json({ error: 'Tidak ada stock ditemukan' });
    }

    res.status(200).json({ message: 'Data stock ditemukan', data: stocks });
  } catch (error) {
    console.error('Error saat mengambil data stock:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Route untuk mendapatkan Stock berdasarkan ID
router.get('/getStock/:id', async (req, res) => {
  try {
    const stock = await Stock.findOne({ id_stock: req.params.id });
    if (!stock) {
      return res.status(404).json({ error: 'Stock tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data stock ditemukan', data: stock });
  } catch (error) {
    console.error('Error saat mengambil data stock:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Route untuk memperbarui Stock
router.put('/updateStock/:id', uploadStock, async (req, res) => {
  try {
    const { nama_barang, total_barang, tipe_barang, tanggal_masuk, tanggal_keluar } = req.body;
    const photo_barang = req.file?.filename;

    const updatedStock = await Stock.findOneAndUpdate(
      { id_stock: req.params.id },
      {
        nama_barang,
        total_barang,
        tipe_barang,
        photo_barang: photo_barang || undefined, // Jika tidak ada file baru, gunakan yang lama
        tanggal_masuk,
        tanggal_keluar,
      },
      { new: true, runValidators: true }
    );

    if (!updatedStock) {
      return res.status(404).json({ error: 'Stock tidak ditemukan' });
    }

    res.status(200).json({ message: 'Stock berhasil diperbarui', data: updatedStock });
  } catch (error) {
    console.error('Error saat memperbarui stock:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Route untuk menghapus Stock
router.delete('/deleteStock/:id', async (req, res) => {
  try {
    const deletedStock = await Stock.findOneAndDelete({ id_stock: req.params.id });
    if (!deletedStock) {
      return res.status(404).json({ error: 'Stock tidak ditemukan' });
    }

    res.status(200).json({ message: 'Stock berhasil dihapus', data: deletedStock });
  } catch (error) {
    console.error('Error saat menghapus stock:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
router.post('/returBarang', (req, res) => {
  uploadReturGudang(req, res, async (err) => {
    // Tangani error dari multer
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { idBarang, namaBarang, jumlahBarang, tanggal } = req.body;

      // Validasi input dari form
      if (!idBarang || !namaBarang || !jumlahBarang || !tanggal || !req.file) {
        return res.status(400).json({ error: 'Semua field wajib diisi!' });
      }

      // Validasi jumlah barang harus berupa angka
      if (isNaN(jumlahBarang) || jumlahBarang <= 0) {
        return res
          .status(400)
          .json({ error: 'Jumlah barang retur harus berupa angka dan lebih besar dari 0!' });
      }

      // Cari stock barang berdasarkan ID
      const stock = await Stock.findOne({ id_stock: idBarang });
      if (!stock) {
        return res.status(404).json({ error: 'Stock barang tidak ditemukan!' });
      }

      // Generate ID retur secara otomatis
      const latestRetur = await ReturGudang.findOne().sort({ idReturGudang: -1 }).limit(1);
      let newIdRetur = 'RG001';

      if (latestRetur) {
        const lastId = latestRetur.idReturGudang; // Misal: RG001
        const lastNumber = parseInt(lastId.slice(2)); // Ekstrak angka: 001
        const newNumber = lastNumber + 1; // Increment angka
        newIdRetur = `RG${String(newNumber).padStart(3, '0')}`; // Format ID baru
      }

      // Membuat entry retur barang
      const returBarang = new ReturGudang({
        idReturGudang: newIdRetur,
        idBarang,
        namaBarang,
        jumlahBarang: parseInt(jumlahBarang),
        photoBarang: req.file.path, // Path file yang di-upload
        tanggal,
      });

      // Simpan data retur barang
      const savedRetur = await returBarang.save();

      // Update jumlah stock barang di gudang
      stock.total_barang = parseInt(stock.total_barang) + parseInt(jumlahBarang);
      const updatedStock = await stock.save();

      // Kirimkan respons sukses
      res.status(201).json({
        message: 'Barang retur berhasil ditambahkan dan stock diperbarui.',
        data: { savedRetur, updatedStock },
      });
    } catch (error) {
      console.error('Error saat menambahkan barang retur:', error);
      res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
  });
});
router.post('/debugReturBarang', (req, res) => {
  multer({ storage: createStorage('uploads/retur_gudang') }).any()(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    console.log('Files:', req.files); // Debug nama field file
    console.log('Body:', req.body); // Debug data lain dari form
    res.status(200).json({ message: 'Debugging berhasil!', files: req.files, body: req.body });
  });
});
module.exports = router;
