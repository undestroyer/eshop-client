import Types from '../types';

export const setProducts = products => ({
    type: Types.SET_PRODUCTS,
    payload: products
});

export const setProductLoadingError = error => ({
    type: Types.PRODUCTS_LOADING_ERROR,
    payload: error
})