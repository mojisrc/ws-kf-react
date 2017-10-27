import types from '../../constants/ActionTypes';
import { Toast } from "antd-mobile";
import {StorageModule,Fetch} from '../../utils';



/**
 * 登陆方法
**/
export const userLogin = ({userInfoData,func}={})=>{
    return dispatch => {

        //整理用户信息
        // const userInfo = manageUserInfo(userInfoData)

        //登陆后需要处理的方法
        // userLoginOutFunc(userInfo)

        //设置登陆状态
        dispatch(setUserStatus(true,userInfoData))

        func && func()
    }
}




/**
 * 退出登陆方法
**/
export const userSignOut = ({func}={})=>{
    return dispatch => {

        //退出登陆后需要处理的方法
        userSignOutFunc()

        //设置退出登陆状态
        dispatch(setUserStatus(false,null))

        func && func()
    }
}




/**
 * 初始化检查用户登陆
**/
export const initUserInfoStorage = (userInfoData)=>{
    return dispatch => {

        //获取本地缓存用户信息数据
        const userInfoData = StorageModule._getUserInfo()

        if(userInfoData){
            const userInfo = JSON.parse(userInfoData)

            userLoginOutFunc(userInfo)

            dispatch(setUserStatus(true,userInfo))
        }else {
            //没有用户信息缓存
            //未来邀请注册什么的放在这里写逻辑
        }

        dispatch({
            type : types.app.INIT_USERINFO_STORAGE,
            data : true
        })
    }
}




/**
 * 更新用户信息
**/
export const updateUserInfo = ({callback})=>{
    return dispatch => {

        dispatch({
            type : types.user.UPDATE_USER_INFO_LOADING,
            refreshing : true,
        })

        Fetch.fetch("USERGETUSERINFO")
        .then((e) => {
            if (e.errcode === 0) {
                dispatch(updateUserInfoFunc(e.data))
                callback&&callback()
            } else {
                Toast.fail("获取用户最新数据异常");
                dispatch({
                    type : types.user.UPDATE_USER_INFO_LOADING,
                    refreshing : false,
                })
            }
        })

    }
}




/**
 * 修改用户信息
**/
export const modifyUserInfo = (params,callback)=>{
    return dispatch => {
        Fetch.fetch('USEREDITPROFILE',params)
        .then((e)=>{
            if(e.errcode===0){
                Toast.info('修改成功',1)
                dispatch(updateUserInfoFunc(e.data))
                callback&&callback()
            }else{
                Toast.offline(e.errmsg)
            }
        })
    }
}




/**
 * 被动修改用户信息
**/
export const passiveModifyUserInfo = ({data,callback})=>{
    return dispatch => {
        dispatch(updateUserInfoFunc(data))
        callback&&callback()
    }
}






//登陆后需要处理的方法
const userLoginOutFunc = (userInfo)=>{
    StorageModule._setUserInfo(userInfo)
    Fetch.setHeader('user_id',userInfo.user_id)
    Fetch.setHeader('access_token',userInfo.access_token)
    Fetch.setHeader('wechat_openid',userInfo.wechat_openid)
}




//退出登陆后需要处理的方法
const userSignOutFunc = ()=>{
    StorageModule._removeUserInfo()
    Fetch.setHeader('user_id',null)
    Fetch.setHeader('access_token',null)
    Fetch.setHeader('wechat_openid',null)
}




//管理用户数据
const manageUserInfo = (e)=> {
    return {
        user_id : e.id,
        phone : e.phone,
        sex: e.sex,
        birthday: e.birthday,
        invitation_code : e.invitation_code,
        user_type : e.user_type,
        name: e.name,
        nickname: e.nickname,
        avatar: e.avatar,
        access_token:e.access_token,
        last_choose_city:e.last_choose_city,
        frozen_points : e.frozen_points,
        points : e.points,
        available_predeposit : e.available_predeposit,
        freeze_predeposit : e.freeze_predeposit,
        message_count : e.message_count,
        message_read_count : e.message_read_count,
        wechat_openid : e.wechat_openid,
        is_set_paypass : e.is_set_paypass,
    }
}



// 设置用户状态
const setUserStatus = (login,userInfo)=>{
    return dispatch => {
        dispatch({
            type : types.user.USER_STATUS_CHANGE,
            login : login,
            userInfo : userInfo
        })
    }
}





// 更新用户信息方法
const updateUserInfoFunc = (e)=>{
    const userInfo = manageUserInfo(e)
    userLoginOutFunc(userInfo)
    return {
        type : types.user.UPDATE_USER_INFO,
        userInfo : userInfo,
        refreshing : false,
    }
}



// 更新个人中心混合的各种状态数量
export const getUserMixedStateNum = ()=>{
    return dispatch => {
        Fetch.fetch('USERMIXEDSTATENUM')
        .then((e)=>{
            if(e.errcode===0){
                const {data} = e
                dispatch({
                    type : types.user.GET_USER_MIXEDSTATENUM_DATA,
                    couponNum : data.voucher,
                    orderNum : {
                        order_nopay : data.order_nopay,
                        order_nosend : data.order_nosend,
                        order_noreceiving : data.order_noreceiving,
                        order_noeval : data.order_noeval,
                        order_refund : data.order_refund,
                    }
                })
            }else {
                Toast.offline(e.errmsg)
            }
        })
    }
}



// 更新全部未读消息
export const getUnreadAllCount = ()=>{
    return dispatch => {
        Fetch.fetch('MESSAGEUNREADALLCOUNT')
        .then((e)=>{
            if(e.errcode===0){
                dispatch({
                    type : types.user.GET_UNREAD_ALL_COUNT,
                    data : e.data.unread_count,
                })
            }else {
                Toast.offline(e.errmsg)
            }
        })
    }
}
