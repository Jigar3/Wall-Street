import axios from "axios";

import store from "../reduxStore/store";
import AddCompany from "../actions/Addcompany"
import Set from "../actions/SetMoney"

const RoundOf = (num: number, roundTo: number): number=> {
    return Number((num).toFixed(roundTo));
};

const getUpdate = async (symbol: string) => {
    return await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote`)       
}

const getInitialValue = () => {
    if(localStorage.getItem("User_ID")) {
        axios.get("http://localhost:3001/state/company", {headers: {"x-auth": localStorage.getItem("JWT_Token")}}).then(data => {
            data.data.map(item => {
                store.dispatch(AddCompany(item))
            })
        })

        axios.get("http://localhost:3001/state/money", {headers: {"x-auth": localStorage.getItem("JWT_Token")}}).then(data => {
            store.dispatch(Set(data.data[0].money))
        })
    }
}

export {
    RoundOf,
    getUpdate,
    getInitialValue
}
