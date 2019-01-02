import axios from "axios";
import moment from "moment";
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

// const getMarketStatus = () => {
//     axios.get("https://api.iextrading.com/1.0/stock/aapl/batch?types=quote").then(data => {
    
//         const openTime = moment(data.data.quote.latestUpdate)
//         const currTime = moment()
//         if(currTime.isBefore(openTime)) {
//             sessionStorage.setItem("status", "OPEN")
//         } else {
//             sessionStorage.setItem("status", "CLOSE")
//         }
//     })
// }

const getMarketStatus = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/state/market`).then(data => {
        // console.log(data.data)
        // if(data.data.stat === "US Market Open") {
        //     sessionStorage.setItem("status", "OPEN")
        // } else {
        //     sessionStorage.setItem("status", "CLOSE")
        // }
        sessionStorage.setItem("status", data.data.status)
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
