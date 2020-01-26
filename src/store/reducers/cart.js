import Types from '../types';

const initialState = {
    items: []
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_PRODUCT_TO_CART:
            let cartItems = state.items ?? [];
            cartItems.push(action.payload)
            return Object.assign({}, state, {
                items: cartItems
            });
        case Types.REMOVE_PRODUCT_FROM_CART:
            /**
             * @var {array} existingCartItems
             */
            let existingCartItems = state.items.map(x => x);
            existingCartItems = existingCartItems.filter(x => x.productId !== action.payload);
            return Object.assign({}, state, {
                items: existingCartItems
            });
        case Types.SET_AMOUNT_FOR_PRODUCT_IN_CART:
            let items = state.items.map(x => x);
            items.forEach((item, index) => {
                if (item.productId === action.payload.productId) {
                    items[index].amount = action.payload.amount;
                }
            });
            return Object.assign({}, state, {
                items: items
            });
        default:
            return state
    }
}

export default cart;