const AddCompany = ( companyDetail = {} ) => {
    const {
        company = '',
        quantity = 0,
        buyPrice = 0,
        currPrice = 0,
        shareWorth = 0,
        profitLoss = 0
    } = companyDetail;
    
    return {
        type: "ADD",
        payLoad: {
            company,
            quantity,
            buyPrice,
            currPrice,
            shareWorth,
            profitLoss
        }
    }
}

export default AddCompany;