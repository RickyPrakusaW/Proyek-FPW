const express = require("express")
const path = require("path");
// import adminRouter from './admin.route.js';
const adminRouter = require("./admin.route")

const router = express()

router.use("/admin", adminRouter)
router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
module.exports = router