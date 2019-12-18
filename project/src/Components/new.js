import React, {Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import { List, InputItem } from 'antd-mobile';

export default class AppHome extends Component {
//重置密码页
constructor(){
  super();
  this.state = {
  }
}

    onSubmit(e){
            var name1=document.getElementById('1').value;
          var name2=document.getElementById('2').value;
          if(name1==name2){
              const post ={
                uid:'k3i297def', 
                name1:document.getElementById('1').value,
                }
            console.log(post);
            fetch('https://majia.hbsdduckhouse.club/editPerInfo',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
            console.log(data);
                })
                // 根据返回的消息，渲染响应的页面
            }else{
                alert('密码错误');
            }
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
                >编辑密码 </NavBar>
            </div>
            <div  style={{overflow:'hidden',opacity:'0.8',position:'absolute',top:'45px',background:"url(" + require("../images/new_back.jpg") + ")",backgroundColor:'none',width:'100%',height:'97vh',backgroundRepeat:'no-repeat',backgroundSize:'100% 100%'}}>
                <List>
            
              <InputItem
                style={{background:'none !important'}}
                type="text" 
                placeholder="输入密码"
                id="1"
              ></InputItem>
              <InputItem
                type="text" 
                placeholder="再次输入密码"
                id="2"
              ></InputItem>
              
            </List>
            
            </div>
           

            </div>
        )
    }
}

