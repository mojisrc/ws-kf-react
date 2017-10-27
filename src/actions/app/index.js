import types from '../../constants/ActionTypes';
import {Fetch,fetchStatus} from '../../utils';



export const setIsShowBootPage = (e)=>{
    return dispatch => {
        dispatch({
            type : types.app.UPDATE_FIRST_OPEN,
            data : e,
        })
    }
}


export const setIsShowFetchLoading = (e)=>{
    return dispatch => {
        dispatch({
            type : types.app.UPDATE_FETCH_LOADING,
            data : e,
        })
    }
}


export const getAppBasisData = (e)=>{
    return dispatch => {
        Fetch.fetch('CONFIGLISTS')
        .then(
            (e) => {
                if(e.errcode===0){
                    dispatch({
                        type : types.app.APP_BASIS_DATA,
                        data : e.data,
                        fetchStatus : fetchStatus.s,
                    })
                }else {
                    dispatch({
                        type : types.app.APP_BASIS_DATA,
                        fetchStatus : fetchStatus.e,
                    })
                }
            },
            (err) => {
                dispatch({
                    type : types.app.APP_BASIS_DATA,
                    fetchStatus : fetchStatus.f,
                })
            }
        )
    }
}
