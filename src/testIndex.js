import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Button } from "antd-mobile";
import { WsKfInit,WsKfShowPanel,SendMessage } from "./index";


class App extends Component {
    componentDidMount(){
        WsKfInit({
            access_token: '4578c4c14328771b3c347af42e5ad5c5871523df',
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
                        WsKfShowPanel({id:894})
                        // setTimeout(()=>{
                        //     SendMessage({
                        //         content_type:'text',
                        //         text_content:'cccccc',
                        //         kfId: 894
                        //     })
                        // },1500)
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
