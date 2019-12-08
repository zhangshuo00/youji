import React, { Component } from 'react'
import {Icon,NavBar} from 'antd-mobile';
import '../css/messageList.css';
import store from './UserId';

export default class MessageList extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[
                {img_path:'images/sort-test1.jpg',other:'有纪团队',con_id:'001',time:'12:21',last:'你好'},           
                {img_path:'images/sort-test2.jpg',other:'tangtang',con_id:'002',time:'5:06',last:'hello world'},
            ],
        }
    }

    componentDidMount(){
        // const user =store.getState();
        // console.log(user);
        // if(user.login == 'success'){
        //     console.log(1);
        // }else{
        //     console.log(2);
        // }
        // fetch('')
        // .then((res)=>res.json())
        // .then((res)=>{
        //     this.setState({data:res.data});
        // })
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
                style={{paddingTop:'10px',width:'100%',backgroundColor:'#FAA755',color:'#fff'}}
                >消息列表</NavBar>
                <div className='msg-list'>
                {
                    this.state.data.map((tag,idx)=>
                    <li key={idx} className='msg-li' style={{width:'100%',height:'66px'}} onClick={() => window.location='/letter/'+tag.con_id}>
                        <div className="msg-img" style={{background:"url(" + require("../" +tag.img_path) + ")"}}></div>
                        <p className='msg-time'>{tag.time}</p>
                        <p className='msg-text'>{tag.other}</p>
                        <p className='msg-last'>{tag.last}</p>        
                    </li>)
                }
                </div>
            </div>
        )
    }
}
