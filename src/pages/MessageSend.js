import React, { Component } from "react";
import { Button, Modal, Icon, InputItem, Popover, Toast } from "antd-mobile";
import { View } from "react-web-dom";
import styles from "../styles/App.css";
import { ThemeStyle } from "../utils/style";
import ListView from "./ListView";
import { closeSessionModal } from "../actions/message/sessionList";
import EmojiGroup from "./EmojiGroup";
import "../utils/global.css";
import {addMessageItemData} from "../actions/message/messageSend";

export default class MessageSend extends Component {
    state = {
        value: null,
        visible: false,
    };
    onSelect = opt => {
        this.setState({
            visible: false,
        });
    };
    handleVisibleChange = visible => {
        this.setState({
            visible
        });
    };
    onFileChange = () => {
        const fileSelectorEl = this.fileSelectorInput;
        if (fileSelectorEl && fileSelectorEl.files && fileSelectorEl.files.length) {
            const file = fileSelectorEl.files[0];
            const reader = new FileReader();
            reader.onload = e => {
                const dataURL = e.target.result;

                this.sendMessage({
                    content_type: 'image',
                    image_url: dataURL,
                    isSend: false,
                })
                .then(({sign})=>{

                    fetch("http://api.pinggai.cc/api/upload/imagesBinary", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            type: "message_image",
                            file: dataURL,
                            access_token: "f914f40705ced1e4495f1764d9f571aba1d7fe69"
                        })
                    })
                    .then(e => e.json())
                    .then(e =>{
                        if(e.errcode===0){
                            this.sendMessage({
                                content_type: 'image',
                                image_url: e.data['oss-request-url'],
                                removeSign: sign
                            })
                        }else {
                            Toast.fail('上传失败',1)
                        }
                    })
                    .catch(err => {
                        Toast.fail('上传错误',1)
                    })

                })
            };
            reader.readAsDataURL(file);
        }
    };
    sendMessage({content_type,text_content,image_url,isSend,isAdd,removeSign}){

        const {
            dispatch,
            userInfo,
            allMessageListData,
            socketInstance,
            selectedId,
            listViewInstance,
        } = this.props

        const timestamp = Date.parse(new Date())/1000
        const sign = `${timestamp}${generateMixed(18)}`

        let newParams = {
            type: 'message',
            data: {
                type: 'user',
                sign,
                relation_id: selectedId,
                content_type,
            }
        }

        let newData = {
            id: selectedId,
            allMessageListData,
            data: {
                create_time: timestamp,
                content_type,
                sign,
                relation_id: selectedId,
                user_id: userInfo.id,
            }
        }

        switch (content_type) {
            case 'text':
                newParams.data['text_content'] = text_content
                newData.data['text_content'] = text_content
                break;
            case 'image':
                newParams.data['image_url'] = image_url
                newData.data['image_url'] = image_url
                if(removeSign){
                    newData.removeSign=removeSign
                }
                break;
            default:
                Toast.info('未知发送类型',1)
                return false
        }

        if(isSend!==false){
            socketInstance.send(JSON.stringify(newParams))
        }

        if(isAdd!==false){
            dispatch(addMessageItemData(newData))
        }

        setTimeout(()=>{
            listViewInstance&&listViewInstance(true)
        },100)

        return new Promise(resolve => {
            resolve({
                sign
            })
        })
    }
    render() {
        const {
            listViewInstance,
        } = this.props
        return (
            <View className={`${styles.view8}`}>
                <Popover
                    mask
                    visible={this.state.visible}
                    overlay={
                        <EmojiGroup
                            onSelect = {(e)=>{
                                this.setState({
                                    value: `${this.state.value||''}${e.emoji}`
                                })
                            }}
                        />
                    }
                    onVisibleChange={this.handleVisibleChange}
                    onSelect={this.onSelect}
                    placement={"topLeft"}
                    overlayClassName={styles.popover1}
                >
                    <View className={styles.view9}>
                        <img
                            src={require("../images/emoji.png")}
                            className={styles.img2}
                        />
                    </View>
                </Popover>
                <View
                    className={styles.view9}
                    style = {{position:'relative'}}
                >
                    <img
                        src={require("../images/image.png")}
                        className={styles.img2}
                    />
                    <input
                        ref={(input) => { this.fileSelectorInput = input; }}
                        type="file"
                        accept="image/jpg,image/jpeg,image/png,image/gif"
                        onChange={() => { this.onFileChange() }}
                        className = {styles.input1}
                    />
                </View>
                <InputItem
                    placeholder="请输入"
                    className={`${styles.inputItem1}`}
                    value = {this.state.value}
                    onChange = {(e)=>{
                        this.setState({
                            value: e
                        })
                    }}
                />
                <View
                    className={styles.view10}
                    onClick = {()=>{
                        const {
                            value
                        } = this.state
                        if(value&&value.length){

                            this.sendMessage({
                                content_type: 'text',
                                text_content: value,
                            })

                            this.setState({
                                value: null
                            })
                        }else {
                            Toast.info('请输入内容')
                        }
                    }}
                >
                    发送
                </View>
            </View>
        );
    }
}



function generateMixed(n) {
    const jschars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += jschars[id];
    }
    return res;
}
