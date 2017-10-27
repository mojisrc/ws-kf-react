// 'use strict';
import types from '../../constants/ActionTypes';
import { Fetch } from '../../utils';
import {Toast} from 'antd-mobile';


export const getGiftData = ()=>{
    return dispatch => {
        Fetch.fetch('CARDGIFTPACKS')
        .then((e)=>{
            if(e.errcode===0){
                dispatch({
                    type : types.user.GET_GIFT_DATA,
                    userActualCardPickId:e.data.id
                })
                dispatch(giftIfShow(e.data.id))
            }else {
                Toast.offline(e.errmsg)
            }
        })
    }
}

export const giftIfShow = (id)=>{
    return dispatch => {
        dispatch({
            type : types.user.GET_GIFT_DATA,
            userActualCardShow:id ? true : false
        })
    }
}
