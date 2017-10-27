import types from '../../constants/ActionTypes';
import {fetchStatus} from "ws-web-utils";

const initialState = {
    showBootPage : false,
    showFetchLoading : false,
    initUserInfoStorageState : false,
    appBasisData:null,
    appBasisDataFetchStatus:fetchStatus.l,

}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.app.UPDATE_FIRST_OPEN:
            return Object.assign({}, state, {
                showBootPage: action.data,
            })
        case types.app.UPDATE_FETCH_LOADING:
            return Object.assign({}, state, {
                showFetchLoading: action.data,
            })
        case types.app.INIT_USERINFO_STORAGE:
            return Object.assign({}, state, {
                initUserInfoStorageState: action.data,
            })
        case types.app.APP_BASIS_DATA:
            return Object.assign({}, state, {
                appBasisData: action.data,
                appBasisDataFetchStatus: action.fetchStatus,
            })
        default:
            return state;
    }
}
