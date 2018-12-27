const express = require("express")
const router = express.Router()
const _ = require("lodash")
const { Money, Portfolio } = require("./model")

router.get("/money", (req, res) => {
    Money.find().then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})

router.post("/money", (req, res) => {
    const money = _.pick(req.body, ["money"])

    Money.create(money).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})

router.patch("/money", (req, res) => {
    const updatedValue = _.pick(req.body, ["money"])

    Money.findById(req.body.id, (err, money) => {
        if(err) {
            res.send(err)
        } 
        else {
            if(money == null) {
                return res.send("Error occured")
            }
            money.set(updatedValue)
            money.save().then(data => {
                    res.send(data)
                }).catch(err => {
                    res.send(err)
                })
        }
    })
})

router.delete("/money", (req, res) => {
    Money.findById(req.body.id)
        .remove()
        .then(data => {
        res.send(data);
        console.log(data);
    })
    .catch(err => {
        res.send(err);
    });
});

router.get("/company", (req, res) => {
    Portfolio.find().then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})

router.post("/company", (req, res) => {
    const company = _.pick(req.body, ["id", "company", "companyName", "quantity", "buyPrice", "currPrice", "shareWorth", "profitLoss"])

    Portfolio.create(company).then(data => {
        res.send(data)
    }).catch(err => {
        res.send(err)
    })
})

router.patch("/company", (req, res) => {
    const updatedValue = _.pick(req.body, ["company", "companyName", "quantity", "buyPrice", "currPrice", "shareWorth", "profitLoss"])
    Portfolio.findOne({"id": req.body.id}, (err, company) => {
        if(err) {
            res.send(err)
        } else {
            if(company == null) {
                return res.send("some error occured")
            }
            company.set(updatedValue)
            company.save().then(data => {
                    res.send(data)
                }).catch(err => {
                    res.send(err)
                })
        }
    })
})

router.delete("/company", (req, res) => {
    Portfolio.find({"id": req.body.id}).remove()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.send(err)
        })
    }
)

module.exports = router