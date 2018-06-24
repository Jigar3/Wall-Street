const portfolio = []

const Portfolio = (state = portfolio, action) => {
    switch (action.type) {
        case "ADD":
            return state.concat(action.payLoad)
        
        case "DELETE":
            return state.filter(item => state.indexOf(item) !== action.payLoad)
            
        default:
            return state
    }
}

export default Portfolio;