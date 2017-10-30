import React, { Component } from "react";
import {
    Button,
    Modal,
    Icon,
    InputItem,
    RefreshControl,
    ListView,
    Toast,
} from "antd-mobile";
import { View } from "react-web-dom";
import styles from "../styles/ListView.css";
import { ThemeStyle } from "../utils/style";
import {publicFunction} from '../utils';
import {emojiArray,EmojiComponent} from './EmojiGroup';
import {setListViewInstance,refreshingChange} from '../actions/message/listView';
import ImageZoom from 'react-medium-image-zoom'


const {
    DateFormat
} = publicFunction


export default class MessageListView extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        this.state = {

        };
        this.scrollToBottom = this.scrollToBottom.bind(this)
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidMount() {
        this.scrollToBottom(true)
    }

    onRefresh = () => {
        const {
            nativeData,
            dispatch,
        } = this.props

        const {
            current_page,
            total_page,
            next_cursor,
        } = nativeData.page_data

        if (current_page<total_page) {
            const {
                onRefresh
            } = this.props

            onRefresh({
                page: next_cursor,
                rows: 10,
            })
        }else {
            Toast.show('没有更多消息了',1)
            dispatch(refreshingChange(true))
            setTimeout(()=>{
                dispatch(refreshingChange(false))
            },1000)
        }
    }

    renderCustomIcon() {
        return [
            <div key="0" className="am-refresh-control-pull">
                <span>{this.state.showFinishTxt ? "刷新完毕" : "加载历史消息"}</span>
            </div>,
            <div key="1" className="am-refresh-control-release">
                <span>松开立即加载</span>
            </div>
        ];
    }

    render() {
        const {
            userInfo,
            dataSource,
            refreshing,
            dispatch,
            nativeData,
            kfUserInfo,
        } = this.props

        const DataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
        const data = [...dataSource].reverse()
        const row = (rowData, sectionID, rowID) => {
            const RowComponent = userInfo.id===rowData.user_id?RightView:LeftView
            return(
                <RowComponent
                    data = {rowData}
                    style = {Number(rowID)===0?{marginTop:20}:undefined}
                    kfUserInfo = {kfUserInfo}
                />
            )
        }
        return (
            <ListView
                className = {styles.listView1}
                ref={(e)=>{
                    if(!this.listView){
                        this.listView = e
                        dispatch(setListViewInstance(this.scrollToBottom))
                    }

                }}
                dataSource={DataSource.cloneWithRows(data)}
                renderRow={row}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                        icon={this.renderCustomIcon()}
                    />
                }
                style = {{marginTop:0,border:0}}
                onScroll = {(e)=>{
                    const {
                        scroller
                    } = e
                    this.scroller = {
                        contentHeight: scroller.__contentHeight,
                        top: scroller.getValues().top,
                        clientHeight: scroller.__clientHeight
                    }
                }}
            />
        );
    }
    scrollToBottom(e){
        const y = this.scroller?this.scroller.contentHeight+1000:999999999
        if(e){
            this.listView.scrollTo(0,y)
        }else {
            if(this.scroller){
                const {
                    contentHeight,
                    top,
                    clientHeight
                } = this.scroller
                if((contentHeight-clientHeight)<top+50){
                    this.listView.scrollTo(0,contentHeight)
                }
            }else {
                this.listView.scrollTo(0,y)
            }
        }
    }
}




const LeftView = ({data,style,kfUserInfo})=>(
    <View className={styles.view1} style={style}>
        <View className={styles.view4}>
            {DateFormat(data.create_time,'MM/dd hh:mm')}
        </View>
        <View className={styles.view5}>
            <View className={styles.view2}>
                <img
                    src={kfUserInfo.avatar&&kfUserInfo.avatar.length?kfUserInfo.avatar:require('../images/kf-avatar.png')}
                    className={styles.view3}
                />
            </View>
            <View className={styles.view6}>
                <span className={styles.span1}></span>
                <span className={styles.span2}></span>
                <ContentView data={data}/>
            </View>
        </View>
    </View>
)


const RightView = ({data,style})=>(
    <View className={styles.view1} style={Object.assign({},{marginLeft:50},style)}>
        <View className={styles.view7}>
            {DateFormat(data.create_time,'MM/dd hh:mm')}
        </View>
        <View className={styles.view8}>
            <View className={styles.view9}>
                <span className={styles.span3}/>
                <ContentView data={data}/>
            </View>
        </View>
    </View>
)


const ContentView = ({data})=>{
    if(data.content){
        switch (data.content_type) {
            case 'text':
                return(
                    <p className={styles.p1}>
                        {emojify(data.content.text_content)}
                    </p>
                )
            case 'image':
                return(
                    <p className={styles.p1}>
                        <ImageZoom
                            image={{
                                src: data.content.image_url,
                                alt: 'Golden Gate Bridge',
                                className: 'img',
                                style: { maxWidth: '100%' }
                            }}
                            zoomImage={{
                                src: data.content.image_url,
                                alt: 'Golden Gate Bridge'
                            }}
                        />
                    </p>
                )
            default:
                console.log(data);
                return (
                    <p className={styles.p1}>
                        未知消息类型
                    </p>
                )
        }
    }else {
        console.log(data);
        return (
            <p className={styles.p1}>
                未知数据类型
            </p>
        )
    }
}

const emojify = (str, options = {}) => {
    const convertedParts = str.split(shortnamesRegexStr).filter(Boolean).map((part, index, parts) => {
        const emojiIndex = emojiArray.findIndex((e)=>{return e===part})
        if(emojiIndex!==-1){
            return(
                <EmojiComponent
                    index = {emojiIndex}
                    key = {index}
                    style = {{float:'left',margin:0}}
                />
            )
        }
        return part;
    });

    return convertedParts
};

const shortnamesRegexStr = RegExp(`(:[+-\\d\\w]+:)`)
