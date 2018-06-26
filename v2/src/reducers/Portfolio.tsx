const portfolio = []

interface Action {
    type: string,
    payload: any
}

export default (state = portfolio, action: Action) => {
    switch(action.type) {
        case "ADD":
            return state.concat(action.payload);

        case "DELETE":
            return state.filter(item => state.indexOf(item) !== action.payload);

        default:
            return state;
    };
};