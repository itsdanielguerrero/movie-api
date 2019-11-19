const express = require('express')
const app = express()
const models = require('./models')
const PORT = process.env.PORT || 1338

app.get('/', (req, res) => {
    res.send("Welcome to my Movie App!!!")
})

app.all('*', (req, res) => {
    res.send("Oops looks like you did not find what you were looking for...")
})

app.listen(PORT, () => {
    console.log("Server is up and running!")
})