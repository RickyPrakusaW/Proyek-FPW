const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./routes/index')

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors()); // Mengizinkan koneksi dari frontend (React)
app.use(express.json()); // Parsing JSON request body
app.use(express.urlencoded({ extended: true }))

app.use('/api', api)

// Koneksi ke MongoDB
mongoose.connect('mongodb://localhost:27017/Proyek_Fpw', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Jalankan server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
