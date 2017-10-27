//'use strict';
import types from '../../constants/ActionTypes';
// import {fetchStatus} from "ws-web-utils";

const initialState = {
    data : {

    },
    fetchStatus : {

    },
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.user.GET_USER_CARD_ORDER_DETAIL_DATA:
            return Object.assign({}, state, {
                data: Object.assign({},state.data,action.data),
                fetchStatus: Object.assign({},state.fetchStatus,action.fetchStatus),
            })
        default:
            return state;
    }
}
