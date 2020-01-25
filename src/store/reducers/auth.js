import Types from '../types';

const initialState = {
    token: null,
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case Types.LOG_IN:
            return Object.assign({}, state, {
                token: action.payload
            });
        case Types.LOG_OUT:
            return Object.assign({}, state, {
                token: null
            });
        default:
            return state
    }
}

export default auth;