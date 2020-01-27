import Types from '../types';

export const addProductToCart = (productId, amount) => ({
    type: Types.ADD_PRODUCT_TO_CART,
    payload: {
        productId: productId,
        amount: amount
    }
});

export const removeProductFromCart = productId => ({
    type: Types.REMOVE_PRODUCT_FROM_CART,
    payload: productId
})

export const setAmountForProductInCart = (productId, amount) => ({
    type: Types.SET_AMOUNT_FOR_PRODUCT_IN_CART,
    payload: {
        productId: productId,
        amount: amount
    }
});

export const lockCart = () => ({
    type: Types.LOCK_CART
});

export const resetCart = () => ({
    type: Types.RESET_CART
})