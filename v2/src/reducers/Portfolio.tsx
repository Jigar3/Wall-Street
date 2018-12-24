import update from 'react-addons-update';

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
        
        case "REFRESH":
            return state.map((item, index) => {
                console.log("From reducer")
                if(index !== action.payload.index) {
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