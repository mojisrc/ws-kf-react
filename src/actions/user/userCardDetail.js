import types from '../../constants/ActionTypes';
import { Toast } from 'antd-mobile';
import {
    Fetch,
    fetchStatus
} from '../../utils';



export const getUserCardDetailData = (id)=>{
    return dispatch => {

        Fetch.fetch("CARDBUYDETAIL",{
            id
        })
        .then(
            e => {
                if(e.errcode===0){
                    dispatch({
                        type : types.user.GET_USER_CARD_DETAIL_DATA,
                        data : e.data,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.user.GET_USER_CARD_DETAIL_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.user.GET_USER_CARD_DETAIL_DATA,
                    fetchStatus : fetchStatus.l,
                })
            }
        )
    }
}
