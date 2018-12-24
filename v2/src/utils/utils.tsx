import axios from "axios";

const RoundOf = (num: number, roundTo: number): number=> {
    return Number((num).toFixed(roundTo));
};

const getUpdate = async (symbol: string) => {
    return await axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote`)       
}

export {
    RoundOf,
    getUpdate
}
