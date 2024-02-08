const shortid = require('shortid')
const urlmodel = require('../models/urlModel')


async function createShortUrl(req, res) {
    const urlid = await shortid()
    const url = req.body.url;
    if (!url) {
        return res.status(400).json({ error: "url is required" })
    }
    urlmodel.create({
        urlid: urlid,
        redirecturl: (String(url).substring(0, 8) !== "https://") ? `https://${url}` : url,
        clickcount: 0,
    }).then()
    return res.redirect(302, `/success?shorturl=http://localhost:8080/url/${urlid}`)
    // return res.status(201).json({ "shorturl": `http://localhost:8080/url/${urlid}` })
}


async function redirectToWebsite(req, res) {
    const id = req.params.id
    const redirecturl = await urlmodel.findOne({ urlid: id }, { redirecturl: 1, clickcount: 1, _id: 0 })
    if (redirecturl) {
        urlmodel.updateOne({ urlid: id }, { $inc: { clickcount: 1 } }).then()
        return res.redirect(302, redirecturl.redirecturl)
    }
    else {
        return res.json({ "error": "please provide a valid url" })
    }
}

async function getRedirectCount(req, res) {
    const id = req.params.id
    const redirectcount = await urlmodel.findOne({ urlid: id }, { clickcount: 1, _id: 0 })
    return res.json(redirectcount)
}


module.exports = { createShortUrl, redirectToWebsite, getRedirectCount }