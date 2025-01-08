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
const BarangKeluar = require('../models/Barang_keluar');

// const KepalaGudang = require('./models/KepalaGudang'); 
const Cart = require('../models/Cart');
//chat
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const moment = require('moment');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const router = express.Router();
const { ObjectId } = mongoose.Types;

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
  storage: createStorage('./uploads'),
}).single('Photo_product'); 

const uploadStock = multer({
  storage: createStorage('uploads/stock'),
  fileFilter,
}).single('photo_barang');

const uploadReturGudang = multer({
  storage: createStorage('uploads/retur_gudang'), // Direktori penyimpanan file
  fileFilter, // Filter file untuk memvalidasi jenis file
}).single('photo_product'); // Nama field form-data

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
// login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validasi input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    const normalizedEmail = email.toLowerCase();

    // Hardcoded admin dan kepala gudang
    if (normalizedEmail === "admin" && password === "admin") {
      return res.status(200).json({ email: "admin@company.com", role: "admin", nama_lengkap: "Admin" });
    } else if (normalizedEmail === "thio" && password === "thio") {
      return res.status(200).json({ email: "kepala@company.com", role: "kepala_gudang", nama_lengkap: "Thio" });
    }

    // Cek di koleksi Karyawan
    const karyawan = await Karyawan.findOne({ email: normalizedEmail });
    if (karyawan) {
      if (karyawan.status !== 'Aktif') {
        return res.status(403).json({ message: 'Akun Anda telah dinonaktifkan' });
      }

      if (password !== karyawan.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Berhasil login
      return res.status(200).json({
        id_karyawan: karyawan.id_karyawan,
        nama_lengkap: karyawan.nama_lengkap,
        email: karyawan.email,
        role: 'karyawan'
      });
    }

    return res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint untuk mengambil data profil
router.get('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const karyawan = await Karyawan.findOne({ email }).select('-password');

    if (!karyawan) {
      return res.status(404).json({ message: 'Profil tidak ditemukan' });
    }

    res.status(200).json(karyawan);
  } catch (error) {
    console.error('Error mengambil profil:', error);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
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

// Route untuk menambahkan Karyawan tanpa hashing
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
      email,
      password, // Password langsung
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
      !email ||
      !password
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

    // Generate ID Karyawan baru
    const lastKaryawan = await Karyawan.findOne().sort({ id_karyawan: -1 });
    const lastId = lastKaryawan ? lastKaryawan.id_karyawan : 'K000';
    const newId = `K${String(parseInt(lastId.substring(1)) + 1).padStart(3, '0')}`;

    // Simpan data karyawan tanpa hashing password
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
      email,
      foto_ktp,
      password, // Simpan password langsung
    });

    const savedKaryawan = await newKaryawan.save();
    res.status(201).json({ message: 'Karyawan berhasil ditambahkan', data: savedKaryawan });
  } catch (error) {
    console.error('Error saat menambahkan karyawan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
router.put('/updateKaryawan', async (req, res) => {
  try {
    const { email_lama, password_lama, email_baru, password_baru } = req.body;

    // Validasi input
    if (!email_lama || !password_lama || !email_baru || !password_baru) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    // Validasi format email baru
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email_baru)) {
      return res.status(400).json({ error: 'Format email baru tidak valid!' });
    }

    // Cari karyawan berdasarkan email lama
    const karyawan = await Karyawan.findOne({ email: email_lama });

    if (!karyawan) {
      return res.status(404).json({ error: 'Karyawan dengan email lama tidak ditemukan!' });
    }

    // Validasi password lama
    if (karyawan.password !== password_lama) {
      return res.status(400).json({ error: 'Password lama tidak sesuai!' });
    }

    // Periksa apakah email baru sudah digunakan oleh karyawan lain
    const emailExists = await Karyawan.findOne({ email: email_baru });
    if (emailExists && emailExists.email !== email_lama) {
      return res.status(400).json({ error: 'Email baru sudah digunakan oleh karyawan lain!' });
    }

    // Update email dan password
    karyawan.email = email_baru;
    karyawan.password = password_baru;

    // Simpan perubahan
    const updatedKaryawan = await karyawan.save();

    res.status(200).json({
      message: 'Email dan password berhasil diperbarui!',
      data: updatedKaryawan,
    });
  } catch (error) {
    console.error('Error saat memperbarui email dan password:', error);
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
router.post("/addRetur", uploadRetur, async (req, res) => {
  try {
    // Log file and body data for debugging
    console.log("File diterima:", req.file);
    console.log("Data body:", req.body);

    // Fetch the last entry to calculate the new ID
    const lastRetur = await ReturAdmin.findOne().sort({ Id_retur_admin: -1 });
    const newId = lastRetur
      ? `D${String(parseInt(lastRetur.Id_retur_admin.slice(1)) + 1).padStart(3, "0")}`
      : "D001";

    // Destructure and validate required fields
    const { Id_barang, Nama_barang, Jumlah_barang, Tanggal, Status } = req.body;
    const Photo_product = req.file?.filename;

    if (!Id_barang || !Nama_barang || !Jumlah_barang || !Tanggal || !Photo_product) {
      return res.status(400).json({ error: "Semua field wajib diisi!" });
    }

    // Validate numeric and date fields
    if (isNaN(Jumlah_barang) || Jumlah_barang <= 0) {
      return res.status(400).json({ error: "Jumlah barang harus berupa angka positif." });
    }

    if (isNaN(Date.parse(Tanggal))) {
      return res.status(400).json({ error: "Tanggal tidak valid." });
    }

    // Create a new ReturAdmin entry
    const newRetur = new ReturAdmin({
      Id_retur_admin: newId,
      Id_barang,
      Nama_barang,
      Jumlah_barang,
      Photo_product,
      Tanggal,
      Status: Status || "Barang rusak",
    });

    // Save the new entry to the database
    const savedRetur = await newRetur.save();

    // Respond with success message
    res.status(201).json({
      message: "Retur barang berhasil ditambahkan",
      data: savedRetur,
    });
  } catch (error) {
    console.error("Error saat menambahkan retur barang:", error);

    // Improved error response for debugging
    res.status(500).json({
      error: "Terjadi kesalahan pada server",
      details: error.message,
    });
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

router.put("/updateRetur/:id", async (req, res) => {
  try {
    const { id } = req.params; // ID retur dari parameter URL
    const { Status } = req.body; // Status baru dari body request

    // Validasi input
    if (!Status) {
      return res.status(400).json({ error: "Status wajib diisi!" });
    }

    // Validasi nilai status
    const validStatuses = [
      "Barang diretur ke supplier",
      "Barang dikembalikan dari supplier",
      "Barang rusak",
    ];
    if (!validStatuses.includes(Status)) {
      return res.status(400).json({ error: "Status tidak valid!" });
    }

    // Cari retur berdasarkan ID dan update status
    const updatedRetur = await ReturAdmin.findOneAndUpdate(
      { Id_retur_admin: id }, // Filter by Id_retur_admin
      { $set: { Status } },   // Update the status
      { new: true }           // Return the updated document
    );

    if (!updatedRetur) {
      return res.status(404).json({ error: "Data retur tidak ditemukan!" });
    }

    // Kirim respon sukses
    res.status(200).json({
      message: "Status retur berhasil diperbarui",
      data: updatedRetur,
    });
  } catch (error) {
    console.error("Error saat memperbarui status retur:", error);

    // Respon kesalahan
    res.status(500).json({
      error: "Terjadi kesalahan pada server",
      details: error.message,
    });
  }
});


//kepala gudang
router.post('/addStock', uploadStock, async (req, res) => {
  try {
    // Log untuk melihat data yang diterima
    console.log('Body:', req.body);
    console.log('File:', req.file);

    const { id_barang, nama_barang, total_barang, tipe_barang, tanggal_masuk, tanggal_keluar } = req.body;
    const photo_barang = req.file?.filename;  // Mendapatkan nama file yang di-upload

    // Validasi input
    if (!id_barang || !nama_barang || !total_barang || !tipe_barang || !photo_barang || !tanggal_masuk) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    // Validasi tipe barang
    if (!['Tas_pakaian', 'Tas_ransel', 'Tas_selempang'].includes(tipe_barang)) {
      return res.status(400).json({ error: 'Tipe barang tidak valid!' });
    }

    // Pastikan tanggal_masuk dan tanggal_keluar memiliki format yang benar
    const tanggalMasuk = new Date(tanggal_masuk);
    const tanggalKeluar = tanggal_keluar ? new Date(tanggal_keluar) : null;

    if (isNaN(tanggalMasuk.getTime())) {
      return res.status(400).json({ error: 'Tanggal masuk tidak valid!' });
    }

    if (tanggalKeluar && isNaN(tanggalKeluar.getTime())) {
      return res.status(400).json({ error: 'Tanggal keluar tidak valid!' });
    }

    // Membuat dokumen baru untuk stock
    const newStock = new Stock({
      id_barang,
      nama_barang,
      total_barang,
      tipe_barang,
      photo_barang,
      tanggal_masuk: tanggalMasuk,
      tanggal_keluar: tanggalKeluar,
    });

    // Simpan stock ke database
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
    const { id_barang, jumlah_keluar, tanggal_keluar } = req.body;

    // Validasi input
    if (!id_barang || !jumlah_keluar || !tanggal_keluar) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
    }

    if (jumlah_keluar <= 0) {
      return res.status(400).json({ error: 'Jumlah keluar harus lebih besar dari 0!' });
    }

    // Cari stok berdasarkan id_barang
    const stock = await Stock.findOne({ id_barang });
    if (!stock) {
      return res.status(404).json({ error: 'Barang tidak ditemukan!' });
    }

    // Validasi stok yang tersedia
    if (stock.total_barang < jumlah_keluar) {
      return res.status(400).json({ error: 'Jumlah barang keluar melebihi stok yang tersedia!' });
    }

    // Kurangi stok berdasarkan jumlah keluar
    stock.total_barang -= jumlah_keluar;

    // Simpan perubahan stok
    const updatedStock = await stock.save();

    // Simpan data barang keluar
    const barangKeluar = new BarangKeluar({
      Id_barang_keluar: `BK${Date.now()}`,  // Generate ID untuk barang keluar
      Nama_barang: stock.nama_barang,
      Total_barang: jumlah_keluar,
      Tipe_barang: stock.tipe_barang,
      Photo_barang_keluar: stock.photo_barang,
      Tanggal_keluar: tanggal_keluar,
      Pengirim: 'Warehouse',  // Bisa disesuaikan
      id_barang: stock.id_barang // Menyimpan id_barang
    });

    // Simpan barang keluar
    await barangKeluar.save();

    // Return response
    res.status(200).json({ message: 'Barang keluar berhasil diproses', data: updatedStock });
  } catch (error) {
    console.error('Error saat memproses barang keluar:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
//update status
router.put('/barangKeluar/status/:id', async (req, res) => {
  try {
    const { id } = req.params;  // Mendapatkan Id_barang_keluar dari parameter
    const { status } = req.body;  // Mendapatkan status baru dari request body

    // Validasi jika status diisi
    if (!status) {
      return res.status(400).json({ error: 'Status tidak boleh kosong!' });
    }

    // Cari barang keluar berdasarkan Id_barang_keluar
    const barangKeluar = await BarangKeluar.findOne({ Id_barang_keluar: id });
    if (!barangKeluar) {
      return res.status(404).json({ error: 'Barang keluar tidak ditemukan!' });
    }

    // Update status barang keluar
    barangKeluar.Status = status;

    // Simpan perubahan
    await barangKeluar.save();

    // Return response sukses
    res.status(200).json({ message: 'Status barang keluar berhasil diperbarui', data: barangKeluar });
  } catch (error) {
    console.error('Error saat memperbarui status barang keluar:', error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});

// Misalnya gambar disimpan di folder 'uploads' di server
app.use('/uploads', express.static('uploads'));

router.get('/barangKeluar', async (req, res) => {
  try {
    const barangKeluar = await BarangKeluar.find();

    if (barangKeluar.length === 0) {
      return res.status(404).json({ message: 'Tidak ada data barang keluar ditemukan' });
    }

    // Menambahkan URL gambar ke dalam response
    const barangKeluarWithPhotoUrls = barangKeluar.map(barang => ({
      ...barang.toObject(),
      photo_url: `http://localhost:3000/uploads/${barang.Photo_barang}`,
    }));

    res.status(200).json({ message: 'Data barang keluar berhasil diambil', data: barangKeluarWithPhotoUrls });
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
router.post('/addReturGudang', uploadReturGudang, async (req, res) => {
  try {
    const { id_barang, namaBarang, jumlahBarang, tanggal } = req.body;
    const photoBarang = req.file ? req.file.path : ''; // Ambil path file jika ada

    // Validasi input
    if (!id_barang || !namaBarang || !jumlahBarang || !photoBarang || !tanggal) {
      return res.status(400).json({ error: 'Semua data wajib diisi' });
    }

    // Validasi ID Barang di Stock (cari berdasarkan id_barang, bukan _id)
    const stock = await Stock.findOne({ id_barang: id_barang }); // Cari berdasarkan id_barang
    if (!stock) {
      return res.status(404).json({ error: 'Barang dengan ID tersebut tidak ditemukan' });
    }

    // Buat ID unik untuk retur
    const idReturGudang = `${id_barang}-${Date.now()}`;

    // Simpan data retur
    const retur = new ReturGudang({
      idReturGudang,
      id_barang: stock.id_barang, // Menyimpan id_barang yang ditemukan
      namaBarang,
      jumlahBarang,
      photoBarang,
      tanggal,
    });

    await retur.save();

    // Kirim respon sukses
    res.status(201).json({
      message: 'Barang retur berhasil ditambahkan',
      data: retur,
    });
  } catch (error) {
    console.error('Error saat menambahkan retur:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
//update status 
router.put('/updateStatusRetur/:id', async (req, res) => {
  try {
    const { id } = req.params; // ID retur dari parameter URL
    const { status } = req.body; // Status baru dari body request

    // Validasi input
    if (!status || !['approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        error: 'Status tidak valid. Hanya diperbolehkan status "approved" atau "rejected".',
      });
    }

    // Cari data retur berdasarkan ID
    const retur = await ReturGudang.findOne({ idReturGudang: id });
    if (!retur) {
      return res.status(404).json({ error: 'Data retur dengan ID tersebut tidak ditemukan' });
    }

    // Perbarui status retur
    retur.status = status;
    await retur.save();

    // Kirim respon sukses
    res.status(200).json({
      message: 'Status retur berhasil diperbarui',
      data: retur,
    });
  } catch (error) {
    console.error('Error saat memperbarui status retur:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
});
//liat retur kepala gudang 
router.get('/getReturGudang', async (req, res) => {
  try {
    const { id_barang } = req.query;

    // Jika ada parameter id_barang, filter berdasarkan id_barang
    const filter = id_barang ? { id_barang: id_barang } : {};

    // Ambil data retur dari database
    const returList = await ReturGudang.find(filter);

    // Jika tidak ada data yang ditemukan
    if (returList.length === 0) {
      return res.status(404).json({ message: 'Tidak ada data retur ditemukan' });
    }

    // Kirim respon sukses dengan data
    res.status(200).json({
      message: 'Data retur berhasil diambil',
      data: returList,
    });
  } catch (error) {
    console.error('Error saat mengambil data retur:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server' });
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
router.post('/addPenjualan', async (req, res) => {
  const { customerId, cartId, status, metodePembayaran } = req.body;

  // Validasi input
  if (!customerId || !Array.isArray(cartId) || typeof status !== 'boolean' || !metodePembayaran) {
    return res.status(400).json({
      error: 'Data pelanggan, keranjang, status, dan metode pembayaran wajib diisi dengan format yang benar.',
    });
  }

  // Validasi metode pembayaran
  if (!['cash', 'transfer'].includes(metodePembayaran)) {
    return res.status(400).json({
      error: 'Metode pembayaran harus berupa "cash" atau "transfer".',
    });
  }

  try {
    // Ambil data pelanggan
    const customer = await Customer.findById(customerId).select('Nama_lengkap No_telepone');
    if (!customer) {
      return res.status(404).json({ error: 'Pelanggan tidak ditemukan.' });
    }

    // Ambil data keranjang menggunakan cartId
    const carts = await Cart.find({ _id: { $in: cartId } }).select('namaBarang totalProduct harga');
    if (carts.length !== cartId.length) {
      return res.status(404).json({
        error: 'Beberapa item dalam keranjang tidak ditemukan.',
        missingItems: cartId.filter(id => !carts.some(cart => cart._id.equals(id))),
      });
    }

    // Hitung total barang dan total harga
    const totalBarang = carts.reduce((sum, cart) => sum + cart.totalProduct, 0);
    const totalHarga = carts.reduce((sum, cart) => sum + cart.harga * cart.totalProduct, 0);

    // Perbarui stok barang berdasarkan keranjang
    for (const cart of carts) {
      const product = await Product.findOne({ Nama_product: cart.namaBarang });
      if (!product) {
        return res.status(404).json({ error: `Produk ${cart.namaBarang} tidak ditemukan.` });
      }

      if (product.Stock_barang < cart.totalProduct) {
        return res.status(400).json({
          error: `Stok barang untuk ${cart.namaBarang} tidak mencukupi.`,
          availableStock: product.Stock_barang,
        });
      }

      // Kurangi stok barang
      product.Stock_barang -= cart.totalProduct;
      await product.save();
    }

    // Buat nomor invoice unik
    const nomorInvoice = `INV-${Date.now()}`;

    // Format tanggal menggunakan moment.js
    const formattedDate = moment().format('DD/MM/YYYY, HH:mm:ss');

    // Data penjualan yang akan disimpan
    const penjualanData = {
      idPenjualan: `PJ${Date.now()}`,
      nomorInvoice, // Tambahkan nomor invoice
      idCart: carts.map(cart => cart._id),
      namaBarang: carts.map(cart => cart.namaBarang).join(', '),
      totalBarang,
      totalHarga,
      tanggalPembelian: formattedDate, // Gunakan format tanggal yang diperbaiki
      Customer_id: customer._id,
      status,
      metodePembayaran, // Tambahkan metode pembayaran
    };

    // Simpan data penjualan ke database
    const penjualanRecord = await Penjualan.create(penjualanData);

    // Populate data penjualan dengan informasi lengkap
    const populatedPenjualan = await Penjualan.findById(penjualanRecord._id)
      .populate('Customer_id', 'Nama_lengkap No_telepone') // Populate customer info
      .populate('idCart', 'namaBarang totalProduct harga'); // Populate cart items

    // Respons sukses
    res.status(201).json({
      message: 'Penjualan berhasil disimpan dan stok barang diperbarui.',
      data: populatedPenjualan,
    });
  } catch (error) {
    console.error('Error saat menyimpan penjualan:', error);

    // Penanganan error spesifik untuk validasi MongoDB
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Data penjualan tidak valid.',
        details: error.errors,
      });
    }

    // Penanganan error default
    res.status(500).json({
      error: 'Terjadi kesalahan pada server.',
      details: error.message,
    });
  }
});


router.get('/getPenjualan', async (req, res) => {
  try {
    // Ambil semua data penjualan tanpa filter
    const penjualanData = await Penjualan.find()
      .populate('Customer_id') // Populate data customer
      .populate('idCart');    // Populate data cart

    if (!penjualanData || penjualanData.length === 0) {
      return res.status(404).json({ message: 'Tidak ada data penjualan yang ditemukan' });
    }

    res.status(200).json({
      message: 'Semua data penjualan berhasil diambil',
      data: penjualanData,
    });
  } catch (error) {
    console.error('Error saat mengambil semua data penjualan:', error);
    res.status(500).json({
      error: 'Terjadi kesalahan pada server',
      details: error.message,
    });
  }
});


//chat
const sendMessage = async (chatId, senderId, senderRole, message) => {
  const newMessage = new Message({
    chatId,
    sender: senderId,
    senderRole,
    message,
  });

  await newMessage.save();

  // Perbarui lastMessage di chat
  const chat = await Chat.findById(chatId);
  chat.lastMessage = message;
  chat.updatedAt = Date.now();
  await chat.save();

  console.log('Message sent:', newMessage);
};
const getMessages = async (chatId) => {
  const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
  console.log('Messages:', messages);
};

router.post('/create', async (req, res) => {
  const { participants, participantRoles } = req.body;

  try {
    const chat = new Chat({ participants, participantRoles });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Error creating chat', error });
  }
});

// Send a message
router.post('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  const { sender, senderRole, message } = req.body;

  try {
    const newMessage = new Message({
      chatId,
      sender,
      senderRole,
      message,
    });

    await newMessage.save();

    // Update lastMessage in Chat
    const chat = await Chat.findById(chatId);
    if (chat) {
      chat.lastMessage = message;
      chat.updatedAt = Date.now();
      await chat.save();
    }

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message', error });
  }
});

// Get all chats for a participant
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const chats = await Chat.find({ participants: userId })
      .sort({ updatedAt: -1 })
      .populate('participants', 'nama_lengkap email');
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving chats', error });
  }
});

// Get all messages for a chat
router.get('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages', error });
  }
});

// Mark a message as read
router.put('/messages/:messageId/read', async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);
    if (message) {
      message.isRead = true;
      await message.save();
      res.status(200).json({ message: 'Message marked as read', data: message });
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error marking message as read', error });
  }
});

module.exports = router;
