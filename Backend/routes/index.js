const express = require("express")
// import adminRouter from './admin.route.js';
const adminRouter = require("./admin.route")

const router = express()

router.use("/admin", adminRouter)

module.exports = router