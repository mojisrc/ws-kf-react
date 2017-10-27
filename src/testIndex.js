import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Button } from "antd-mobile";
import { WsKfInit,WsKfShowPanel } from "./index";


class App extends Component {
    componentDidMount(){
        WsKfInit({
            access_token: 'f914f40705ced1e4495f1764d9f571aba1d7fe69',
            callback: (e)=>{
                console.log(e);
            }
        })
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit
                    {" "}
                    <code>src/App.js</code>
                    {" "}
                    and save to reload.
                </p>

                <Button
                    type="primary"
                    style={{ margin: "0 1rem" }}
                    onClick={() => {
                        WsKfShowPanel({id:2})
                    }}
                >
                    联系客服
                </Button>
            </div>
        );
    }
}



ReactDOM.render(<App />, document.getElementById('root'));



registerServiceWorker();
