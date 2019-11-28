const defaultState = {
    userID:0,
    login : false,
}
//该组件为redux中的reducer函数定义
//默认用户的ID为0，表示现在没有登录
export default (state = defaultState,action)=>{
    if(action.type === 'change_userID'){
        state.userID = action.value;
        state.login = action.login;
    }
    return state;
}