import Types from '../types';

const initialState = {
    pageName: 'index',
}

const navigation = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_PAGE:
            return Object.assign({}, state, {
                pageName: action.payload
            });
        default:
            return state
    }
}

export default navigation;