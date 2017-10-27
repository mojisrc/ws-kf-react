//'use strict';

import types from '../../constants/ActionTypes';
// import {fetchStatus} from "ws-web-utils";

const initialState = {
    userActualCardPickId : null,
    userActualCardShow : true
}

export default function userIndex(state = initialState, action) {
    switch (action.type) {
        case types.user.GET_GIFT_DATA:
            return Object.assign({}, state, {
                userActualCardPickId: action.userActualCardPickId,
                userActualCardShow : action.userActualCardShow
            })
        default:
            return state;
    }
}
