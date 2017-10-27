import types from '../../constants/ActionTypes';
import {Fetch,fetchStatus} from '../../utils';



export const onChangeWebSocketConnectState = ({state})=>{
    return dispatch => {
        dispatch({
            type : types.message.ONCHANGE_WEBSOCKET_CONNECT_STATE,
            connectState : state,
        })
    }
}


export const setWebSocket = ({socket})=>{
    return dispatch => {
        dispatch({
            type : types.message.SET_WEBSOCKET,
            socket
        })
    }
}



export const showConnectLoading = (e,c)=>{
    return dispatch => {
        dispatch({
            type : types.message.SHOW_CONNECT_LOADING,
            show : e,
            connectNumber: c,
        })
    }
}
