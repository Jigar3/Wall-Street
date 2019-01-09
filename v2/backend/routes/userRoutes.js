const express = require("express")
const router = express.Router()
const _ = require("lodash")

const { authenticate } = require("../middleware/authenticate")
const { User } = require("../models/user")
const { Portfolio } = require("../models/model")

router.post("/signup", (req, res) => {
    let body = _.pick(req.body, ["email", "password", "name"])

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


// router.get("/leaderboard", (req, res) => {

//     leaderboard = []
//     User.find().then(data => {
//         data.map(user => {
            
//             Portfolio.find({_creator: user._id}).then(portfolio => {
//                 profitLoss = 0
//                 no_of_stocks_giving_profit = 0
//                 no_of_stocks_giving_loss = 0
//                 portfolio.map(item => {
//                     if(item.profitLoss >= 0) {no_of_stocks_giving_profit++}
//                     if(item.profitLoss < 0) {no_of_stocks_giving_loss++}
//                     profitLoss += item.profitLoss
//                 })
//                 leaderboard_data = {
//                     creator_id: user._id,
//                     creator_name: user.name,
//                     no_of_stocks: portfolio.length,
//                     no_of_stocks_giving_profit,
//                     no_of_stocks_giving_loss,
//                     profitLoss: Number(profitLoss).toFixed(2)
//                 }
//                 leaderboard.push(leaderboard_data)
//             })

            
//         })

//         setTimeout(() => {
//             leaderboard.sort((a, b) => {
//                 return b.profitLoss - a.profitLoss
//             })
//             res.send(leaderboard)
//         }, 1000)
        
//     })
// })

router.get("/leaderboard", (req, res) => {
    User.aggregate([
        {
            $lookup:
                {
                    from: "portfolios",
                    localField: "_id",
                    foreignField: "_creator",
                    as: "portfolio"
                }
        },
        {
            $lookup:
                {
                    from: "money",
                    localField: "_id",
                    foreignField: "_creator",
                    as: "money"
                }
            }
        ]).then(data => {
            leaderboard = []
            data.map(user => {
                money = user.money[0].money
                shareWorth = 0
                user.portfolio.map(port => {
                    shareWorth += port.shareWorth
                })

                leaderboard_data = {
                    creator: user._id,
                    name: user.name,
                    profitLoss: (money + shareWorth - 10000).toFixed(2)
                }

                leaderboard.push(leaderboard_data)
            })
            leaderboard.sort((a,b) => {
                return b.profitLoss - a.profitLoss
            })
            res.send(leaderboard)
        })
})

module.exports = router