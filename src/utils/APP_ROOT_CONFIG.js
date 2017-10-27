

const __DEV__ = process.env.NODE_ENV==='development'
const __DEBUG__ = process.env.DEBUG_BUILD===true
/*
 *  项目名称
*/
const AppName =  `曹鲜生`


/*
 *  项目平台
*/
const AppPlatform = 'web'


/*
 *  项目存储前缀名称
*/
const AppStorageName =  `CaoXianSheng`


/*
 *  错误收集接口地址
*/
const errorCollectApi =  `http://doc.wenshuai.cn/api/error/add`


/*
 *  mobile Web域名
*/
const mobileWebDomain =  `http://www.jhyfxm.com`



/*
 *  微信AppID(公众平台)
*/
const wxAppId =  `wx9020121a72361668`



/*
 *  项目图标
*/
const AppIcon = require('../images/message.png')



/*
 *  项目版本
*/
const AppVersion = 'web'



/*
 *  项目环境
*/
const AppEnv = __DEV__ ? 'debug' : 'release'


/*
 *  项目开发者    (如果你加入了开发这个项目还没有填写个人信息的话，那么请在下面的allDeveloper中加入你的信息，并给自己起一个炫酷的id)
*/
const developer =  {
    main : {                                //主要负责开发者
        name : '李杰',
        phone : 13352029905,
    },
    allDeveloper : {
        xuanhe : {
            name : '李杰',
            phone : 13352029905,
        }
    }
}


/*
 *  开发环境基础配置
*/
const developmentConfig =  {

    // api域名
    // domain : 'http://caoxiansheng.wenshuai.cn',
    domain : 'http://www.jhyfxm.com',
    // domain : 'http://192.168.1.252/xiaomi',

    // 是否开启输出日志
    log : true,

    // 是否显示输出日志
    showLog : true,

    // 是否显示接口错误信息
    showNetWorkErrorInfo : true,

    // 是否静默提交接口错误信息
    defaultUploadNetWorkErrorInfo : false,

    dev : __DEV__,
}


/*
 *  生产环境基础配置
*/
const productionConfig =  {

    // api域名
    domain : 'http://www.jhyfxm.com',

    // 是否开启输出日志
    log : false,

    // 是否显示输出日志
    showLog : false,

    // 是否显示接口错误信息
    showNetWorkErrorInfo : false,

    // 是否静默提交接口错误信息
    defaultUploadNetWorkErrorInfo : true,

    dev : __DEV__,
}


/*
 *  系统环境配置
*/
const env = (()=>{
    if(__DEV__){                    //开发环境
        return developmentConfig
    }else {                         //生产环境
        return productionConfig
    }
})()

const closeLogger = ()=>{
    if(!__DEBUG__){
        // global.console = {
        //     info: () => {},
        //     log: () => {},
        //     warn: () => {},
        //     error: () => {},
        // }
    }
}
const closeShowLogger = ()=>{
    console.disableYellowBox = true;
}

if(!env.showLog){
    closeShowLogger()
}

if(!env.log){
    closeLogger()
}



export {
    AppName,
    AppPlatform,
    AppIcon,
    AppVersion,
    AppEnv,
    AppStorageName,
    errorCollectApi,
    developmentConfig,
    productionConfig,
    env,
    developer,
    mobileWebDomain,
    wxAppId,
    __DEBUG__,
}
