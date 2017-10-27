import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/Index';


const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const initialState = {

}

const store = createStoreWithMiddleware(rootReducer, initialState);


export default store
