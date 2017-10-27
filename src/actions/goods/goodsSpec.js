import types from '../../constants/ActionTypes';
import { message } from "antd";
import {
    Fetch,
    fetchStatus
} from '../../utils';

export const getAllSpecCategory = ()=>{
    return dispatch => {
        dispatch({
            type : types.goods.GET_ALL_SPEC_CATEGORY,
            specCategoryList:[
                {
                    id:'1',
                    title:'尺寸',
                    child:[
                        {
                            id:'1-1',
                            title:'M',
                            isSelected:false,
                        },{
                            id:'1-2',
                            title:'L',
                            isSelected:false,
                        },{
                            id:'1-3',
                            title:'S',
                            isSelected:false,
                        },{
                            id:'1-4',
                            title:'XXXXXXL',
                            isSelected:false,
                        }
                    ],
                    isSelected:false,
                },{
                    id:'2',
                    title:'颜色',
                    child:[
                        {
                            id:'2-1',
                            title:'红色',
                            isSelected:false,
                        },{
                            id:'2-2',
                            title:'白色',
                            isSelected:false,
                        },{
                            id:'2-3',
                            title:'黑色',
                            isSelected:false,
                        },{
                            id:'2-4',
                            title:'蓝色',
                            isSelected:false,
                        },{
                            id:'2-5',
                            title:'灰色',
                            isSelected:false,
                        }
                    ],
                    isSelected:false,
                },{
                    id:'3',
                    title:'规格',
                    child:[
                        {
                            id:'3-1',
                            title:'2kg',
                            isSelected:false,
                        },{
                            id:'3-2',
                            title:'1kg',
                            isSelected:false,
                        },{
                            id:'3-3',
                            title:'500g',
                            isSelected:false,
                        }
                    ],
                    isSelected:false,
                }
            ],
            specCategoryListFetchStatus : fetchStatus.s,
        })
        // dispatch({
        //     type : types.goods.GET_ALL_SPEC_CATEGORY,
        //     specCategoryListFetchStatus : fetchStatus.l,
        // })
        // Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
        // .then(
        //     e => {
        //         if(e.errcode===0){
        //             dispatch({
        //                 type : types.goods.GET_ALL_SPEC_CATEGORY,
        //                 specCategoryList:e.list,
        //                 specCategoryListFetchStatus : fetchStatus.s,
        //             })
        //         }else {
        //             message.error(e.errmsg)
        //             dispatch({
        //                 type : types.goods.GET_ALL_SPEC_CATEGORY,
        //                 specCategoryListFetchStatus : fetchStatus.e,
        //             })
        //         }
        //     },
        //     err => {
        //         dispatch({
        //             type : types.goods.GET_ALL_SPEC_CATEGORY,
        //             specCategoryListFetchStatus : fetchStatus.f,
        //         })
        //     }
        // )
    }
}

//添加新的型号分类
export const addNewSpecCategory = ()=>{
    return dispatch => {
        Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
        .then(
            e => {
                if(e.errcode===0){
                    dispatch({
                        type : types.goods.ADD_NEW_SPEC_CATEGORY,
                        specCategoryList:e.list,
                        specCategoryListFetchStatus : fetchStatus.s,
                    })
                }else {
                    message.error(e.errmsg)
                }
            }
        )
    }
}

//型号分类展示
export const ifSpecCategoryShowFunc = (ifSpecCategoryShow)=>{
    return dispatch => {
        dispatch({
            type : types.goods.IF_SPEC_CATEGORY_SHOW,
            ifSpecCategoryShow,
        })
    }
}

//添加型号分类
export const addSpecCategoryShow = (specCategoryShowList,id)=>{
    return dispatch => {
        dispatch(ifSpecCategoryShowFunc(true))
        specCategoryShowList.push({
            id,
            child:[]
        })
        console.log('specCategoryShowList',specCategoryShowList);
        dispatch({
            type : types.goods.ADD_SPEC_CATEGORY_SHOW,
            specCategoryShowList,
        })
    }
}

//删除型号分类
export const delectSpecCategoryShow = (index,specCategoryShowList)=>{
    return dispatch => {
        if(specCategoryShowList.length>1){
            specCategoryShowList.splice(index,1)
            dispatch({
                type : types.goods.DELETE_SPEC_CATEGORY_SHOW,
                specCategoryShowList : specCategoryShowList,
            })
            dispatch(ifSpecCategoryShowFunc(true))
        }else {
            dispatch({
                type : types.goods.DELETE_SPEC_CATEGORY_SHOW,
                specCategoryShowList : [],
            })
            dispatch(ifSpecCategoryShowFunc(false))
        }
    }
}


// export const addSpec = ()=>{
//     return dispatch => {
//         Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
//         .then(
//             e => {
//                 if(e.errcode===0){
//                     dispatch({
//                         type : types.goods.ADD_SPEC,
//                         list:e.list,
//                         fetchStatus : fetchStatus.s,
//                     })
//                 }else {
//                     message.error(e.errmsg)
//                     dispatch({
//                         type : types.goods.ADD_SPEC,
//                         fetchStatus : fetchStatus.e,
//                     })
//                 }
//             }
//         )
//     }
// }
//
// export const deleteSpec = ()=>{
//     return dispatch => {
//         Fetch.fetch("ADRECOMMENDLISTS",{category_id:6})
//         .then(
//             e => {
//                 if(e.errcode===0){
//                     dispatch({
//                         type : types.goods.DELETE_SPEC,
//                         list:e.list,
//                         fetchStatus : fetchStatus.s,
//                     })
//                 }else {
//                     message.error(e.errmsg)
//                     dispatch({
//                         type : types.goods.DELETE_SPEC,
//                         fetchStatus : fetchStatus.e,
//                     })
//                 }
//             }
//         )
//     }
// }
//
//
//
// export const specCategoryDelectShow = (specCategoryShow)=>{
//     return dispatch => {
//         dispatch({
//             type : types.goods.SPEC_CATEGORY_DELETE_SHOW,
//             specCategoryShow,
//         })
//     }
// }
//
// export const specAddShow = ()=>{
//     return dispatch => {
//         dispatch({
//             type : types.goods.SPEC_ADD_SHOW,
//             list:[],
//         })
//     }
// }
//
// export const specDeleteShow = ()=>{
//     return dispatch => {
//         dispatch({
//             type : types.goods.SPEC_DELETE_SHOW,
//             list:[],
//         })
//     }
// }
