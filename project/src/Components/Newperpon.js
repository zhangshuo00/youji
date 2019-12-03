import React, {Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import { List, InputItem } from 'antd-mobile';

export default class AppHome extends Component {
//个人信息编辑页
  constructor(props){
    super();
    this.state={
    }
}

componentDidMount(){
    // const user =this.getState();
    // console.log(user);
    // fetch('')
    // .then((res)=>res.json())
    // .then((res)=>{
    //     this.setState({data:res.data});
    // })
}


    render() {

        
        return (
            <div>
            <div>
                            <NavBar
                style={{backgroundColor:'pink',color:'white'}}
                onLeftClick={() => window.location='/perpon'}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '1px' }} />,
                  ]}
                  rightContent={[
                    <span>保存</span>
                  ]}
                >编辑信息 </NavBar>
            </div>
            <div>
                <List renderHeader={() => 'Format'}>
              <InputItem
                type="image"
              >头像</InputItem>
              <InputItem
                type="text"
                placeholder="做一份美食，看一场电影"
              >签名</InputItem>
              <InputItem
                type="text"
                placeholder="眷恋"
              >昵称</InputItem>
              <InputItem
                type="text"
                placeholder="男"
              >性别</InputItem>
              <InputItem
                type="phone"
                placeholder="186 1234 1234"
              >手机号</InputItem>
            </List>
            
            </div>
           

            </div>
        )
    }
}

// const BasicInputExampleWrapper = createForm()(AppHome);
// ReactDOM.render(<BasicInputExampleWrapper />,  document.getElementById('root'));