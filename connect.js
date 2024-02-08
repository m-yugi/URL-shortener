require('dotenv').config()
const mongoose = require('mongoose')

async function connectToDb() {
    return mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB}`)
}

module.exports = connectToDb 