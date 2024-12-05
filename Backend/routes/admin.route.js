const express = require('express')
const router = express()

const Karyawan = require("../models/Kariawan")
const StockGudang = require("../models/Stock_gudang")
const BarangRetur = require("../models/Retur_admin")
const Product = require("../models/Product")


router.post("/addKaryawan", async (req, res) => {
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
        ktp,
    } = req.body;

    if (!id_karyawan || !nama_lengkap || !tempat_lahir || !tanggal_lahir || !jenis_kelamin || !alamat || !no_telepon || !agama || !ktp) {
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
            ktp,
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
router.get("/fetchKaryawan", async (req, res) => {
    const fetchKaryawan = await Karyawan.find();
    return res.status(200).json(fetchKaryawan)
})

router.get("/fetchStockGudang", async (req, res) => {
    const fetchStockGudang = await StockGudang.find();
    return res.status(200).json(fetchStockGudang)
})

router.get("/fetchBarangRetur", async (req, res) => {
    const fetchBarangRetur = await BarangRetur.find();
    return res.status(200).json(fetchBarangRetur)
})

router.get("fetchProduct", async (req, res) => {
    const fetchProduct = await Product.find();
    return res.status(200).json(fetchProduct)
})
module.exports= router;