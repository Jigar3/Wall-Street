const RoundOf = (num: number, roundTo: number): number=> {
    return Number((num).toFixed(roundTo));
};

export {
    RoundOf
}