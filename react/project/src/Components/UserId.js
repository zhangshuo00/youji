import { createStore } from 'redux';
import reducer from './Reducers'

let store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;

//使用redux共享用户的登陆状态与该用户的ID