import types from '../../constants/ActionTypes';
import { Toast } from 'antd-mobile';
import {
    Fetch,
    fetchStatus
} from '../../utils';



export const getUserCardDetailData = (card_buy_id,data)=>{
    return dispatch => {

        Fetch.fetch("CARDACTIVATEORDERDETAIL",{
            card_buy_id
        })
        .then(
            e => {
                if(e.errcode===0){
                    dispatch(updateData(e.data,fetchStatus.s,card_buy_id))
                }else {
                    Toast.offline(e.errmsg)
                    dispatch(updateData(null,fetchStatus.e,card_buy_id))
                }
            },
            err => {
                dispatch(updateData(null,fetchStatus.f,card_buy_id))
            }
        )
    }
}




const updateData = (data,fetchStatus,card_buy_id)=>{

    let newData = {}
    newData[card_buy_id] = data
    let FetchStatus = {}
    FetchStatus[card_buy_id] = fetchStatus

    return {
        type : types.user.GET_USER_CARD_ORDER_DETAIL_DATA,
        data : newData,
        fetchStatus : FetchStatus,
    }
}
