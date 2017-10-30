import types from '../../constants/ActionTypes';
import {fetchStatus} from 'ws-web-utils';


const initialState = {
    showPanelModal: false,
    socketInstance: null,
    connectState: 0,
    selectedSessionListItemId : null,
    connectNumber: 0,
    showConnectLoading: false,
    sessionListData: [],
    allUserInfoData: {},
    allMessageListData: {},
    refreshing: false,
    listViewInstance: null,
    allMessageDataStore: [],
    allUnreadMessage:{},
}


export default (state = initialState, action)=>{
    switch (action.type) {
        case types.message.SELECTED_SESSION_LIST_ITEM:
            return Object.assign({}, state, {
                selectedSessionListItemId: action.id,
                showPanelModal: true,
            })
        case types.message.CLOSE_SESSION_MODAL:
            return Object.assign({}, state, {
                showPanelModal: false,
            })
        case types.message.ONCHANGE_WEBSOCKET_CONNECT_STATE:
            return Object.assign({}, state, {
                connectState: action.connectState,
            })
        case types.message.SET_WEBSOCKET:
            return Object.assign({}, state, {
                socketInstance: action.socket,
            })
        case types.message.SHOW_CONNECT_LOADING:
            return Object.assign({}, state, {
                showConnectLoading: action.show,
                connectNumber: action.connectNumber,
            })
        case types.message.INIT_SESSION_LIST_DATA:
            return Object.assign({}, state, {
                sessionListData: action.list,
            })
        case types.message.ADD_ALL_USER_INFO_DATA:
            return Object.assign({}, state, {
                allUserInfoData: Object.assign({},state.allUserInfoData,action.data),
            })
        case types.message.ADD_MESSAGE_LIST_VIEW_DATA:
            return Object.assign({}, state, {
                allMessageListData: Object.assign({},state.allMessageListData,action.data),
                refreshing: action.refreshing,
            })
        case types.message.ADD_MESSAGE_ITEM_DATA:
            return Object.assign({}, state, {
                allMessageListData: Object.assign({},state.allMessageListData,action.data),
            })
        case types.message.REFRESHING_CHANGE:
            return Object.assign({}, state, {
                refreshing: action.refreshing,
            })
        case types.message.SET_LISTVIEW_INSTANCE:
            return Object.assign({}, state, {
                listViewInstance: action.listViewInstance,
            })
        case types.message.SET_UNREAD_MESSAGE_NUM:
            return Object.assign({}, state, {
                allUnreadMessage: Object.assign({},state.allUnreadMessage,action.data),
            })
        default:
            return state;
    }
}
