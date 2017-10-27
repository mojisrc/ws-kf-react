import types from '../../constants/ActionTypes';
import { Toast } from "antd-mobile";
import {
    Fetch,
    fetchStatus
} from '../../utils';

export const getHomeSwiperData = ()=>{
    return dispatch => {
        dispatch({
            type : types.home.GET_HOME_SWIPER_DATA,
            fetchStatus : fetchStatus.l,
        })
        Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
        .then(
            e => {
                if(e.errcode===0){
                    dispatch({
                        type : types.home.GET_HOME_SWIPER_DATA,
                        list:e.list,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.home.GET_HOME_SWIPER_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.home.GET_HOME_SWIPER_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}


export const getHomeInfoData = ()=>{
    return dispatch => {
        dispatch({
            type : types.home.GET_HOME_INFO_DATA,
            fetchStatus : fetchStatus.l,
        })
        Fetch.fetch("INFOSEARCH",{category_id:1})
        .then(
            e => {
                if(e.errcode===0){
                    dispatch({
                        type : types.home.GET_HOME_INFO_DATA,
                        list:e.list,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.home.GET_HOME_INFO_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.home.GET_HOME_INFO_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}


export const getHomeAdData = ()=>{
    return dispatch => {
        dispatch({
            type : types.home.GET_HOME_AD_DATA,
            fetchStatus : fetchStatus.l,
        })
        Fetch.fetch("ADRECOMMENDLISTS",{category_id:1})
        .then(
            e => {
                if(e.errcode===0){
                    dispatch({
                        type : types.home.GET_HOME_AD_DATA,
                        list:e.list,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.home.GET_HOME_AD_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.home.GET_HOME_AD_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}


export const getHomeRecommendData = ()=>{
    return dispatch => {
        dispatch({
            type : types.home.GET_HOME_RECOMMEND_DATA,
            fetchStatus : fetchStatus.l,
        })
        Fetch.fetch("ADRECOMMENDLISTS",{category_id:3})
        .then(
            e => {
                // console.log('getHomeRecommendData',e)
                if(e.errcode===0){
                    dispatch({
                        type : types.home.GET_HOME_RECOMMEND_DATA,
                        list:e.list,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.home.GET_HOME_RECOMMEND_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.home.GET_HOME_RECOMMEND_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}


export const getHomeAd2Data = ()=>{
    return dispatch => {
        dispatch({
            type : types.home.GET_HOME_AD2_DATA,
            fetchStatus : fetchStatus.l,
        })
        Fetch.fetch("ADRECOMMENDLISTS",{category_id:5})
        .then(
            e => {
                if(e.errcode===0){
                    dispatch({
                        type : types.home.GET_HOME_AD2_DATA,
                        list:e.list,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.home.GET_HOME_AD2_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.home.GET_HOME_AD2_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}


export const getHomeAllGoodsData = (oldData=[],params={page:1})=>{
    return dispatch => {
        dispatch({
            type : types.home.FORBID_GET_HOME_ALL_GOODS_DATA,
        })
        Fetch.fetch("GOODSSEARCH",Object.assign({},{type:'portal',rows:40},params))
        .then(
            e => {
                if(e.errcode===0){
                    dispatch({
                        type : types.home.GET_HOME_ALL_GOODS_DATA,
                        list:[...oldData,...e.list],
                        fetchStatus : fetchStatus.s,
                        page : ++params.page,
                        allowFetch : e.page_data.next_cursor>0 ? true : false
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.home.GET_HOME_ALL_GOODS_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.home.GET_HOME_ALL_GOODS_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}
