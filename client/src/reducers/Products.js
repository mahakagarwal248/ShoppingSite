const productReducer = (state={data:null}, action) =>{
    switch (action.type) {
        case 'FETCH_ALL_PRODUCTS':
            return {...state, data:action.payload};
        default:
            return state;
    }
}

export default productReducer