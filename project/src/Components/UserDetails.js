import React, { Component } from 'react';
import '../css/userDetails.css';
import {Icon,Modal } from 'antd-mobile';
const alert = Modal.alert;
//用户详情页

export default class UserDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{heading:'images/timg.jpg',uname:'请登录',uemail:'请登录'},           
        }
    }

    // componentDidMount(){
    //     fetch('')
    //     .then((res)=>res.json())
    //     .then((res)=>{
    //         this.setState({data:res.data});
    //     })
    // }

    headingChange=()=> {
        console.log('x');
    }
    userOut=()=>{
        this.setState({
            data:{heading:'images/timg.jpg',uname:'请登录',uemail:'请登录'}
        })
    }

    render() {
        return (
            <div>
                <Icon type="left" onClick={() => window.location='/sort'} style={{marginLeft:'10%',paddingTop:'30px',float:'left'}}/>
                <img src={require("../" +this.state.data.heading)} className='user-heading' onClick={() => this.headingChange()}></img>
                <p className='user-name'>{this.state.data.uname}</p>
                <p className='user-email'>{this.state.data.uemail}</p>
                <div className='user-mark'></div>
                <div className='user-type'>
                    <img src={require("../images/personx.png")}  onClick={() => window.location='/sort'}></img>
                    <p onClick={() => window.location='/sort'}>个人主页</p>
                </div>
                <div className='user-type'>
                    <img src={require("../images/infor.png")} onClick={() => window.location='/sort'}></img>
                    <p onClick={() => window.location='/sort'}> 信息</p>
                </div>
                <div className='user-type'>
                    <img src={require("../images/lingdang_2f.png")} onClick={() => window.location='/sort'}></img>
                    <p onClick={() => window.location='/sort'}>  发现</p>
                </div>
                <div className='user-type'>
                    <img src={require("../images/shezhi.png")} onClick={() => window.location='/sort'}></img>
                    <p onClick={() => window.location='/sort'}>  设置</p>
                </div>
                <div className='user-mark1'></div>
                <p className='user-out' onClick={() =>
                        alert('Delete', 'Are you sure???', [
                        { text: '取消', onPress: () => console.log('cancel') },
                        { text: '确定', onPress: () => this.userOut() },
                        ])
                    }
                    >退出登录
                </p>
            </div>
        )
    }
}