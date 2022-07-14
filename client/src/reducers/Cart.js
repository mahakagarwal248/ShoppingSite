const cartReducer = (state = {data:null}, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {...state};
        case 'FETCH_CART_PRODUCTS':
            return {...state, data:action.payload};
        default:
            return state;
    }
}

export default cartReducer;