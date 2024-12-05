const express = require('express')
const adminRouter = require('./admin.route')

const router = express()

router.use("/admin", adminRouter)
module.exports = router