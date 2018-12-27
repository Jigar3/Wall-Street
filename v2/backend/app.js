const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const state = require("./routes")

const app = express()

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors())

app.use("/state", state)

app.get("/", (req, res) => {
    res.send("Hey There How are you?")
})

app.listen(3001, () => {
    console.log("Started the backend server at port 3001")
})