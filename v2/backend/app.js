const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const state = require("./routes/routes")
const users = require("./routes/userRoutes.js")

const app = express()

// Body Parser Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-auth');
    res.header('Access-Control-Expose-Headers', 'x-auth');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain)


// app.use(cors())

app.use("/state", state)
app.use("/users", users)

app.get("/", (req, res) => {
    res.send("Hey There How are you?")
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Started the backend server at port " + PORT)
})