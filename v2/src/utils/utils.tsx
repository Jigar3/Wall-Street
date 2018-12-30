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
    console.log("Got Initial Value")
    if(localStorage.getItem("User_ID")) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/company`, {headers: {"x-auth": localStorage.getItem("JWT_Token")}}).then(data => {
            data.data.map(item => {
                store.dispatch(AddCompany(item))
            })
        })

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/money`, {headers: {"x-auth": localStorage.getItem("JWT_Token")}}).then(data => {
            store.dispatch(Set(data.data[0].money))
        })
    }
}

export {
    RoundOf,
    getUpdate,
    getInitialValue
}
