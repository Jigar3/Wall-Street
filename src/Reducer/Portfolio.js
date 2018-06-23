const initialState = []

const Portfolio = (state = initialState, action) => {
    switch (action.type) {
        case "ADD":
            return state.concat(action.payLoad)
            
        default:
            return initialState
    }
}

export default Portfolio;