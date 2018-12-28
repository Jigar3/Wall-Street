const express = require("express")
const router = express.Router()
const _ = require("lodash")

const { authenticate } = require("../middleware/authenticate")
const { User } = require("../models/user")

router.post("/signup", (req, res) => {
    let body = _.pick(req.body, ["email", "password"])
    console.log(body)

    let user = new User(body)

    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch(err => {
        res.status(400).send(err)
    })
})

router.get("/me", authenticate, (req, res) => {
    res.send(req.user)
})

router.post("/login", (req, res) => {
    let body = _.pick(req.body, ["email", "password"])

    User.findByCredentials(body.email, body.password).then(user => {
        return user.generateAuthToken().then(token => {
            res.header('x-auth', token).send(user)
        })
    }).catch(err => {
        res.status(400).send(err)
    })
})

router.delete("/logout", authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send("logged out")
    }).catch(err => {
        res.status(400).send(err)
    })
})

module.exports = router