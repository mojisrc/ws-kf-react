import React, { Component } from "react";
import { connect } from "react-redux";
import { ThemeStyle } from "../utils/style"
import {
    onChangeWebSocketConnectState,
    setWebSocket,
    showConnectLoading,
} from "../actions/message"
import {
    initSessionListData,
    addSessionListData,
    addAllUserInfoData,
    addMoreAllUserInfoData,
    addMessageListViewData,
    setUnreadMessageNum,
} from "../actions/message/sessionList"
import {
    changeMessageItemData,
    addMessageItemData,
} from "../actions/message/messageSend"
import {
    userLogin
} from "../actions/user"
import ExceptionConnectState from "../pages/ExceptionConnectState"
import MessagePanel from "../pages/MessagePanel"
import { Toast } from 'antd-mobile';


const chatUrl = 'ws://ws.pinggai.cc'

class Container extends Component {
    componentDidMount(){

        const {
            onChangeWebSocketConnectState,
            setWebSocket,
            access_token,
        } = this.props

        let ws = new WebSocket(`${chatUrl}`);
        ws.last_health_time = -1;
        ws.keepalive = ()=>{
            const time = new Date().getTime()
            if (ws.last_health_time !== -1 && time - ws.last_health_time > 20000) {
                ws.close();
            } else {
                if (ws.bufferedAmount === 0 && ws.readyState === 1) {
                    ws.send(JSON.stringify({
                        type: 'pong'
                    }))
                    ws.last_health_time = time;
                }
            }
        }
        if (ws) {
            let reconnect = 0;
            let reconnectMark = false;

            ws.onopen = () => {

                reconnect = 0;
                reconnectMark = false;
                ws.receiveMessageTimer = setTimeout(() => {
                    ws.close();
                }, 30000);
                if (ws.readyState === 1) {
                    ws.keepAliveTimer = setInterval(() => {
                        ws.keepalive();
                    }, 1000);
                }

                setWebSocket({
                    socket:ws
                })

                ws.send(JSON.stringify({
                    type: 'login',
                    data: {
                        access_token,
                    }
                }))

            };
            ws.onerror = () => {
                onChangeWebSocketConnectState({
                    state : 3
                })
            };
            ws.onmessage = (e) => {
                const data = JSON.parse(e.data)
                this.onMessage({ws,data})

                clearTimeout(ws.receiveMessageTimer);
                ws.receiveMessageTimer = setTimeout(() => {
                    ws.close();
                }, 30000);
            };
            ws.onclose = () => {
                onChangeWebSocketConnectState({
                    state : 2
                })

                clearTimeout(ws.receiveMessageTimer)
                clearInterval(ws.keepAliveTimer)
                if (!reconnectMark) {

                    reconnect = new Date().getTime();
                    reconnectMark = true;

                }
                const tempWs = ws;
                if (new Date().getTime() - reconnect >= 10000) {
                    ws.close();
                } else {
                    ws = new WebSocket(`${chatUrl}`);
                    ws.onopen = tempWs.onopen;
                    ws.onmessage = tempWs.onmessage;
                    ws.onerror = tempWs.onerror;
                    ws.onclose = tempWs.onclose;
                    ws.keepalive = tempWs.keepalive;
                    ws.last_health_time = -1;
                }
            }
        }
    }
    onMessage({ws,data}){
        const {
            onChangeWebSocketConnectState,
            userLogin,
            initSessionListData,
            allUserInfoData,
            addAllUserInfoData,
            addMoreAllUserInfoData,
            addMessageListViewData,
            allMessageListData,
            changeMessageItemData,
            addMessageItemData,
            addSessionListData,
            setUnreadMessageNum,
        } = this.props

        switch (data.type) {
            case 'user.self':
                userLogin({
                    userInfoData: data.data.user_info
                })
                onChangeWebSocketConnectState({
                    state : 1
                })
                break;
            case 'login':
                if(data.code===0){
                    ws.send(JSON.stringify({
                        type: 'user.self',
                    }))
                    ws.send(JSON.stringify({
                        type: 'message.session.list',
                    }))
                }else {
                    Toast.info(data.msg)
                }
                break;
            case 'message.session.list':
                const {
                    session_list
                } = data.data
                initSessionListData({list:session_list})
                let newArray = []
                session_list.map((item)=>{
                    if(!allUserInfoData[item.relation_id]){
                        newArray.push(item.relation_id)
                    }
                })
                if(newArray.length){
                    ws.send(JSON.stringify({
                        type: 'user.infos',
                        data: {
                            user_ids: newArray,
                        }
                    }))
                }
                break;
            case 'user.info':
                if(data.code===0){
                    const {
                        user_info
                    } = data.data
                    addAllUserInfoData({
                        id: user_info.id,
                        data: user_info
                    })
                }else {
                    Toast.info(data.msg)
                }
                break;
            case 'user.infos':
                if(data.code===0){
                    const {
                        user_list
                    } = data.data
                    let newData = {}
                    user_list.map((item)=>{
                        newData[item.id] = item
                    })
                    addMoreAllUserInfoData({
                        data: newData
                    })
                }else {
                    Toast.info(data.msg)
                }
                break;
            case 'message.list':
                if(data.code===0){
                    const {
                        relation_id
                    } = data.data
                    const {
                        listViewInstance,
                    } = this.props

                    addMessageListViewData({
                        id: relation_id,
                        data: data.data
                    })

                    if(data.data.page_data.current_page===1){
                        setTimeout(()=>{
                            listViewInstance&&listViewInstance(true)
                        },100)
                    }

                }else {
                    Toast.info(data.msg)
                }
                break;
            case 'message':
                if(data.code===0){
                    const {
                        sign,
                        relation_id,
                        user_id,
                        create_time,
                    } = data.data
                    const {
                        allMessageListData,
                        sessionListData,
                        userInfo,
                        listViewInstance,
                        allUnreadMessage,
                        kfUserId,
                    } = this.props

                    const relationId = userInfo.id===relation_id?user_id:relation_id

                    const sessionListIndex = sessionListData.findIndex((e)=>{return e.relation_id===relationId})

                    //处理未读消息
                    const isCurrentKf = kfUserId===relationId

                    if(sessionListIndex !== -1){
                        //设置未读消息
                        if(!isCurrentKf){
                            if(allUnreadMessage[relationId]!==undefined){
                                const thisNum = allUnreadMessage[relationId]
                                setUnreadMessageNum({
                                    num: thisNum+1,
                                    id: relationId,
                                })
                            }else {
                                setUnreadMessageNum({
                                    num: 1,
                                    id: relationId,
                                })
                            }
                        }
                        //添加消息处理
                        if(allMessageListData[relationId]){
                            const index = allMessageListData[relationId].list.findIndex((item)=>{
                                return item.sign===sign
                            })

                            if(index!==-1){
                                changeMessageItemData({
                                    id: relationId,
                                    data: data.data,
                                    index,
                                    allMessageListData
                                })
                            }else {
                                addMessageItemData({
                                    id: relationId,
                                    data: data.data,
                                    allMessageListData
                                })
                            }

                            setTimeout(()=>{
                                listViewInstance&&listViewInstance()
                            },100)

                        }else {
                            //消息列表中没有这个客服的聊天记录，查询记录
                            ws.send(JSON.stringify({
                                type: 'message.list',
                                data: {
                                    type: 'user',
                                    relation_id:relationId,
                                    page: 1,
                                    rows: 10,
                                }
                            }))
                        }

                    }else {
                        //设置未读消息
                        if(!isCurrentKf){
                            setUnreadMessageNum({
                                num: 1,
                                id: relationId,
                            })
                        }
                        //新的客服消息，添加客服信息
                        addSessionListData({
                            list: sessionListData,
                            data: {
                                type: 'user',
                                relation_id:relationId,
                                last_time: create_time,
                            }
                        })

                        ws.send(JSON.stringify({
                            type: 'user.info',
                            data: {
                                user_id: relationId,
                            }
                        }))

                    }
                }else {
                    Toast.info(data.msg)
                }
                break;
            default:
                return false
        }
    }
    render() {

        const {
            connectState,
            showPanelModal,
        } = this.props

        switch (connectState) {
            case 0:
                return <ExceptionConnectState errorInfo={'loading'} visible={showPanelModal}/>
            case 1:
                return <MessagePanel {...this.props}/>
            case 2:
                return <ExceptionConnectState errorInfo={'连接正在关闭'} visible={showPanelModal}/>
            case 3:
                return <ExceptionConnectState errorInfo={'连接已经关闭，或者连接无法建立'} visible={showPanelModal}/>
            default:
                return <ExceptionConnectState errorInfo={'connectState异常'} visible={showPanelModal}/>
        }
    }
    firstConnectOver({first,state}){
        if(first===true){
            const {
                initCallBack
            } = this.props
            initCallBack&&initCallBack({
                state,
            })
        }
    }
}

const mapStateToProps = ({app,auth,view}) => {
    const {
        user,
    } = app
    const {
        userInfo
    } = user
    const {
        message
    } = view
    const {
        connectState,
        showConnectLoading,
        allUserInfoData,
        allMessageListData,
        listViewInstance,
        sessionListData,
        showPanelModal,
        connectNumber,
        allUnreadMessage,
        selectedSessionListItemId,
    } = message
    return {
        connectState,
        isShowConnectLoading: showConnectLoading,
        allUserInfoData,
        allMessageListData,
        listViewInstance,
        userInfo,
        sessionListData,
        showPanelModal,
        connectNumber,
        allUnreadMessage,
        kfUserId: selectedSessionListItemId,
    }
}

export default connect(mapStateToProps,
    {
        onChangeWebSocketConnectState,
        setWebSocket,
        userLogin,
        showConnectLoading,
        initSessionListData,
        addAllUserInfoData,
        addMoreAllUserInfoData,
        addMessageListViewData,
        changeMessageItemData,
        addMessageItemData,
        addSessionListData,
        setUnreadMessageNum,
    }
)(Container)
