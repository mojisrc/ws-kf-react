import {combineReducers} from 'redux';
import userIndex from './user/index';
import settingIndex from './setting';
import homeIndex from './home';
import appInitial from './app';
import message from './message';



const rootReducer = combineReducers({
    app : combineReducers({
        user : userIndex,
        appInitial,
        settingIndex,
    }),
    view : combineReducers({
        homeIndex,
        message,
    }),
});

export default rootReducer;
