import React, { Component } from "react";
import {
    Button,
    Modal,
    Icon,
    InputItem,
    Drawer,
    List
} from "antd-mobile";
import { View } from "react-web-dom";
import styles from "../styles/App.css";
import { ThemeStyle, windowWidth } from "../utils/style";
import ListView from './ListView'
import MessageSend from './MessageSend'
import {closeSessionModal} from '../actions/message/sessionList'
import { connect } from "react-redux";
import {refreshingChange} from '../actions/message/listView'
import {selectedSessionListItem} from "../actions/message/sessionList";

class MessagePanel extends Component {
    state = {
        open: false,
    };
    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    }
    render() {
        const {
            dispatch,
            showPanelModal,
            allUserInfoData,
            kfUserId,
            sessionListData,
        } = this.props


        const kfUserInfo = allUserInfoData[kfUserId]

        const sidebar = (
            <View>
                {
                    sessionListData.map((data, index) => {
                        const itemData = allUserInfoData[data.relation_id]
                        if(!itemData){
                            return(
                                <View
                                    className = {styles.relationItem}
                                    key = {index}
                                >
                                    <img
                                        src='https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png'
                                        alt=''
                                        className = {styles.relationAvatar}
                                    />
                                    <span
                                        className = {styles.relationNickname}
                                    >
                                        未知联系人
                                    </span>
                                </View>
                            )
                        }
                        return (
                            <View
                                className = {styles.relationItem}
                                key = {index}
                            >
                                <img
                                    src={itemData.avatar}
                                    alt=''
                                    className = {styles.relationAvatar}
                                />
                                <span
                                    className = {styles.relationNickname}
                                >
                                    {itemData.nickname}
                                </span>
                            </View>
                        )
                    })
                }
            </View>
        )


        return (
            <div>
                {
                    false && <View className={styles.view1}>
                        <View
                            className={styles.view2}
                            onClick = {()=>{
                                this.show()
                            }}
                        >
                            <img src={require('../images/message.png')} className={styles.img1}/>
                        </View>
                    </View>
                }


                    <Modal
                        visible = {showPanelModal}
                        closable = {false}
                        className = {styles.modal1}
                    >
                        <Drawer
                            style={{ minHeight: document.documentElement.clientHeight - 200 }}
                            enableDragHandle
                            sidebar={sidebar}
                            sidebarStyle = {{
                                marginTop:60,
                                backgroundColor:'#fff',
                                padding:'20px 30px'
                            }}
                            open={this.state.open}
                            onOpenChange={this.onOpenChange}
                            touch = {false}
                        >
                            <View className={styles.view3}>
                                <div
                                    className={styles.view11}
                                    onClick = {()=>{
                                        this.hide()
                                    }}
                                />
                                {
                                    kfUserInfo
                                    ?   this.messageView()
                                    :   this.loadingView()
                                }
                            </View>
                        </Drawer>
                    </Modal>
            </div>
        );
    }
    show(){
        this.props.dispatch(closeSessionModal())
    }
    hide(){
        this.props.dispatch(closeSessionModal())
    }
    messageView(){
        const {
            allUserInfoData,
            kfUserId,
            allMessageListData,
            userInfo,
            dispatch,
            socketInstance,
            refreshing,
            listViewInstance,
        } = this.props
        const kfUserInfo = allUserInfoData[kfUserId]
        const dataSource = allMessageListData[kfUserId]

        return(
            <View className={styles.view4}>
                <View className={styles.view5}>
                    <Button
                        onClick = {this.onOpenChange}
                        className={styles.openBtn}
                    >
                        最近联系人
                    </Button>
                    <span className={styles.span1} style={{left:windowWidth/2-25}}>
                        {kfUserInfo.nickname}
                    </span>
                    <View
                        className={styles.view6}
                        onClick = {()=>{
                            this.hide()
                        }}
                    >
                        <img
                            src={require('../images/close.png')}
                            style={{}}
                        />
                    </View>
                </View>
                <View className={`${styles.view7} chatContent`}>
                    {
                        dataSource&&(
                            <ListView
                                dataSource = {dataSource.list}
                                nativeData = {dataSource}
                                onRefresh = {(e)=>{
                                    this.onRefresh(e)
                                }}
                                userInfo = {userInfo}
                                refreshing = {refreshing}
                                dispatch = {dispatch}
                            />
                        )
                    }
                </View>
                <MessageSend
                    dispatch = {dispatch}
                    socketInstance = {socketInstance}
                    userInfo = {userInfo}
                    selectedId = {kfUserId}
                    allMessageListData = {allMessageListData}
                    listViewInstance = {listViewInstance}
                />
            </View>
        )
    }
    loadingView(){
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                加载客服信息中
            </View>
        )
    }
    onRefresh(e){
        const {
            socketInstance,
            kfUserId,
            dispatch
        } = this.props
        dispatch(refreshingChange(true))
        const params = Object.assign({},{
            type: 'user',
            relation_id: kfUserId,
            page: 1,
            rows: 10,
        },e)
        socketInstance.send(JSON.stringify({
            type: 'message.list',
            data: params
        }))
    }
}


const mapStateToProps = ({view,app}) => {
    const {
        message
    } = view
    const {
        user
    } = app
    const {
        showPanelModal,
        allUserInfoData,
        selectedSessionListItemId,
        allMessageListData,
        socketInstance,
        refreshing,
        listViewInstance,
        sessionListData,
    } = message
    const {
        userInfo
    } = user
    return {
        showPanelModal,
        allUserInfoData,
        kfUserId: selectedSessionListItemId,
        allMessageListData,
        socketInstance,
        userInfo,
        refreshing,
        listViewInstance,
        sessionListData,
    }
}

export default connect(mapStateToProps)(MessagePanel)
