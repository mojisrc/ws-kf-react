import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/index";
import { Provider } from "react-redux";
import store from "./store/ConfigureStore";
import { selectedSessionListItem } from "./actions/message/sessionList";
import { getSendMessageDataSource } from "./pages/MessageSend";


const WsKfInit = ({ access_token, callback } = {}) => {
    var box = document.getElementsByTagName("body")[0];
    var initDiv = document.createElement("div");
    initDiv.id = "WsKfTestDom";
    box.appendChild(initDiv);

    ReactDOM.render(
        <Provider store={store}>
            <App
                access_token = {access_token}
                initCallBack = {callback}
            />
        </Provider>,
        document.getElementById("WsKfTestDom")
    );
};

const WsKfShowPanel = ({ id }) => {
    store.dispatch(selectedSessionListItem({ id }));
};

const SendMessage = (params) => {
    const {
        view
    } = store.getState()
    const {
        message
    } = view
    const {
        socketInstance
    } = message

    if(message.sendMessageApiFunc){
        message.sendMessageApiFunc(params)
    }else {
        const {
            content_type,
            text_content,
            image_url,
            templateData
        } = params

        const SendMessageDataSource = getSendMessageDataSource({
            selectedId: params.kfId,
            content_type,
            text_content,
            image_url,
            templateData,
        })

        if(SendMessageDataSource===false){
            return false
        }

        const {
            newParams,
        } = SendMessageDataSource

        socketInstance.send(JSON.stringify(newParams))

    }



};

export { WsKfInit, WsKfShowPanel, SendMessage };
