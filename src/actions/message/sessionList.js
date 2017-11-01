import types from '../../constants/ActionTypes';
import {Fetch,fetchStatus} from '../../utils';
import store from '../../store';
import { Toast } from 'antd-mobile';


export const initSessionListData = ({list})=>{
    return dispatch => {
        dispatch({
            type : types.message.INIT_SESSION_LIST_DATA,
            list,
        })
    }
}


export const addSessionListData = ({data,list})=>{
    return dispatch => {
        const newArray = [data,...list]
        dispatch({
            type : types.message.INIT_SESSION_LIST_DATA,
            list:newArray,
        })
    }
}




export const addAllUserInfoData = ({data,id})=>{
    return dispatch => {
        let newData = {}
        newData[id] = data
        dispatch({
            type : types.message.ADD_ALL_USER_INFO_DATA,
            data: newData
        })
    }
}


export const addMoreAllUserInfoData = ({data})=>{
    return dispatch => {
        dispatch({
            type : types.message.ADD_ALL_USER_INFO_DATA,
            data,
        })
    }
}



export const selectedSessionListItem = ({id})=>{
    return dispatch => {

        let newObject = {}
        newObject[id] = 0

        dispatch({
            type : types.message.SELECTED_SESSION_LIST_ITEM,
            id,
            unreadMessageData: newObject,
        })

        const {
            view
        } = store.getState()
        const {
            message
        } = view
        const {
            connectState,
            socketInstance,
            allMessageListData,
            allUserInfoData,
        } = message
        if(connectState===1){

            if(!allUserInfoData[id]){
                socketInstance.send(JSON.stringify({
                    type: 'user.info',
                    data: {
                        user_id: id,
                    }
                }))
            }

            // if(!allMessageListData[id]){
                socketInstance.send(JSON.stringify({
                    type: 'message.list',
                    data: {
                        type: 'user',
            			relation_id: id,
                        page: 1,
                        rows: 10,
                    }
                }))
            // }

        }else {
            switch (connectState) {
                case 0:
                    return Toast.info('初始化中，无法打开对话面板',2)
                case 2:
                    return Toast.info('连接正在关闭，无法打开对话面板',2)
                case 3:
                    return Toast.info('连接已经关闭，或者连接无法建立，无法打开对话面板',2)
                default:
                    return Toast.info('连接状态异常，无法打开对话面板',2)
            }
        }
    }
}


export const closeSessionModal = ()=>{
    return dispatch => {
        dispatch({
            type : types.message.CLOSE_SESSION_MODAL,
        })
    }
}




export const addMessageListViewData = ({data,id})=>{
    return dispatch => {
        const {
            view
        } = store.getState()
        const {
            message
        } = view
        const {
            allMessageListData,
        } = message

        if(allMessageListData[id]){
            const oldData = allMessageListData[id].list
            let newData = {}

            if(data.page_data.current_page===1){

            }else {
                data.list = [...oldData,...data.list]
            }

            newData[id] = data
            dispatch({
                type : types.message.ADD_MESSAGE_LIST_VIEW_DATA,
                data: newData,
                refreshing: false
            })
        }else {
            let newData = {}
            newData[id] = data
            dispatch({
                type : types.message.ADD_MESSAGE_LIST_VIEW_DATA,
                data: newData,
                refreshing: false
            })
        }

    }
}


export const setUnreadMessageNum = ({num,id})=>{
    return dispatch => {
        let newData = {}
        newData[id] = num
        dispatch({
            type: types.message.SET_UNREAD_MESSAGE_NUM,
            data: newData,
        })
    }
}
