const mongoose = require("mongoose")
require('dotenv').config()

// Local Database
const url = "mongodb://localhost:27017/wall-street"

// Mlab Database
// const url = `mongodb://${process.env.USERNAME}:${process.env.PASSWORD}@ds225308.mlab.com:25308/wall-street`

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log("Connected to DB")
})

module.exports = {mongoose}