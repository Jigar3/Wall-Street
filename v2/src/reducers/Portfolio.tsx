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
            return state.filter(item => item.id !== action.payload);
        
        case "REFRESH":
            return state.map((item) => {
                if(item.id !== action.payload.id) {
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