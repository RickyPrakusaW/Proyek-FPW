const express = require('express');
const router = express();
const multer = require('multer');
const path = require('path');

const Karyawan = require("../models/Kariawan");
const StockGudang = require("../models/Stock_gudang");
const BarangRetur = require("../models/Retur_admin");
const Product = require("../models/Product");

// Setup storage engine untuk Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Menyimpan file di folder 'uploads/'
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Menambahkan timestamp untuk nama file
    }
});

// Filter file hanya untuk foto (JPEG, JPG, PNG)
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Hanya file gambar (JPEG, JPG, PNG) yang diizinkan.'));
    }
};

// Inisialisasi multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('foto_ktp'); // 'foto_ktp' adalah nama field untuk file foto

// Route untuk menambahkan Karyawan
router.post("/addKaryawan", upload, async (req, res) => {
    console.log(req.body);
    const {
        id_karyawan,
        nama_lengkap,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        golongan_darah,
        alamat,
        no_telepon,
        agama,
    } = req.body;

    // Pastikan ada foto KTP
    const foto_ktp = req.file ? req.file.filename : null;

    if (!id_karyawan || !nama_lengkap || !tempat_lahir || !tanggal_lahir || !jenis_kelamin || !alamat || !no_telepon || !agama || !foto_ktp) {
        return res.status(400).json({ error: "Semua field wajib diisi!" });
    }

    try {
        const existingKaryawan = await Karyawan.findOne({ id_karyawan });
        if (existingKaryawan) {
            return res.status(400).json({ error: "ID Karyawan sudah terdaftar!" });
        }

        const newKaryawan = new Karyawan({
            id_karyawan,
            nama_lengkap,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin,
            golongan_darah,
            alamat,
            no_telepon,
            agama,
            foto_ktp, // Menyimpan nama file foto KTP
        });

        const savedKaryawan = await newKaryawan.save();
        res.status(201).json({
            message: "Karyawan berhasil ditambahkan",
            data: savedKaryawan,
        });
    } catch (error) {
        console.error("Error saat menambahkan karyawan:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

// Fetch routes
router.get("/fetchKaryawan", async (req, res) => {
    try {
        const fetchKaryawan = await Karyawan.find();
        return res.status(200).json(fetchKaryawan);
    } catch (error) {
        console.error("Error fetching karyawan:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

router.get("/fetchStockGudang", async (req, res) => {
    try {
        const fetchStockGudang = await StockGudang.find();
        return res.status(200).json(fetchStockGudang);
    } catch (error) {
        console.error("Error fetching stock gudang:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

router.get("/fetchBarangRetur", async (req, res) => {
    try {
        const fetchBarangRetur = await BarangRetur.find();
        return res.status(200).json(fetchBarangRetur);
    } catch (error) {
        console.error("Error fetching barang retur:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

router.get("/fetchProduct", async (req, res) => {
    try {
        const fetchProduct = await Product.find();
        return res.status(200).json(fetchProduct);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: "Terjadi kesalahan pada server" });
    }
});

module.exports = router;
