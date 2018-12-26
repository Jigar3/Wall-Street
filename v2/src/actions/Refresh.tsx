export default ({id, companyDetails}) => {
    return {
        type: "REFRESH",
        payload: {
            id,
            companyDetails
        }
    };
};