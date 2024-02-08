const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    urlid: {
        type: String,
        required: true,
        unique: true,
    },
    redirecturl: {
        type: String,
        required: true,
    },
    clickcount: {
        type: Number,
    }
})

const urlmodel = mongoose.model('url_data', urlSchema)

module.exports = urlmodel