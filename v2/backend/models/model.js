const {mongoose} = require("./mongoose-setup")
require('dotenv').config()

const Schema = mongoose.Schema

const moneySchema = new Schema({
    money: {
        type: Number,
        required: true,
        default: 10000
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
    profitLoss: { type: Number, required: true },
    _creator: { type: mongoose.Schema.Types.ObjectId, required: true }
})

module.exports = {
    Money: mongoose.model("Money", moneySchema),
    Portfolio: mongoose.model("Portfolio", companySchema)
}