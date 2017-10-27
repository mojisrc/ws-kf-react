import types from '../../constants/ActionTypes';
import {Fetch,fetchStatus} from '../../utils';



export const refreshingChange = (e)=>{
    return dispatch => {
        dispatch({
            type : types.message.REFRESHING_CHANGE,
            refreshing: e
        })
    }
}


export const setListViewInstance = (e)=>{
    return dispatch => {
        dispatch({
            type : types.message.SET_LISTVIEW_INSTANCE,
            listViewInstance: e
        })
    }
}
