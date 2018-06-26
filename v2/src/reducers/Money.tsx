import { RoundOf } from "../utils/utils";

interface Money {
    money: number
}

interface Action {
    type: string,
    payload: number
}

const money: Money = {
    money: 10000
}

export default (state: Money = money, action: Action) => {
    switch (action.type) {
        case "BUY":
            return {
                money: RoundOf(state.money - action.payload, 2)
            }
        
        case "SELL":
            return {
                money: RoundOf(state.money + action.payload, 2)
            }
        
        default:
            return state;
    };
}