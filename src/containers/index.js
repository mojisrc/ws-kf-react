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
    addAllUserInfoData,
    addMoreAllUserInfoData,
    addMessageListViewData,
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
    state = {
        notificationSocket: false,
    };
    // componentWillReceiveProps(prevProps){
    //
    //     console.log(prevProps);
    //
    //     const oldIsShowConnectLoading = this.props.isShowConnectLoading
    //
    //     const {
    //         isShowConnectLoading,
    //         connectNumber,
    //     } = prevProps
    //
    //     if(oldIsShowConnectLoading===false && isShowConnectLoading===true){
    //         Toast.loading('正在重新连接...',0)
    //     }
    //     if(oldIsShowConnectLoading===true && isShowConnectLoading===false){
    //         Toast.hide()
    //     }
    //     if(connectNumber>=3 && isShowConnectLoading===false){
    //         Toast.hide()
    //     }
    //
    // }
    componentDidMount(){

        const {
            onChangeWebSocketConnectState,
            setWebSocket,
            userLogin,
            initSessionListData,
            allUserInfoData,
            addAllUserInfoData,
            addMoreAllUserInfoData,
            addMessageListViewData,
            allMessageListData,
            changeMessageItemData,
            addMessageItemData,
            access_token,
        } = this.props

        if (!this.state.notificationSocket) {
            // 用户登录了并且没有连接过websocket
            let ws = new WebSocket(`${chatUrl}`);
            ws.last_health_time = -1; // 上一次心跳时间
            ws.keepalive = function() {
                let time = new Date().getTime();
                if (ws.last_health_time !== -1 && time - ws.last_health_time > 20000) {
                    // 不是刚开始连接并且20s
                    ws.close();
                } else {
                    // 如果断网了，ws.send会无法发送消息出去。ws.bufferedAmount不会为0。
                    if (ws.bufferedAmount === 0 && ws.readyState === 1) {
                        ws.send(JSON.stringify({
                            type: 'pong'
                        }));
                        ws.last_health_time = time;
                    }
                }
            };
            if (ws) {
                let reconnect = 0; //重连的时间
                let reconnectMark = false; //是否重连过
                this.setState({
                    notificationSocket: true
                });
                ws.onopen = () => {

                    reconnect = 0;
                    reconnectMark = false;
                    ws.receiveMessageTimer = setTimeout(() => {
                        ws.close();
                    }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。如果收到消息了，重置该定时器。
                    if (ws.readyState === 1) {
                        // 为1表示连接处于open状态
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
                                addMessageListViewData({
                                    id: relation_id,
                                    data: data.data
                                })
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
                                } = data.data
                                const {
                                    allMessageListData,
                                    sessionListData,
                                    userInfo,
                                    listViewInstance,
                                } = this.props

                                const relationId = userInfo.id===relation_id?user_id:relation_id

                                const sessionListIndex = sessionListData.findIndex((e)=>{return e.relation_id===relationId})

                                if(sessionListIndex !== -1){

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
                                    Toast.info('另外一个新客服的消息，未开发')
                                }
                            }else {
                                Toast.info(data.msg)
                            }
                            break;
                        default:
                            return false
                    }


                    // 收到消息，重置定时器
                    clearTimeout(ws.receiveMessageTimer);
                    ws.receiveMessageTimer = setTimeout(() => {
                        ws.close();
                    }, 30000); // 30s没收到信息，代表服务器出问题了，关闭连接。
                };
                ws.onclose = () => {

                    onChangeWebSocketConnectState({
                        state : 2
                    })

                    clearTimeout(ws.receiveMessageTimer);
                    clearInterval(ws.keepAliveTimer);
                    if (!reconnectMark) {
                        // 如果没有重连过，进行重连。
                        reconnect = new Date().getTime();
                        reconnectMark = true;
                    }
                    let tempWs = ws; // 保存ws对象
                    if (new Date().getTime() - reconnect >= 10000) {
                        // 10秒中重连，连不上就不连了
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
    }
    // componentDidMount(){
    //
    //     // this.initSocket({
    //     //     first: true
    //     // })
    // }
    initSocket({first}={}){






        const socket = new WebSocket('ws://ws.pinggai.cc');

        socket.onopen = (event)=>{



            this.firstConnectOver({
                first,
                state: 1,
            })

        }

        socket.onmessage = (e)=>{


        }

        socket.onerror = (event)=>{
            console.log('onerror');


            this.firstConnectOver({
                first,
                state: 3,
            })

        }

        socket.onclose = (e)=>{
            
            const {
                connectNumber
            } = this.props
            if(connectNumber<=3){

                showConnectLoading(true,1+connectNumber)

                // this.initSocket()

            }else {

                showConnectLoading(false,connectNumber)


            }
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
    }
)(Container)
