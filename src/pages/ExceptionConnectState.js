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
import styles from "../styles/Exception.css";
import { ThemeStyle } from "../utils/style";



export default class ExceptionConnectState extends Component {
    render() {
        const {
            errorInfo,
            showPanelModal,
        } = this.props

        return (
            <Modal
                visible = {showPanelModal}
                closable = {false}
                className = {styles.modal1}
            >

                <View className={styles.view1}>
                    {errorInfo}
                </View>
            </Modal>
        )
    }
}
