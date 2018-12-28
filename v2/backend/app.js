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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Started the backend server at port " + PORT)
})