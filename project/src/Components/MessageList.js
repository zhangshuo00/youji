import React, { Component } from 'react'
import {Icon,NavBar,TabBar} from 'antd-mobile';
import '../css/messageList.css';

export default class MessageList extends Component {
    constructor(props){
        super(props)
        this.state={
            selectedTab: 'blueTab',
            data:[
                // {img_path:'images/sort-test1.jpg',other:'有纪团队',con_id:'001',time:'12:21',last:'你好'},           
                // {img_path:'images/sort-test2.jpg',other:'tangtang',con_id:'002',time:'5:06',last:'hello world'},
            ],
        }
    }

    componentDidMount(){
        const storage = window.localStorage;
        const post ={
            uid:storage.uid
        }
        fetch('/getMsgList',{
            method:'POST',
            mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            for(var a=0;a<data.length;a++){
                if(! data[a].headimg){
                    data[a].headimg = 'images/zhangsan.jpg'
                }
                data[a].sm_date=data[a].sm_date.slice(11,16);
                // console.log(data[a].sm_date)
                let c = data[a].sm_date.slice(0,2)*1;
                // console.log(c);
                let b = data[a].sm_date.slice(2,5);
                if(c<16){
                    c=c+8;
                    data[a].sm_date=c+b;
                }else if(c>16 || c==16){
                    c=c-16;
                    data[a].sm_date=c+b;
                }
                if(data[a].context.length>18){
                    data[a].context=data[a].context.slice(0,17)+'...';
                    // console.log(data[a].context.length)
                }
            }
            this.setState({
                data:data
            })
            // 根据返回的消息，渲染响应的页面
        })
    }


    render() {
        return (
            <div>
                {/* <div style={{width:'100%',backgroundColor:'#F8F8F8',height:'60px'}}>
                    <Icon type="nordered-list" className='msg-left' onClick={() => window.location='/details'} 
                        style={{color:'#000',float: 'left',width: '10%',marginTop:'27px'}}/>
                    <p className='msg-title' style={{color:'#000',fontSize:'16px'}}>消息列表</p>
                </div> */}
                <NavBar
                mode="light"
                onLeftClick={() => window.location='/details'}
                leftContent={[
                    <img key='0' className='msg-title'></img>
                ]}
                style={{paddingTop:'10px',width:'100%',backgroundColor:'#FAA755',color:'#fff',position:'fixed',top:'0',zIndex:'99'}}
                >消息列表</NavBar>
                <div className='msg-list' style={{position:'relative',top:'55px'}}>
                {
                    this.state.data.map((tag,idx)=>
                    <li key={idx} className='msg-li' style={{width:'100%',height:'66px'}} onClick={() => window.location='/letter/'+tag.uid}>
                        <div className="msg-img" style={{background:"url(" + require("../" +tag.headimg) + ")"}}></div>
                        <p className='msg-time'>{tag.sm_date}</p>
                        <p className='msg-text'>{tag.uname}</p>
                        <p className='msg-last'>{tag.context}</p>        
                    </li>)
                }
                </div>
                <div style={{position:'fixed',bottom:'0',width:'100%'}}>
                    <TabBar
                unselectedTintColor="#949494"
                tintColor="#FAA755"
                barTintColor="white"
                >
                <TabBar.Item
                    title="首页"
                    key="home"
                    icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/home2.png") center center /  21px 21px no-repeat` }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/home3.png") center center /  21px 21px no-repeat` }}
                        />
                        }
                        onPress={() => {
                            window.location='./find'          
                        }}
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/note.png") center center /  21px 21px no-repeat` }}
                    />
                    }
                    selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/note1.png") center center /  21px 21px no-repeat` }}
                    />
                    }
                    title="笔记"
                    key="note"
                    onPress={() => {
                        window.location='./sort'   
                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/msg.png") center center /  21px 21px no-repeat` }}
                    />
                    }
                    selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/msg1.png") center center /  21px 21px no-repeat` }}
                    />
                    }
                    title="消息"
                    key="msg"
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                        window.location='./msg'   
                    }}
                >
                </TabBar.Item>
                    <TabBar.Item
                        icon={{ uri:`https://raw.githubusercontent.com/zhangwenkang6/React/master/images/me.png`}}
                        selectedIcon={{ uri:`https://raw.githubusercontent.com/zhangwenkang6/React/master/images/me1.png` }}
                        title="我的"
                        key="my"
                        onPress={() => {
                            window.location='./me'
                        }}
                    >
                    </TabBar.Item>
                    </TabBar>
                </div>
            </div>
        )
    }
}
