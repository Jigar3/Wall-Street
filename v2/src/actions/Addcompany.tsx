interface CompanyDetail {
    company: string,
    quantity: number,
    buyPrice: number,
    currPrice: number,
    shareWorth: number,
    profitLoss: number
}

export default (companyDetail: CompanyDetail) => {
    const {
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
            company,
            quantity,
            buyPrice,
            currPrice,
            shareWorth,
            profitLoss
        }
    };
};