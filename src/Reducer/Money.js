const as = require('as-type');

const money = {
    money: 10000
}

const Money = (state = money, action) => {
    switch (action.type) {
        case "BUY":
            return {
                money: as.float(state.money).toFixed(2) - as.float(action.payload).toFixed(2)
            }
            
        default:
            return state
    }
}

export default Money;