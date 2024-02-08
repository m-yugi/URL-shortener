require('dotenv').config()
const express = require('express')
const path = require('path')
const router = require('./routes/urlRouter')
const connectToDb = require("./connect")
const staticRouter = require('./routes/staticRouter')
const userRouter = require('./routes/loginRouter')
const cookie_parser = require('cookie-parser')
const app = express()
const PORT = process.env.PORT || 8080


app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))
app.use(express.json())
app.use(cookie_parser())
app.use(express.urlencoded({ extended: true }))
app.use('/', staticRouter)
app.use('/url', router)
app.use('/user', userRouter)
app.use('/views', express.static('views'))

connectToDb().then(() => {
    console.log("connected to db")
}).catch((error) => {
    console.log(error)
})


app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`)
})