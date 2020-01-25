import Types from '../types';

export const logIn = token => ({
    type: Types.LOG_IN,
    payload: token
});

export const logOut = () => ({
    type: Types.LOG_OUT,
    payload: null
})