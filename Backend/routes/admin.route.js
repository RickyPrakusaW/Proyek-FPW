const express = require('express');
const multer = require('multer');
const path = require('path');
const Karyawan = require('../models/Kariawan');
const Product = require('../models/Product');
const ReturAdmin = require('../models/Retur_admin');
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
      password, // Menambahkan field password
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
      !foto_ktp ||
      !password // Pastikan password juga diisi
    ) {
      return res.status(400).json({ error: 'Semua field wajib diisi!' });
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

module.exports = router;
