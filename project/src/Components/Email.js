import React, { Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
export default class SionNew extends Component {

    render() {
        return(
        <div>
            <div>
                <NavBar
                    style={{backgroundColor:'#FAA755',color:'white'}}
                    onLeftClick={() => window.history.back(-1)}
                    leftContent={[
                        <Icon key="0" type="left" style={{ marginLeft: '1px' }} />,
                    ]}
                >忘记密码 </NavBar>
            </div>
            <div style={{position:'absolute',top:'45px',paddingBottom:'10px',paddingTop:'10px',backgroundColor:'#fff',height:'90vh'}}>
                <span style={{marginLeft:'3%',fontSize:'18px',}}>当前email地址:
                    <input type='Email' style={{width:'60%',opacity:'0.5',outline:'none',border:'1px solid rgba(187, 187, 187, 1)',borderRadius:'5px'}}></input>
                </span>
                <button style={{float:'left',marginLeft:'3%',marginTop:'10px',width:'30%',height:'30px',lineHeight:'10px',borderRadius:'8px',border:'0px',backgroundColor: 'rgba(250, 167, 85, 1)',color:'#fff',textAlign: 'center'}}>点击获取验证码</button>
                <div style={{marginLeft:'2%',width:'60%',height:'30px',float:'left',margin:'0',marginTop:'10px'}}></div>
                <input placeholder='输入验证码' style={{marginLeft:'3%',marginTop:'10px',height:'20px',width:'60%',opacity:'0.7',outline:'none',border:'1px solid rgba(187, 187, 187, 1)',borderRadius:'5px'}}></input>
                <a href="http://localhost:3000/new"><button style={{width:'100px',height:'30px',lineHeight:'10px',borderRadius:'8px',border:'0px',backgroundColor: 'rgba(250, 167, 85, 1)',textAlign: 'center'}}>验证</button></a>
            </div>
        </div>
        )
    }
}

