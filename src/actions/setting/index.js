import types from '../../constants/ActionTypes';
import { Fetch,fetchStatus} from '../../utils';
import {Toast} from 'antd-mobile';

export const getSettingBasicData = ()=>{
    return dispatch => {
        Fetch.fetch('SETTINGBASIC')
        .then((e)=>{
            if(e.errcode===0){
                dispatch({
                    type : types.setting.GET_SETTING_BASIC,
                    data : e.data,
                    fetchStatus : fetchStatus.s
                })
            }else {
                Toast.offline(e.errmsg)
            }
        })
    }
}
