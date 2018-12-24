export default ({index, companyDetails}) => {
    return {
        type: "REFRESH",
        payload: {
            index,
            companyDetails
        }
    };
};