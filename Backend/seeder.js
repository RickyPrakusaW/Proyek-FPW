const mongoose = require('mongoose')
const express = require("express")
const api = require("./routes/index")
const cors = require("cors")

// Inisialisasi aplikasi Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000
app.use('/api', api);

// Koneksi ke MongoDB
app.listen(port, async () => {
  try{
      await mongoose.connect('mongodb://127.0.0.1:27017/Proyek_Fpw')
      console.log('Database connected')
  }
  catch(e){
      console.log('Error database connection \n', e)
  }
  console.log(`listening on port ${port}!`)
})
