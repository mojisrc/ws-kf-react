import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Button } from "antd-mobile";
import { WsKfInit,WsKfShowPanel,SendMessage } from "./index";

// token
// 李杰   4578c4c14328771b3c347af42e5ad5c5871523df
// 刘金萌  fc1817068f2c96b38d82b219ff2a344e8623f5cc

class App extends Component {
    componentDidMount(){
        WsKfInit({
            access_token: 'fc1817068f2c96b38d82b219ff2a344e8623f5cc',
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
                        WsKfShowPanel({id:1239})
                        SendMessage({
                            kfId: 1239,
                            content_type:'template',
                            templateData:{
                                template_title: '晋皇羊肥小米：妈妈米黄小米五谷杂粮生态米',
                                template_desc: '套餐包括：400g五年/三年/两年休耕基地米各一盒',
                                template_link: 'http://m.jhyfxm.com/mall/goodsDetail/992',
                                template_img: 'http://shengxing.oss-cn-beijing.aliyuncs.com/app/20170911/1505127015291203.png',
                                template_extra_name: 'goods',
                                template_extra_content: {
                                    relation_id: 992,
                                },
                            }

                        })
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
