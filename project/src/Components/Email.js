import React, {Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import { List, InputItem } from 'antd-mobile';
import { WingBlank} from 'antd-mobile';
import { ImagePicker} from 'antd-mobile';
const data = [{
  url: '../images/DLW7@W5XOHV9D2ZN3OU1DY3.png',
  id: '2121',
}]
export default class AppHome extends Component {
//个人信息编辑页
constructor(){
  super();
  this.state = {
    uid:'',
    uname:'',//昵称
    uemail:'',//邮箱
  }
}
    onSubmit(e){
        const post ={
          uemail:document.getElementById('1').value,
          uname:document.getElementById('2').value,
          uid:document.getElementById('3').value,
        }
      console.log(post);
      fetch('/forgetPwd',{
        method:'POST',
        mode:'cors',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(post)
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        this.setState((state)=>{
            return {
                data:data
            }
        },()=>{
           if(data.msg==='success'){
               window.location='/index.html#/new?uid='+post.uid;
           }else{
               alert('验证失败');
           }
    })
        // 根据返回的消息，渲染响应的页面
    })
    }


















    state = {
      files: data,
    }
    onChange = (files, type, index) => {
      console.log(files, type, index);
      this.setState({
        files,
      });
    }
    onSegChange = (e) => {
      const index = e.nativeEvent.selectedSegmentIndex;
      this.setState({
        multiple: index === 1,
      });
    }


    render() {
      const { files } = this.state;
        return (
            <div>
            <div>
                            <NavBar
                style={{backgroundColor:'#FAA755',color:'white'}}
                onLeftClick={() => window.history.back(-1)}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '1px' }} />,
                  ]}
                  rightContent={[
                    <span onClick={() => this.onSubmit()}>验证</span>
                  ]}
                >信息验证 </NavBar>
            </div>
            <div>
            
              <InputItem
                type="email" 
                placeholder="电子邮箱"
                id="1"
              >邮箱</InputItem>
              <InputItem
                type="text" 
                placeholder="张三"
                id="2"
              >昵称</InputItem>
              <InputItem
                type="text" 
                placeholder="uid"
                id="3"
              >uid</InputItem>

            </div>
           

            </div>
        )
    }
}