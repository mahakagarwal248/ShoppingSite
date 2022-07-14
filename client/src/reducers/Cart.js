const cartReducer = (state = {data:null}, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {...state};
        default:
            return state;
    }
}

export default cartReducer;