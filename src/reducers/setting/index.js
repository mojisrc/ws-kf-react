import types from '../../constants/ActionTypes';
import {fetchStatus} from 'ws-web-utils';


const initialState = {
  data : null,
  fetchStatus:fetchStatus.l
}


export default function webIndex(state = initialState, action) {
    switch (action.type) {
        case types.setting.GET_SETTING_BASIC:
            return Object.assign({}, state, {
                data: action.data,
                fetchStatus: action.fetchStatus,
            })
        default:
            return state;
    }
}
