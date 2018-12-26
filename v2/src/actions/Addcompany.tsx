import uuidv4 from 'uuid/v4'

interface CompanyDetail {
    id: string,
    company: string,
    quantity: number,
    buyPrice: number,
    currPrice: number,
    shareWorth: number,
    profitLoss: number
}

export default (companyDetail: CompanyDetail) => {
    const {
        id = uuidv4(),
        company = '',
        quantity = 0,
        buyPrice = 0,
        currPrice = 0,
        shareWorth = 0,
        profitLoss = 0,
    } = companyDetail;

    return {
        type: "ADD",
        payload: {
            id,
            company,
            quantity,
            buyPrice,
            currPrice,
            shareWorth,
            profitLoss
        }
    };
};