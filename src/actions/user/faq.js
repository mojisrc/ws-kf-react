// 'use strict';
import types from '../../constants/ActionTypes';
import { Fetch, fetchStatus } from '../../utils';
import {Toast} from 'antd-mobile';


export const getFAQData = (category_id)=>{
    return dispatch => {
        Fetch.fetch('INFOSEARCH',{category_id})
        .then((e)=>{
            if(e.errcode===0){
                dispatch({
                    type : types.user.GET_FAQ_DATA,
                    data : e.list,
                    faqDataFetchStatus : fetchStatus.s
                })
            }else {
                Toast.offline(e.errmsg)
            }
        })
    }
}
