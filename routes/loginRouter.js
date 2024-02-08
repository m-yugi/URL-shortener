const router = require('express').Router()
const { serveLoginPage, userAuthentication, ServeRegisterUser, registerUser } = require('../controllers/loginController')
router.route('/login')
    .get(serveLoginPage)
    .post(userAuthentication)
router.route('/register')
    .get(ServeRegisterUser)
    .post(registerUser)
module.exports = router