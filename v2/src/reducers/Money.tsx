import { RoundOf } from "../utils/utils";
import axios from "axios";

// import {id} from "../App"

interface Money {
    money: number
    _creator: string
}

interface Action {
    type: string,
    payload: number
}

const money: Money = {
    money: 10000,
    _creator: null
}

export default (state: Money = money, action: Action) => {
    switch (action.type) {
        case "BUY":
            const value = RoundOf(state.money - action.payload, 2)
            axios.patch("http://localhost:3001/state/money", {money: value}, {headers: {"x-auth": localStorage.getItem("JWT_Token")}})
            return {
                money: value
            }
        
        case "SELL":
            const sValue = RoundOf(state.money + action.payload, 2)
            axios.patch("http://localhost:3001/state/money", {money: sValue}, {headers: {"x-auth": localStorage.getItem("JWT_Token")}})
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