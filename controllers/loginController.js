require('dotenv').config()
const users = require('../models/loginModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
async function userAuthentication(req, res) {
    const { username, password } = req.body
    const db_password = await users.findOne({ username: username }, { password: 1, _id: 1, username: 1 })
    if (await bcrypt.compare(password, db_password.password)) {
        const payload = {
            username: db_password.username,
            role: db_password.role,
        }
        return res.cookie("token", ("Bearer " + await signJwtToken(payload)), { httpOnly: true }).redirect('/')
    }
    else {
        return res.redirect('/user/login')
    }
}

async function serveLoginPage(req, res) {
    res.status(200).render('login')
}

async function ServeRegisterUser(req, res) {
    res.status(200).render('register')
}
async function registerUser(req, res) {
    const { username, email, password } = req.body;
    users.create({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 11),
    })
        .then(async () => {
            const payload = {
                username: username,
                role:"NORMAL"
            }
            return res.status(201).cookie("token", ("Bearer " + await signJwtToken(payload)), { httpOnly: true }).redirect('/')
        })
        .catch((error) => {
            console.log(error)
            return res.redirect('/user/register')
        })
}
async function signJwtToken(payload) {
    return await jwt.sign(payload, process.env.JWT_SECRET);
}
module.exports = {
    userAuthentication,
    serveLoginPage,
    registerUser,
    ServeRegisterUser,
}