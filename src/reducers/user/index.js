import types from '../../constants/ActionTypes';

const initialState = {
    login : false,
    userInfo : null,
    couponNum : 0,
    refreshing : false,
    orderNum : {
        order_nopay : 0,
        order_nosend : 0,
        order_noreceiving : 0,
        order_noeval : 0,
        order_refund : 0,
    },
}

export default (state = initialState, action)=> {
    switch (action.type) {
        case types.user.USER_STATUS_CHANGE:
            return Object.assign({}, state, {
                login: action.login,
                userInfo: action.userInfo,
            })
        case types.user.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo,
                refreshing: action.refreshing,
            })
        case types.user.GET_USER_MIXEDSTATENUM_DATA:
            return Object.assign({}, state, {
                couponNum: action.couponNum,
                orderNum : action.orderNum,
            })
        case types.user.UPDATE_USER_INFO_LOADING:
            return Object.assign({}, state, {
                refreshing: action.refreshing,
            })
        default:
            return state;
    }
}
