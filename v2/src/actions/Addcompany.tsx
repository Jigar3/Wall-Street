import uuidv4 from 'uuid/v4'

interface CompanyDetail {
    _id: string,
    companyName: string,
    company: string,
    quantity: number,
    buyPrice: number,
    currPrice: number,
    shareWorth: number,
    profitLoss: number
}

export default (companyDetail: CompanyDetail) => {
    const {
        _id = '',
        company = '',
        companyName = '',
        quantity = 0,
        buyPrice = 0,
        currPrice = 0,
        shareWorth = 0,
        profitLoss = 0,
    } = companyDetail;

    return {
        type: "ADD",
        payload: {
            _id,
            company,
            companyName,
            quantity,
            buyPrice,
            currPrice,
            shareWorth,
            profitLoss
        }
    };
};