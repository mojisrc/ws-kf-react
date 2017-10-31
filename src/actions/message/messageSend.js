import types from '../../constants/ActionTypes';
import {Fetch,fetchStatus} from '../../utils';



export const addMessageItemData = ({data,id,allMessageListData,removeSign})=>{
    return dispatch => {
        let newData = {}
        newData[id] = Object.assign({},allMessageListData[id])
        const newItemData = newItemDataFunc(data)
        if(removeSign){
            const removeSignIndex = newData[id].list.findIndex((e)=>{return e.sign===removeSign})
            newData[id].list[removeSignIndex] = newItemData
        }else {
            newData[id].list.unshift(newItemData)
        }
        dispatch({
            type : types.message.ADD_MESSAGE_ITEM_DATA,
            data: newData
        })
    }
}


export const changeMessageItemData = ({data,index,id,allMessageListData})=>{
    return dispatch => {
        let newData = {}
        newData[id] = Object.assign({},allMessageListData[id])
        const newItemData = newItemDataFunc(data)
        newData[id].list[index] = newItemData
        dispatch({
            type : types.message.ADD_MESSAGE_ITEM_DATA,
            data: newData
        })
    }
}



const newItemDataFunc = (data)=>{
    let newData = {
        content: {

        },
        content_type: data.content_type,
        create_time: data.create_time,
        id: data.message_id,
        relation_id: data.relation_id,
        send_state: 0,
        sign: data.sign,
        type: data.type,
        user_id: data.user_id,
    }
    switch (data.content_type) {
        case 'text':
            newData.content['text_content'] = data.text_content
            return newData
        case 'image':
            newData.content['image_url'] = data.image_url
            return newData
        case 'template':
            newData.content['template_title'] = data.template_title
            newData.content['template_desc'] = data.template_desc
            newData.content['template_link'] = data.template_link
            newData.content['template_img'] = data.template_img
            newData.content['template_extra_name'] = data.template_extra_name
            newData.content['template_extra_content'] = data.template_extra_content
            return newData
        default:
            return newData
    }

}



export const setSendMessageApi = (func)=>{
    return dispatch => {
        dispatch({
            type : types.message.SET_SEND_MESSAGE_API,
            func,
        })
    }
}
