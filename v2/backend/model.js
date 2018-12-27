const mongoose = require("mongoose")
const url = "mongodb://localhost:27017/wall-street"

mongoose.connect(url).then(() => {
    console.log("Connected to DB")
})

const Schema = mongoose.Schema

const moneySchema = new Schema({
    money: {
        type: Number,
        required: true,
        default: 10000
    }
})

const companySchema = new Schema({
    id: { type: String, required: true },
    companyName: { type: String, required: true },
    company: { type: String, required: true },
    quantity: { type: Number, required: true },
    buyPrice: { type: Number, required: true },
    currPrice: { type: Number, required: true },
    shareWorth: { type: Number, required: true },
    profitLoss: { type: Number, required: true }
})

module.exports = {
    Money: mongoose.model("Money", moneySchema),
    Portfolio: mongoose.model("Portfolio", companySchema)
}