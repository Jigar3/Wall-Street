import axios from "axios";
require("dotenv").config()

import store from "../reduxStore/store";
import AddCompany from "../actions/Addcompany"
import FetchSymbols from "../actions/FetchSymbols"
import Set from "../actions/SetMoney"

const RoundOf = (num: number, roundTo: number): number=> {
    return Number((num*1).toFixed(roundTo));
};

const getUpdate = async (symbol: string) => {
    return await axios.get(`${process.env.REACT_APP_API_URL}/${symbol}/batch?types=quote`)       
}

const getMarketStatus = () => {
    axios.get("https://api.iextrading.com/1.0/stock/aapl/batch?types=quote").then(data => {
    
        let status = data.data.quote.latestSource
        console.log(status.localeCompare("Close"))
        if(status.localeCompare("Close") == 0 || status.localeCompare("Previous close") == 0) {
            sessionStorage.setItem("status", "CLOSE")
        } else {
            sessionStorage.setItem("status", "OPEN")
        }
    })

}

const setUserName = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/me`, {headers: {"x-auth": sessionStorage.getItem("JWT_Token")}}).then(data => {
        sessionStorage.setItem("name", data.data.name)
        return data.data.name
    })
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

        axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/symbols`).then(data => {
            store.dispatch(FetchSymbols(data.data.data))
        })
        
        setUserName()
        getMarketStatus()
    }
}

export {
    RoundOf,
    getUpdate,
    getInitialValue,
    getMarketStatus,
    setUserName
}
