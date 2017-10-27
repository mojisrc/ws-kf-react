import {
    FetchDataModule,
} from "ws-web-utils";
import { API_URL } from "./APP_ROOT_NETWORK_CONFIG";
import {
    AppName,
    AppPlatform,
    errorCollectApi,
    env,
    developer,
} from "./APP_ROOT_CONFIG";
import store from "../store"
// import { push , goBack } from 'react-router-redux'
import { userSignOut } from '../actions/user'



export default class Fetch {
    static fetch (ApiName, params){
        return FetchDataModule.fetch({
            API_URL,
            ApiName,
            params,
            login : store.getState().app.user.login,
            pushLoginFunc : ()=>{
                // store.dispatch(push('/user/loginRegister'))
            },
            headers : {
                 "User-Id": headers.user_id,
                 "Access-Token": headers.access_token,
                 "Source" : headers.Source,
                 "Wechat-Openid" : headers.wechat_openid,
            },
            APP_ROOT_CONFIG : {
                AppName,
                AppPlatform,
                errorCollectApi,
                env,
                developer,
            },
            removeUserInfoFunc : ()=>{
                store.dispatch(userSignOut({
                    func : ()=>{
                        // store.dispatch(goBack())
                    }
                }))
            },
        })
    }
    static setHeader(key, value) {
       headers[key] = value;
    }

}


let headers = {
    city: null,
    // user_id: 563,
    // access_token: '128f9ac2d723140cbb0119626a1a09d3',
    user_id: null,
    access_token: null,
    FetchDataLoading: null,
    device_identification: null,
    latitude: null,
    longitude: null,
    Source : 'web',
    ccyp_province_id: 0,
    dj_province_id: 0,
    district: null,
    wechat_openid : null,
}
