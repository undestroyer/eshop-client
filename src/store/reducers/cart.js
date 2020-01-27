import Types from '../types';

const initialState = {
    items: [],
    lockedUntil: 0
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
        case Types.LOCK_CART:
            const date = new Date();
            date.setDate(date.getDate() + 1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return Object.assign({}, state, {
                lockedUntil: date.getTime()
            });
        case Types.RESET_CART:
            return Object.assign({}, initialState);
        default:
            return state
    }
}

export default cart;