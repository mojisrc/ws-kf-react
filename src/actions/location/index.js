import types from '../../constants/ActionTypes';
import {Toast} from 'antd-mobile';
import {StorageModule,Fetch,fetchStatus} from '../../utils';
// import store from '../../store/ConfigureStore';



// 获取地址选择器数据
export const getAlphabetLocationData = ()=>{
    return dispatch => {
        Fetch.fetch('AREAAREALIST')
        .then((e)=>{
            if(e.errcode===0){
                StorageModule.set('alphabetAddressData',JSON.stringify(e.list))
                dispatch({
                    type : types.location.SET_ALPHABET_ADDRESS_DATA,
                    data : e.list
                })
            }else{
                Toast.offline('获取字母选择器地址数据异常')
            }
        })
    }
}




// 设置地址选择器数据
export const setAlphabetLocationData = (e)=>{
    return dispatch => {
        dispatch({
            type : types.location.SET_ALPHABET_ADDRESS_DATA,
            data : e
        })
    }
}



// 初始化全部城市数据
export const initialAllLocationData = (e)=>{
    return dispatch => {
        const allAddressData = StorageModule.get('allAddressData')
        const pickerAllAddressData = StorageModule.get('pickerAllAddressData')
        if(allAddressData&&pickerAllAddressData&&JSON.parse(allAddressData).length>1){
            dispatch(setAllLocationData({
                allAddressData : JSON.parse(allAddressData),
                pickerAllAddressData : JSON.parse(pickerAllAddressData),
            }))
        }else {
            dispatch(getAllLocationData())
        }
    }
}



// 获取全部地址数据
export const getAllLocationData = (callback)=>{
    return dispatch => {
        Fetch.fetch('AREAPROVINCECITYBLOCK')
        .then((e)=>{
            if(e.errcode===0){

                let data = [];
                e.list.map((one,i)=>{
                    data.push({
                        value : one.id,
                        label : one.name,
                        children : one.child.map((two,j)=>{
                            return {
                                value : two.id,
                                label : two.name,
                                children : two.child.map((three,z)=>{
                                    return {
                                        value : three.id,
                                        label : three.name,
                                    }
                                })
                            }
                        })
                    })
                    return true
                })

                StorageModule.set('allAddressData',JSON.stringify(e.list))
                StorageModule.set('pickerAllAddressData',JSON.stringify(data))

                dispatch({
                    type : types.location.SET_ALL_ADDRESS_DATA,
                    data : e.list,
                    pickerAllAddressData : data,
                    fetchStatus : fetchStatus.s,
                })

                callback && dispatch(callback())
            }else{
                Toast.offline('获取全部地址数据异常')
            }
        })
    }
}


// 设置全部地址数据
export const setAllLocationData = ({allAddressData,pickerAllAddressData})=>{
    return dispatch => {
        dispatch({
            type : types.location.SET_ALL_ADDRESS_DATA,
            data : allAddressData,
            pickerAllAddressData,
            fetchStatus : fetchStatus.s,
        })
    }
}



// // 获得用户当前定位
// export const getUserLocationInfo = ()=>{
//     return dispatch => {
//         Geolocation.getCurrentPosition()
//         .then( async (e)=>{
//             console.log(e);
//             const cityText = e.city
//             const allAddressDataString = await StorageModule.get('allAddressData')
//             if(allAddressDataString){
//                 const allAddressData = JSON.parse(allAddressDataString)
//
//                 const {
//                     cityId,
//                     userLocationInfoAreaChild
//                 } = selectArrayIndexFunc(allAddressData,cityText)
//
//                 const locationInfo = {
//                     city : e.city,
//                     baiduCityCode : e.cityCode,
//                     cityCode : cityId,
//                     longitude : e.longitude,
//                     latitude : e.latitude,
//                     address : e.address,
//                 }
//                 StorageModule.set('userLocationInfo',JSON.stringify(locationInfo))
//                 InteractionManager.runAfterInteractions(()=>{
//                     dispatch({
//                         type : types.location.SET_USER_LOCATION_INFO,
//                         userLocationInfo : locationInfo,
//                         userLocationInfoAreaChild,
//                     })
//                     dispatch({
//                         type : types.location.SET_LOCATION_INFO,
//                         locationInfo : locationInfo,
//                     })
//                 })
//
//                 LocationModule.SetFetchLocation(locationInfo)
//
//             }else {
//                 store.dispatch(getAllLocationData(getUserLocationInfo))
//             }
//         })
//     }
// }
//
//
//
//
//
// // 获得用户当前定位
// export const getLocationInfo = ()=>{
//     return dispatch => {
//         Geolocation.getCurrentPosition()
//         .then( async (e)=>{
//             console.log(e);
//             const cityText = e.city
//             const allAddressDataString = await StorageModule.get('allAddressData')
//             if(allAddressDataString){
//                 const allAddressData = JSON.parse(allAddressDataString)
//
//                 const {
//                     cityId
//                 } = selectArrayIndexFunc(allAddressData,cityText)
//
//                 const locationInfo = {
//                     city : e.city,
//                     baiduCityCode : e.cityCode,
//                     cityCode : cityId,
//                     longitude : e.longitude,
//                     latitude : e.latitude,
//                     address : e.address,
//                 }
//                 InteractionManager.runAfterInteractions(()=>{
//                     dispatch({
//                         type : types.location.SET_LOCATION_INFO,
//                         locationInfo : locationInfo,
//                     })
//                 })
//
//                 LocationModule.SetFetchLocation(locationInfo)
//
//             }else {
//                 store.dispatch(getAllLocationData(getLocationInfo))
//             }
//         })
//     }
// }
//
//
//
//
// // 设置用户选择定位
// export const setUserLocationInfo = (userLocationInfo)=>{
//     return async(dispatch) => {
//         const cityText = userLocationInfo.city
//         const allAddressDataString = await StorageModule.get('allAddressData')
//         if(allAddressDataString){
//             const allAddressData = JSON.parse(allAddressDataString)
//
//             const {
//                 userLocationInfoAreaChild
//             } = selectArrayIndexFunc(allAddressData,cityText)
//
//             InteractionManager.runAfterInteractions(()=>{
//                 dispatch({
//                     type : types.location.SET_USER_LOCATION_INFO,
//                     userLocationInfo : userLocationInfo,
//                     userLocationInfoAreaChild : userLocationInfoAreaChild
//                 })
//             })
//             LocationModule.SetFetchLocation(userLocationInfo)
//         }else {
//             store.dispatch(getAllLocationData(setUserLocationInfo.bind(userLocationInfo)))
//         }
//     }
// }




// const selectArrayIndexFunc = (cityArray,cityText)=>{
//     let cityId = null;
//     let userLocationInfoAreaChild = null;
//     cityArray.map((oneData,i)=>{
//         oneData.child.map((twoData,j)=>{
//             if(twoData.areaname===cityText){
//                 cityId = twoData.id;
//                 userLocationInfoAreaChild = twoData.child;
//             }
//         })
//     })
//     if(cityId&&userLocationInfoAreaChild){
//         return {
//             cityId,
//             userLocationInfoAreaChild
//         }
//     }else{
//         Toast.offline('地址数据匹配异常')
//     }
// }
