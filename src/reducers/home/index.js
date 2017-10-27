//'use strict';
import types from '../../constants/ActionTypes';
import {fetchStatus} from "ws-web-utils";

const initialState = {
    swiperData : [],
    swiperDataFetchStatus : fetchStatus.l,

    infoData : [],
    infoDataFetchStatus : fetchStatus.l,

    adData : [],
    adDataFetchStatus : fetchStatus.l,

    recommendData : [],
    recommendDataFetchStatus : fetchStatus.l,

    allGoodsData : [],
    allGoodsDataFetchStatus : fetchStatus.l,
    allGoodsAllowFetch : true,
    allGoodsFetchPage : 1,

    ad2Data : [],
    ad2DataFetchStatus : fetchStatus.l,
}

export default (state = initialState, action)=>{
    switch (action.type) {
        case types.home.GET_HOME_SWIPER_DATA:
            return Object.assign({}, state, {
                swiperData: action.list,
                swiperDataFetchStatus : action.fetchStatus
            })
        case types.home.GET_HOME_INFO_DATA:
            return Object.assign({}, state, {
                infoData: action.list,
                infoDataFetchStatus : action.fetchStatus
            })
        case types.home.GET_HOME_AD_DATA:
            return Object.assign({}, state, {
                adData: action.list,
                adDataFetchStatus : action.fetchStatus
            })
        case types.home.GET_HOME_RECOMMEND_DATA:
            return Object.assign({}, state, {
                recommendData: action.list,
                recommendDataFetchStatus : action.fetchStatus
            })
        case types.home.GET_HOME_ALL_GOODS_DATA:
            return Object.assign({}, state, {
                allGoodsData: action.list,
                allGoodsDataFetchStatus : action.fetchStatus,
                allGoodsFetchPage: action.page,
                allGoodsAllowFetch: action.allowFetch,
            })
        case types.home.FORBID_GET_HOME_ALL_GOODS_DATA:
            return Object.assign({}, state, {
                allGoodsAllowFetch: false,
            })
        case types.home.GET_HOME_AD2_DATA:
            return Object.assign({}, state, {
                ad2Data: action.list,
                ad2DataFetchStatus : action.fetchStatus
            })
        default:
            return state;
    }
}
