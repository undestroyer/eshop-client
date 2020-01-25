import Types from '../types';

export const setProducts = products => ({
    type: Types.SET_PRODUCTS,
    payload: products
});