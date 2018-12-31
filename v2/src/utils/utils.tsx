import axios from "axios";
require("dotenv").config()

import store from "../reduxStore/store";
import AddCompany from "../actions/Addcompany"
import Set from "../actions/SetMoney"

const RoundOf = (num: number, roundTo: number): number=> {
    return Number((num).toFixed(roundTo));
};

const getUpdate = async (symbol: string) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/${symbol}/batch?types=quote`)       
}

const getInitialValue = () => {
    if(sessionStorage.getItem("User_ID")) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/company`, {headers: {"x-auth": sessionStorage.getItem("JWT_Token")}}).then(data => {
            data.data.map(item => {
                store.dispatch(AddCompany(item))
            })
        })

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/money`, {headers: {"x-auth": sessionStorage.getItem("JWT_Token")}}).then(data => {
            if(data.data[0] === undefined) {
                axios.post(`${process.env.REACT_APP_BACKEND_URL}/state/money`, {money: 10000}, {headers: {"x-auth": sessionStorage.getItem("JWT_Token")}}).then(() => {
                    store.dispatch(Set(10000))
                })
            }
            store.dispatch(Set(data.data[0].money))
        })
    }
}

export {
    RoundOf,
    getUpdate,
    getInitialValue
}
