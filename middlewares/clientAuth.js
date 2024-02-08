require('dotenv').config()
const jwt = require('jsonwebtoken');

async function checkAuthfromClient(req, res, next) {
    const barer = req.cookies?.token;

    if (!barer) {
        return res.redirect('/user/login')
    }
    const token = barer.split(' ')[1]
    if (!jwt.verify(token, process.env.JWT_SECRET)) {
        return res.redirect('/user/login')
    }
    else {
        next()
    }
}

module.exports = { checkAuthfromClient }