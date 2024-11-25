const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors()); // Mengizinkan koneksi dari frontend (React)
app.use(express.json()); // Parsing JSON request body

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/Proyek_Fpw', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema Kepala Gudang
const kepalaGudangSchema = new mongoose.Schema({
  Id_kepala_gudang: { type: String, required: true, unique: true },
  First_name: { type: String, required: true },
  Last_name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Ktp: { type: String, required: true },
  Status: { type: Boolean, required: true }
}, { timestamps: true });

const KepalaGudang = mongoose.model('KepalaGudang', kepalaGudangSchema);



// Jalankan server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
