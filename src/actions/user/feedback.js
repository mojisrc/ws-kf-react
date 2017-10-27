'use strict';
import types from '../../constants/ActionTypes';
import FetchDataModule from '../../utils/fetch';
import {Toast} from 'antd-mobile';
import {fetchStatus} from 'ws-web-utils';


export const getFeedbackData = ()=>{
    return dispatch => {
        FetchDataModule.fetch('USERHELPTYPELIST')
        .then(
            e => {
                if(e.errcode==0){
                    dispatch({
                        type : types.user.GET_FEEDBACK_DATA,
                        data : e.list,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    Toast.offline(e.errmsg)
                    dispatch({
                        type : types.user.GET_FEEDBACK_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            err => {
                dispatch({
                    type : types.user.GET_FEEDBACK_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}
