import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./containers/index";
import { Provider } from "react-redux";
import store from "./store/ConfigureStore";
import { selectedSessionListItem } from "./actions/message/sessionList";

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

export { WsKfInit, WsKfShowPanel };
