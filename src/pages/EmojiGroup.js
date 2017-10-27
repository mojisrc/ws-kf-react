import React, { Component } from "react";
import { Button, Modal, Icon, InputItem, Popover } from "antd-mobile";
import { View } from "react-web-dom";
import styles from "../styles/EmojiGroup.css";
import { ThemeStyle } from "../utils/style";
import PropTypes from 'prop-types';

const emojiArrayDataSource = [
    "smile",
    "laughing",
    "blush",
    "heart_eyes",
    "smirk",
    "flushed",
    "grin",
    "kissing_smiling_eyes",
    "wink",
    "kissing_closed_eyes",
    "stuck_out_tongue_winking_eye",
    "sleeping",
    "worried",
    "sweat_smile",
    "cold_sweat",
    "joy",
    "sob",
    "angry",
    "mask",
    "scream",
    "sunglasses",
    "thumbsup",
    "clap",
    "ok_hand"
];

export const emojiArray = emojiArrayDataSource.map((e)=>{return `:${e}:`})

export const EmojiComponent = ({onClick,index,style})=>(
    <i
        className={styles.i1}
        onClick={()=>{
            onClick&&onClick()
        }}
        style = {
            Object.assign({},{
                backgroundImage:`url(${emojiGroupImage})`,
                backgroundPosition: `0 -${25*index}px`
            },style)
        }
    />
)

const emojiGroupImage = 'http://mojiim-static.oss-cn-beijing.aliyuncs.com/emojiGroup.png'

export default class EmojiGroup extends Component {
    state = {
        emojiArray,
    };
    render() {
        return (
            <View className={styles.view1}>
                {
                    emojiArray.map((data,i)=>(
                        <EmojiComponent
                            onClick={()=>{
                                this.props.onSelect({
                                    emoji: data,
                                })
                            }}
                            key = {i}
                            index = {i}
                        />
                    ))
                }
            </View>
        )
    }
}
