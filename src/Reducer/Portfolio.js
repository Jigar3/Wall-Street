const portfolio = []

const Portfolio = (state = portfolio, action) => {
    switch (action.type) {
        case "ADD":
            return state.concat(action.payLoad)
            
        default:
            return state
    }
}

export default Portfolio;