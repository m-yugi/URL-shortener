
async function serveHomePage(req, res) {
    return res.render('home');
}
function postRedirectGet(req, res) {
    res.render('success', { shorturl: req.query.shorturl })
}
module.exports = { serveHomePage, postRedirectGet }