import Types from '../types';

export const setPage = pageName => ({
    type: Types.SET_PAGE,
    payload: pageName
});
