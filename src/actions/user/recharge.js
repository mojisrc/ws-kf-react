// 'use strict';
import types from '../../constants/ActionTypes';
import { Fetch, fetchStatus } from '../../utils';
import { Toast } from 'antd-mobile';

export const getRechargeData = ()=>{
    return dispatch => {
        Fetch.fetch('PDRECHARGEDENOMINATIONLIST')
        .then(
            e => {
                if(e.errcode===0){
                    let denominationList = []
                    e.list.map((item,index)=>{
                        denominationList.push({
                            value: `${item.price}`,
                            text: `${item.price}元`
                        })
                        return true
                    })
                    dispatch({
                        type : types.user.GET_RECHARGE_DATA,
                        data : denominationList,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.user.GET_RECHARGE_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.user.GET_RECHARGE_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}
