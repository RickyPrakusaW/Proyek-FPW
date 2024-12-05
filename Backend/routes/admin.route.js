const express = require('express')
const router = express()

const Karyawan = require("../models/Kariawan")

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

module.exports= router;