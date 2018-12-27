export default (money: number) => {
    return {
        type: "SET",
        payload: money
    };
};