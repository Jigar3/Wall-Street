import { RoundOf } from "../utils/utils";
import axios from "axios";

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
            const value = RoundOf(state.money - action.payload, 2)
            axios.patch("http://localhost:3001/state/money", {id: "5c24b7fa21fee92010930dcf", money: value})
            return {
                money: value
            }
        
        case "SELL":
            const sValue = RoundOf(state.money + action.payload, 2)
            axios.patch("http://localhost:3001/state/money", {id: "5c24b7fa21fee92010930dcf", money: sValue})
            return {
                money: sValue
            }

        case "SET":
            return {
                money: action.payload
            }
        
        default:
            return state;
    };
}