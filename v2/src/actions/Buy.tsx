export default (buyValue: number) => {
    return {
        type: "BUY",
        payload: buyValue
    };
};