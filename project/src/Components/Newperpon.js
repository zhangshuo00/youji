import React, { ReactDOM,Component } from 'react';
import { NavBar, Icon, Tabs, WingBlank, Carousel, Grid, Flex, WhiteSpace} from 'antd-mobile';
import {Link,Route} from 'react-router-dom'; 
import { ImagePicker, SegmentedControl } from 'antd-mobile';
import { List, InputItem } from 'antd-mobile';
// import { createForm } from 'rc-form';
export default class AppHome extends Component {

  constructor(props){
    super();
    this.state={
        // data:[
        //     {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',time:'11月22号',text:'做一份美味面包'},           
        //     {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',time:'11月22号',text:'做一份美味炒菜'},
        //     {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',time:'11月22号',text:'做一份美味炒菜2'},
        //     {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',time:'11月22号',text:'做一份美味炒菜3'},
        //     {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',time:'11月22号',text:'做一份美味炒菜4'},
        //     {img_path:'images/b7ac218a5ff18bb0d7df7b1c955c0d8f.jpg',time:'11月22号',text:'做一份美味炒菜5'},
        // ],
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

// handleClick = () => {
//   this.inputRef.focus();
// }

    render() {
        // const { getFieldProps } = this.props.form;
        
        
        return (
            <div>
            <div>
                            <NavBar
                style={{backgroundColor:'pink',color:'white'}}
                onLeftClick={() => window.location='/sion'}
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
                placeholder="186 1234 1234"
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