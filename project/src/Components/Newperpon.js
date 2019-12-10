import React, {Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import { List, InputItem } from 'antd-mobile';

export default class AppHome extends Component {
//个人信息编辑页
constructor(){
  super();
  this.state = {
    uid:'',
          uname:'',//姓名
          signature:'',//签名
          // img_path:'',//图片
          email:'',//邮件
          usex:''//性别
  }
}
// onChange1(e){// 当input内改变时，将value值写入state
//   this.setState({
//     // title:document.getElementById('title').innerHTML
//     img_path:e.target.value
//   })
// }
// onChange2(e){// 当input内改变时，将value值写入state
//   this.setState({
//     // context:document.getElementById('context').innerHTML
//     context:e.target.value
//   })
// }
// onChange3(e){// 当input内改变时，将value值写入state
//   this.setState({
//     // context:document.getElementById('context').innerHTML
//     name:e.target.value
//   })
// }
// onChange4(e){// 当input内改变时，将value值写入state
//   this.setState({
//     // context:document.getElementById('context').innerHTML
//     exc:e.target.value
//   })
// }
// onChange5(e){// 当input内改变时，将value值写入state
//   this.setState({
//     // context:document.getElementById('context').innerHTML
//     email:e.target.value
//   })
// }
    onSubmit(e){
      // const labelTitle = document.getElementById('title').innerHTML;
      //   const labelContext = document.getElementById('context').innerHTML;
    //     const f=document.getElementsByClassName('path')[0].files[0];
    // var reader = new FileReader();
    // const fs = reader.readAsDataURL(f);	
      //   console.log(labelContext,labelTitle);
        const post ={
          uid:'k3i297def', 
          //img_path:this.state.img_path,
          uname:document.getElementById('2').value,
          signature:document.getElementById('1').value,
          // email:document.getElementById('4').value,
          usex:document.getElementById('3').value,
        }
      console.log(post);
      fetch('/editPerInfo',{
        method:'POST',
        mode:'cors',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify(post)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
        })
        // 根据返回的消息，渲染响应的页面
    }


    render() {
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
                    <span onClick={() => this.onSubmit()}>保存</span>
                  ]}
                >编辑信息 </NavBar>
            </div>
            <div>
                <List>
              {/* <InputItem
                type="image" value={this.state.img_path} onChange={(e) => this.onChange1(e)}
              >头像</InputItem> */}
              <InputItem
                type="text" 
                placeholder="做一份美食，看一场电影"
                id="1"
              >签名</InputItem>
              <InputItem
                type="text" 
                placeholder="眷恋"
                id="2"
              >昵称</InputItem>
              <InputItem
                type="text" 
                placeholder="男"
                id="3"
              >性别</InputItem>
              {/* <InputItem
                type="email" 
                placeholder="1062208122@qq.com"
                id="4"
              >邮箱</InputItem> */}
            </List>
            
            </div>
           

            </div>
        )
    }
}

// const BasicInputExampleWrapper = createForm()(AppHome);
// ReactDOM.render(<BasicInputExampleWrapper />,  document.getElementById('root'));