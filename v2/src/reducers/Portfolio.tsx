const portfolio = []

interface Action {
    type: string,
    payload: any
}

export default (state: any = portfolio, action: Action) => {
    switch(action.type) {
        case "ADD":
            console.log(!state.includes(action.payload))
            if(!state.includes(action.payload)) {
                return state.concat(action.payload);
            }
            return state

        case "DELETE":
            return state.filter(item => item.id !== action.payload);
        
        case "REFRESH":
            return state.map((item) => {
                if(item._id !== action.payload.id) {
                    return item;
                }

                return {
                    ...item,
                    ...action.payload.companyDetails
                }
            })

        default:
            return state;
    };
};