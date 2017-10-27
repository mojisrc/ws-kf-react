import { Toast,Modal } from 'antd-mobile';
import stateHoc from './stateHoc';
import Fetch from './fetch';
import { initLibraryConfigFunc } from "ws-web-utils";
export { fetchStatus,StorageModule,publicFunction } from "ws-web-utils";



initLibraryConfigFunc({
    ToastInfo : (content, duration, onClose)=>{
        Toast.info(content, duration, onClose)
    },
    ToastError : (content, duration, onClose)=>{
        Toast.error(content, duration, onClose)
    },
    ToastWarn : (content, duration, onClose)=>{
        Toast.warning(content, duration, onClose)
    },
    ToastHide : ()=>{
        Toast.destroy()
    },
    ModalAlert : (title,content,array)=>{
        Modal.confirm({
            title,
            content,
            okText: array[2].text,
            okType: 'danger',
            cancelText: array[1].text,
            onOk() {
                array[2].onPress()
            },
            onCancel() {
                array[1].onPress()
            },
        })
    },
})



export {
    stateHoc,
    Fetch,
}
