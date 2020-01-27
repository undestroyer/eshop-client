import Types from '../types';

const initialState = {
    products: [],
    loadingError: ''
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_PRODUCTS:
            return Object.assign({}, state, {
                products: action.payload
            });
        case Types.PRODUCTS_LOADING_ERROR:
            return Object.assign({}, state, {
                loadingError: action.payload
            });
        default:
            return state
    }
}

export default product;