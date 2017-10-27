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
        default:
            return newData
    }

}
