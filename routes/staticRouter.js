const router = require('express').Router()
const { serveHomePage, postRedirectGet } = require('../controllers/staticController')
const { checkAuthfromClient } = require('../middlewares/clientAuth')
router.get('/', checkAuthfromClient, serveHomePage)
router.get('/success', postRedirectGet)
module.exports = router