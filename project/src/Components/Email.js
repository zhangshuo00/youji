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
                >重置密码 </NavBar>
            </div>
            <p style={{marginTop:'20%'}}><span style={{marginLeft:'0%',fontSize:'18px'}}>当前email地址:{}</span><button style={{width:'110px',height:'30px',lineHeight:'10px',borderRadius:'8px',border:'0px',backgroundColor: 'rgba(250, 167, 85, 1)',textAlign: 'center'}}>点击获取验证码</button></p>
            
            <input placeholder='输入验证码' style={{marginTop:'10%',height:'20px'}}></input>
            <a href="http://localhost:3000/new"><button style={{width:'100px',height:'30px',lineHeight:'10px',borderRadius:'8px',border:'0px',backgroundColor: 'rgba(250, 167, 85, 1)',textAlign: 'center'}}>验证</button></a>
        </div>
        )
    }
}

