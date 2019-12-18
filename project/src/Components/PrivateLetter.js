import React, { Component } from 'react';
import '../css/privateLetter.css';
import {Icon} from 'antd-mobile';
import store from './UserId';

export default class PrivateLetter extends Component {
    constructor(props){
        super(props)
        this.state={
            other:'有纪团队',
            data:{msg:[],ruidInfo:{uname:''}}    
        }
    }

    componentWillMount(){
        const storage = window.localStorage;
        var b = this.props.location.pathname.split('/');
        var con_id = b[b.length-1];
        const post={
            uid:storage.uid,
            ruid:con_id
        }
         //获取对话的编号
        // console.log(con_id);
        fetch('http://148.70.244.132:8080/getMsg',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data:data
            })
            console.log(this.state.data.msg)
            // 根据返回的消息，渲染响应的页面
        })
    }

    componentDidMount(){
        var text = document.getElementById('letter-all');
        const scrollHeight = text.scrollHeight;//里面div的实际高度  2000px
        const height = text.clientHeight;  //网页可见高度  200px
        const maxScrollTop = scrollHeight - height; 
        console.log(scrollHeight);
        console.log(height)
        text.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
    reset(){
        const storage = window.localStorage;
        var b = this.props.location.pathname.split('/');
        var con_id = b[b.length-1];
        const post={
            uid:storage.uid,
            ruid:con_id
        }
         //获取对话的编号
        // console.log(con_id);
        fetch('http://148.70.244.132:8080/getMsg',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data:data})
        })
    }

    textAdd(){
        var text = document.getElementById('letter-input');
        var list = document.getElementById('letter-list');
        const scrollHeight = list.scrollHeight;//里面div的实际高度  2000px
        const height = list.clientHeight;  //网页可见高度  200px
        const maxScrollTop = scrollHeight - height; 
        console.log(scrollHeight);
        console.log(height)
        text.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        console.log(text.value);
        // var list = document.getElementById('letter-list');
        const storage = window.localStorage;
        var b = this.props.location.pathname.split('/');
        var con_id = b[b.length-1];
        if(text.value != ''){
            const post={
                uid:storage.uid,
                ruid:con_id,
                msg:text.value
            }
            fetch('http://148.70.244.132:8080/sendMsg',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                this.reset();
                // 根据返回的消息，渲染响应的页面
            })
            text.value='';
        }
    }
    handleInput = (e)=>{
        if(e.keyCode === 13){
            this.textAdd();
        }
    }

    render() {
        return (
            <div id='letter-all'>
                <div style={{width:'100%',backgroundColor:'#FAA755',height:'60px',position:'fixed',top:'0',zIndex:'99'}}>
                    <Icon type="left" className='letter-left' onClick={() =>  window.history.back(-1)} 
                        style={{color:'#fff',float: 'left',width: '10%',marginTop:'27px'}}/>
                    <p className='letter-title' style={{color:'#fff',fontSize:'16px'}}>{this.state.data.ruidInfo.uname}</p>
                </div>
                <div className='letter-list' id='letter-list'>
                {
                    this.state.data.msg.map((tag,idx)=>
                    tag.sender == 'me'?
                    <li key={idx} className='letter-li' style={{width:'100%',minHeight:'46px',marginBottom:'10px',float:'left'}}>
                        <div className="letter-img1" style={{background:"url(" + require("../" +this.state.data.uidInfo.headimg) + ")"}}></div>
                        <div className='letter-trian1'></div>
                        <p className='letter-text1'>{tag.context}</p>
                    </li>:<li key={idx} className='letter-li' style={{width:'100%',minHeight:'46px',marginBottom:'10px',float:'left'}}>
                        <div className="letter-img" style={{background:"url(" + require("../" +this.state.data.ruidInfo.headimg) + ")"}}></div>
                        <div className='letter-trian'></div>
                        <p className='letter-text'>{tag.context}</p>
                    </li>)
                    // <Link to={'/topics/'+item.id}>{item.title}</Link>
                }
                </div>
                <div className='letter-bottom'>
                    <input className='letter-input' id='letter-input' type='text' onKeyDown={(e)=>this.handleInput(e)}></input>
                    <button onClick={() => this.textAdd()}>发送</button>
                </div>
            </div>
        )
    }
}
