const express = require('express')
const router = express.Router()
const { createShortUrl, redirectToWebsite, getRedirectCount } = require('../controllers/urlController')
const { checkAuthfromClient } = require('../middlewares/clientAuth')
//routes
router.post("/", checkAuthfromClient, createShortUrl)
router.get("/:id", redirectToWebsite)
router.get("/analytics/:id", checkAuthfromClient, getRedirectCount)

module.exports = router