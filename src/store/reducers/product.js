import Types from '../types';

const initialState = {
    products: [],
}

const product = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_PRODUCTS:
            return Object.assign({}, state, {
                products: action.payload
            });
        default:
            return state
    }
}

export default product;