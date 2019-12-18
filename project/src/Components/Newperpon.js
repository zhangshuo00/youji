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
          uname:'',//姓名
          signature:'',//签名
          // img_path:'',//图片
          email:'',//邮件
          usex:'',//性别
          files:[],
          upassword:'',//密码
  }
}
    onSubmit(e){
        var filelist = [];
          this.state.files.map((item)=>{
            filelist.push(item.url);
          })
          console.log(filelist);
        const post ={
          uid: localStorage.getItem('uid'),
          //img_path:this.state.img_path,
          uname:document.getElementById('2').value,
          usex:document.getElementById('3').value,
          signature:document.getElementById('1').value,
          // email:document.getElementById('4').value,
          imgData:filelist[0],
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

    onSubmit2(e){
      
      const post ={
        uid: localStorage.getItem('uid'),
        upassword:document.getElementById('4').value,
      }
    console.log(post);
    fetch('/modifyPwd',{
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
                    <span onClick={() => this.onSubmit()}>保存</span>
                  ]}
                >编辑信息 </NavBar>
            </div>
            <div>
                {/* <List renderHeader={() => 'Format'}> */}
              {/* <InputItem
                type="image" 
                
              >头像 */}
              <WingBlank style={{backgroundColor:'#fff',width:'96%',paddingLeft:'2%',paddingRight:'2%',margin:'0'}}>
                <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 1}
                multiple={this.state.multiple}
                // id="path"
                /><span style={{color:'gray'}}>点击更改头像</span>
            </WingBlank>
            {/* </InputItem> */}
              <InputItem
                type="text" 
                placeholder="做一份美食，看一场电影"
                id="1"
              >签名</InputItem>
              <InputItem
                type="text" 
                placeholder="张三"
                id="2"
              >昵称</InputItem>
              <InputItem
                type="text" 
                placeholder="男"
                id="3"
              >性别</InputItem>
            
              <div>
                <div>
                  <input id="4" className='sign-input2' style={{marginLeft:'10%',width:'80%'}} placeholder="密码" name="upassword"></input>
                  <input className='sign-button' style={{marginLeft:'25%',marginTop:'5%',width:'50%'}}  onClick={() => this.onSubmit2()} type="submit" value="修改密码"></input>
                </div>
              </div>


            </div>
           

            </div>
        )
    }
}

// const BasicInputExampleWrapper = createForm()(AppHome);
// ReactDOM.render(<BasicInputExampleWrapper />,  document.getElementById('root'));