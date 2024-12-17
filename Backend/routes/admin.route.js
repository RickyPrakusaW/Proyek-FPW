const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const Admin = require('../models/Admin');
const Karyawan = require('../models/Kariawan');
const Product = require('../models/Product');
const Stock = require('../models/Stock_gudang');
const ReturAdmin = require('../models/Retur_admin');
const ReturGudang = require('../models/Retur_gudang');
const StockGudang = require('../models/Stock_gudang');
const Customer = require('../models/Customer');
const Penjualan = require('../models/Penjualan');
// const KepalaGudang = require('./models/KepalaGudang'); 
const Cart = require('../models/Cart');
const moment = require('moment');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
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
      return res.status(200).json({ message: 'Selamat datang Admin', role: 'admin' });
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

      return res.status(200).json({ message: `Halo, ${karyawan.nama_lengkap}!`, role: 'karyawan' });
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

// untuk multer
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
router.put('/updateKaryawan/:id', uploadKaryawan, async (req, res) => {
  try {
    const { id } = req.params; // Ambil id_karyawan dari parameter URL
    const {
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      golongan_darah,
      alamat,
      no_telepon,
      agama,
      email, // Email baru (jika ada)
      password, // Password baru (jika ada)
    } = req.body;

    const foto_ktp = req.file?.filename;

    // Validasi input (opsional, hanya jika ada data yang diubah)
    if (email) {
      const emailRegex = /.+@.+\..+/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Format email tidak valid!' });
      }

      // Periksa apakah email sudah digunakan oleh karyawan lain
      const existingEmail = await Karyawan.findOne({ email, id_karyawan: { $ne: id } });
      if (existingEmail) {
        return res.status(400).json({ error: 'Email sudah digunakan oleh karyawan lain!' });
      }
    }

    let hashedPassword;
    if (password) {
      // Hash password baru (jika diberikan)
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update karyawan di database
    const updatedData = {
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      jenis_kelamin,
      golongan_darah,
      alamat,
      no_telepon,
      agama,
      email,
      password: hashedPassword,
      foto_ktp,
    };

    // Hapus field yang undefined atau null
    Object.keys(updatedData).forEach((key) => {
      if (updatedData[key] === undefined || updatedData[key] === null) {
        delete updatedData[key];
      }
    });

    const updatedKaryawan = await Karyawan.findOneAndUpdate(
      { id_karyawan: id },
      updatedData,
      { new: true }
    );

    if (!updatedKaryawan) {
      return res.status(404).json({ error: 'Karyawan tidak ditemukan' });
    }

    res.status(200).json({ message: 'Karyawan berhasil diperbarui', data: updatedKaryawan });
  } catch (error) {
    console.error('Error saat memperbarui karyawan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
router.put('/updateStatusKaryawan/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // Expects 'Aktif' or 'Nonaktif'

  try {
    // Validasi input
    if (status !== 'Aktif' && status !== 'Nonaktif') {
      return res.status(400).json({ message: 'Status harus berupa "Aktif" atau "Nonaktif".' });
    }

    // Cari karyawan berdasarkan ID
    const karyawan = await Karyawan.findOne({ id_karyawan: id });
    if (!karyawan) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan.' });
    }

    // Update status karyawan
    karyawan.status = status;
    await karyawan.save();

    return res.status(200).json({
      message: `Status karyawan berhasil diubah menjadi ${status}.`,
      karyawan,
    });
  } catch (error) {
    console.error('Gagal mengupdate status karyawan:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan server.' });
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
// Ambil karyawan berdasarkan ID
router.get('/getKaryawan/:id', async (req, res) => {
  try {
    const { id } = req.params; // Ambil id dari parameter URL
    // Cari berdasarkan `id_karyawan` jika `id` bukan ObjectId
    const karyawan = await Karyawan.findOne({ id_karyawan: id }).select('-password');

    if (!karyawan) {
      return res.status(404).json({ error: 'Karyawan tidak ditemukan' });
    }

    res.status(200).json({ message: 'Data karyawan ditemukan', data: karyawan });
  } catch (error) {
    console.error('Error saat mengambil data karyawan berdasarkan ID:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});


//update password
router.post('/updatePassword', async (req, res) => {
  try {
    const { oldEmail, oldPassword, newEmail, newPassword } = req.body;

    // Validasi input
    if (!oldEmail || !oldPassword || !newEmail || !newPassword) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    // Validasi format email
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(oldEmail) || !emailRegex.test(newEmail)) {
      return res.status(400).json({ error: 'Format email tidak valid!' });
    }

    // Periksa apakah email lama terdaftar
    const existingKaryawan = await Karyawan.findOne({ email: oldEmail });
    if (!existingKaryawan) {
      return res.status(404).json({ error: 'Email lama tidak ditemukan!' });
    }

    // Validasi password lama
    const isPasswordValid = await bcrypt.compare(oldPassword, existingKaryawan.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Password lama tidak sesuai!' });
    }

    // Hash password baru sebelum menyimpannya ke database
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update email dan password karyawan
    existingKaryawan.email = newEmail;
    existingKaryawan.password = hashedNewPassword;
    await existingKaryawan.save();

    res.status(200).json({ message: 'Email dan password berhasil diperbarui' });
  } catch (error) {
    console.error('Error saat memperbarui email dan password:', error);
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
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find(); // Assuming you have a Product model

    // Map products to add full image URL (assuming Photo_product is stored in 'product' folder)
    const productsWithImage = products.map(product => ({
      ...product.toObject(),
      imageUrl: `http://localhost:3000/api/admin/products/product/${product.Photo_product}`
    }));

    res.json({ data: productsWithImage });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});
// Contoh Express.js Endpoint
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Cari produk berdasarkan ID
    const product = await db.query("SELECT * FROM products WHERE id = ?", [id]);

    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ data: product[0] });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



//get multer
router.get('/products/:folder/:imageName', (req, res) => {
  const { folder, imageName } = req.params;

  // Construct the full path to the image
  const imagePath = path.join(__dirname, 'uploads', folder, imageName);
  console.log(`Image path: ${imagePath}`); // Log the path to verify

  // Send the image if found
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(`Error serving image: ${err}`);
      res.status(404).send('Image not found');
    }
  });
});

// Route untuk menambahkan retur barang
router.post('/addRetur', uploadRetur, async (req, res) => {
  try {
    // Get the latest retur admin ID from the database
    const lastRetur = await ReturAdmin.findOne().sort({ Id_retur_admin: -1 }).limit(1);

    // Generate the new Id_retur_admin
    let newId = 'D002'; // Default starting ID
    if (lastRetur) {
      const lastId = lastRetur.Id_retur_admin;
      const numericPart = parseInt(lastId.slice(1), 10);
      const newNumericPart = numericPart + 1;
      newId = `D${String(newNumericPart).padStart(3, '0')}`;
    }

    const { Id_barang, Nama_barang, Jumlah_barang, Tanggal } = req.body;
    const Photo_product = req.file?.filename;  // Get the uploaded file's filename

    // Ensure all fields are provided
    if (!Id_barang || !Nama_barang || !Jumlah_barang || !Tanggal || !Photo_product) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    // Create a new retur entry
    const newRetur = new ReturAdmin({
      Id_retur_admin: newId,
      Id_barang,
      Nama_barang,
      Jumlah_barang,
      Photo_product,
      Tanggal,
    });

    // Save the new retur entry to the database
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

    // Menambahkan URL gambar pada data yang dikirim
    const stocksWithImageUrls = stocks.map(stock => ({
      ...stock.toObject(),
      photo_url: `http://localhost:3000/uploads/stock/${stock.photo_barang}` // Pastikan ini URL yang benar
    }));

    res.status(200).json({
      message: 'Data stock ditemukan',
      data: stocksWithImageUrls
    });
  } catch (error) {
    console.error('Error saat mengambil data stock:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

app.use('/uploads/stock', express.static(path.join(__dirname, 'uploads', 'stock')));

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

//retur kepala gudang 
router.post('/addReturGudang', async (req, res) => {
  try {
    const { idBarang, namaBarang, jumlahBarang, photoBarang, tanggal } = req.body;

    // Validasi data yang masuk
    if (!idBarang || !namaBarang || !jumlahBarang || !photoBarang || !tanggal) {
      return res.status(400).json({ error: 'Semua data wajib diisi' });
    }

    if (!mongoose.Types.ObjectId.isValid(idBarang)) {
      return res.status(400).json({ error: 'ID Barang tidak valid' });
    }

    const stock = await StockGudang.findById(idBarang);
    if (!stock) {
      return res.status(404).json({ error: 'Barang tidak ditemukan' });
    }

    const idReturGudang = `${idBarang}-${Date.now()}`;
    const retur = new ReturGudang({
      idReturGudang,
      idBarang: stock._id,
      namaBarang,
      jumlahBarang,
      photoBarang,
      tanggal,
    });

    await retur.save();

    res.status(201).json({
      message: 'Barang retur berhasil ditambahkan',
      data: retur,
    });
  } catch (error) {
    console.error('Error saat menambahkan retur:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
//liat retur kepala gudang 

router.get('/returGudang', async (req, res) => {
  try {
    const returBarang = await ReturGudang.find()
      .populate('idBarang', 'nama_barang total_barang photo_barang')  // Memastikan populate dengan benar
      .exec();

    res.status(200).json(returBarang);
  } catch (error) {
    console.error('Error saat mengambil data retur barang:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data retur barang' });
  }
});
//cart
router.post("/addToCart", async (req, res) => {
  const { idBarang, namaBarang, totalProduct, harga, photo } = req.body;

  if (!idBarang || !namaBarang || !totalProduct || !harga) {
    return res.status(400).json({ error: "Semua data wajib diisi" });
  }

  try {
    const totalBelanja = totalProduct * harga;

    const newCartItem = new Cart({
      idCart: `${idBarang}-${Date.now()}`,
      idBarang, // Referensi ID produk
      namaBarang,
      totalProduct,
      harga,
      photo: photo || "",
      totalBelanja,
    });

    const result = await newCartItem.save();
    res.status(201).json({
      message: "Barang berhasil ditambahkan ke keranjang",
      data: result,
    });
  } catch (error) {
    console.error("Error saat menambahkan ke keranjang:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});
router.get("/getCart", async (req, res) => {
  try {
    // Mengambil data keranjang dengan populate pada field `idBarang` dari model Product
    const cartItems = await Cart.find().populate("idBarang", "Nama_product Harga Photo_product");

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ error: "Keranjang kosong" });
    }

    res.status(200).json({
      message: "Data keranjang ditemukan",
      data: cartItems,
    });
  } catch (error) {
    console.error("Error saat mengambil data keranjang:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

// PUT /updateCart
router.put("/updateCart", async (req, res) => {
  const { id, totalProduct } = req.body;

  if (!id || totalProduct === undefined) {
    return res.status(400).json({ error: "ID dan jumlah barang wajib diisi" });
  }

  try {
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ error: "Barang tidak ditemukan" });
    }

    cartItem.totalProduct = totalProduct;
    cartItem.totalBelanja = totalProduct * cartItem.harga;

    const updatedItem = await cartItem.save();
    res.status(200).json({
      message: "Jumlah barang berhasil diperbarui",
      data: updatedItem,
    });
  } catch (error) {
    console.error("Error saat memperbarui jumlah barang:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});


// DELETE /deleteCart
router.delete("/deleteCart/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID barang wajib diisi" });
  }

  try {
    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ error: "Barang tidak ditemukan di keranjang" });
    }

    res.status(200).json({
      message: "Barang berhasil dihapus dari keranjang",
      data: deletedItem,
    });
  } catch (error) {
    console.error("Error saat menghapus barang dari keranjang:", error.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

//nambah customer
router.post('/addCustomer', async (req, res) => {
  const { Nama_lengkap, No_telepone, Alamat, Kota, Negara, Kodepos } = req.body;

  // Validasi input
  if (!Nama_lengkap || !No_telepone || !Alamat || !Kota || !Negara || !Kodepos) {
    return res.status(400).json({ error: 'Semua data pelanggan wajib diisi' });
  }

  try {
    // Cari Customer terakhir berdasarkan Customer_id yang terbesar
    const lastCustomer = await Customer.findOne().sort({ Customer_id: -1 });
    console.log("Last Customer:", lastCustomer); // Log last customer

    let newCustomerId = 'Cus010'; // Default ID pertama

    if (lastCustomer && lastCustomer.Customer_id) {
      // Jika lastCustomer ada dan Customer_id ada, ambil angka ID terakhir dan increment
      const lastIdNumber = parseInt(lastCustomer.Customer_id.substring(3)); // Ambil angka setelah 'Cus'
      
      if (isNaN(lastIdNumber)) {
        // Jika ID tidak sesuai format, beri pesan error
        return res.status(500).json({ error: 'Format ID Customer terakhir tidak valid' });
      }
      
      const newIdNumber = lastIdNumber + 1; // Increment ID dengan 1
      newCustomerId = `Cus${String(newIdNumber).padStart(3, '0')}`; // Format ID baru
    }

    // Membuat instance pelanggan baru
    const newCustomer = new Customer({
      Customer_id: newCustomerId,
      Nama_lengkap,
      No_telepone,
      Alamat,
      Kota,
      Negara,
      Kodepos,
    });

    // Simpan customer baru ke database
    await newCustomer.save();

    res.status(201).json({
      message: 'Customer berhasil ditambahkan',
      data: newCustomer,
    });
  } catch (error) {
    console.error('Error saat menambahkan customer:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
// GET /getCustomers - Mengambil semua data customer
router.get('/getCustomers', async (req, res) => {
  try {
    // Ambil semua data customer dari database
    const customers = await Customer.find();

    // Periksa apakah data customer tersedia
    if (customers.length === 0) {
      return res.status(404).json({ message: 'Tidak ada data pelanggan yang ditemukan' });
    }

    // Kirim data pelanggan dalam respons JSON
    res.status(200).json({
      message: 'Data pelanggan berhasil diambil',
      data: customers,
    });
  } catch (error) {
    console.error('Error saat mengambil data customer:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});



//penjualan
router.post('/addPenjualan', async (req, res) => {
  const { customerId, cartId, status } = req.body;

  console.log('Received Data:', req.body); // Log data yang diterima

  // Validasi input
  if (!customerId || !cartId || typeof status !== 'boolean') {
    return res.status(400).json({ error: 'Data pelanggan, keranjang, dan status wajib diisi' });
  }

  try {
    // Ambil data pelanggan
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Pelanggan tidak ditemukan' });
    }

    // Ambil data keranjang
    const cart = await Cart.findById(cartId).populate('items');
    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(404).json({ error: 'Keranjang kosong atau tidak valid' });
    }

    console.log('Cart Data:', cart);

    // Iterasi barang dalam keranjang dan buat data penjualan
    const penjualanData = cart.items.map((item, index) => ({
      idPenjualan: `PJ${Date.now()}${index}`, // ID unik
      idCart: cart._id, // Relasi ke keranjang
      namaBarang: item.nama, // Nama barang
      totalBarang: item.jumlah, // Jumlah barang
      totalHarga: item.harga * item.jumlah, // Total harga
      tanggalPembelian: new Date(), // Tanggal pembelian
      Customer_id: customer._id, // Referensi ke Customer_id
      status, // Status penjualan
    }));

    // Simpan data penjualan ke database
    const penjualanRecords = await Penjualan.insertMany(penjualanData);

    res.status(201).json({
      message: 'Penjualan berhasil disimpan',
      data: penjualanRecords,
    });
  } catch (error) {
    console.error('Error saat menyimpan penjualan:', error.message);  // Log pesan error di sini
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

module.exports = router;
