import React, {Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import { List, InputItem } from 'antd-mobile';

export default class AppHome extends Component {
//个人信息编辑页
constructor(){
  super();
  this.state = {
    uid:'',
          name:'',//姓名
          context:'',//签名
          img_path:'',//图片
          email:'',//邮件
          exc:''//性别
  }
}
onChange1(e){// 当input内改变时，将value值写入state
  this.setState({
    // title:document.getElementById('title').innerHTML
    img_path:e.target.value
  })
}
onChange2(e){// 当input内改变时，将value值写入state
  this.setState({
    // context:document.getElementById('context').innerHTML
    context:e.target.value
  })
}
onChange3(e){// 当input内改变时，将value值写入state
  this.setState({
    // context:document.getElementById('context').innerHTML
    name:e.target.value
  })
}
onChange4(e){// 当input内改变时，将value值写入state
  this.setState({
    // context:document.getElementById('context').innerHTML
    exc:e.target.value
  })
}
onChange5(e){// 当input内改变时，将value值写入state
  this.setState({
    // context:document.getElementById('context').innerHTML
    email:e.target.value
  })
}
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
          name:this.state.name,
          context:this.state.context,
          email:this.state.email,
          exc:this.state.exc,
        }
      console.log(post);
      fetch('/newperpon',{
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
                style={{backgroundColor:'pink',color:'white'}}
                onLeftClick={() => window.location='/perpon'}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '1px' }} />,
                  ]}
                  rightContent={[
                    <span onClick={() => this.onSubmit()}>保存</span>
                  ]}
                >编辑信息 </NavBar>
            </div>
            <div>
                <List renderHeader={() => 'Format'}>
              <InputItem
                type="image" value={this.state.img_path} onChange={(e) => this.onChange1(e)}
              >头像</InputItem>
              <InputItem
                type="text" value={this.state.context} onChange={(e) => this.onChange2(e)}
                placeholder="做一份美食，看一场电影"
              >签名</InputItem>
              <InputItem
                type="text" value={this.state.name} onChange={(e) => this.onChange3(e)}
                placeholder="眷恋"
              >昵称</InputItem>
              <InputItem
                type="text" value={this.state.sex} onChange={(e) => this.onChange4(e)}
                placeholder="男"
              >性别</InputItem>
              <InputItem
                type="email" value={this.state.email} onChange={(e) => this.onChange5(e)}
                placeholder="1062208122@qq.com"
              >邮箱</InputItem>
            </List>
            
            </div>
           

            </div>
        )
    }
}

// const BasicInputExampleWrapper = createForm()(AppHome);
// ReactDOM.render(<BasicInputExampleWrapper />,  document.getElementById('root'));