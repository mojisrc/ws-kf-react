import types from '../../constants/ActionTypes';
import {fetchStatus} from "ws-web-utils";

const initialState = {
    data : null,
    fetchStatus : fetchStatus.l,
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.user.GET_USER_CARD_DETAIL_DATA:
            return Object.assign({}, state, {
                data: action.data,
                fetchStatus: action.fetchStatus,
            })
        default:
            return state;
    }
}
