const symbols = []

interface Action {
    type: string,
    payload: any
}

export default (state: any = symbols, action: Action) => {
    switch(action.type) {
        case "GET":
            return state

        case "SET_SYMBOL":
            return state.concat(action.payload)
        
        default:
            return state
    }
}