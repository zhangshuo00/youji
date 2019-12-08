import React, { Component } from 'react';
import '../css/privateLetter.css';
import {Icon} from 'antd-mobile';
import store from './UserId';

export default class PrivateLetter extends Component {
    constructor(props){
        super(props)
        this.state={
            other:'有纪团队',
            data:[{img_path:'images/sort-test1.jpg',
                user_img:'images/sort-test2.jpg',information:'你好你好你好你好你好你好你好你好你好'},
                {img_path:'images/sort-test1.jpg',
                user_img:'images/sort-test2.jpg',information:'你好你好你好你好你好你好你好你好你好'},
                {img_path:'images/sort-test1.jpg',
                user_img:'images/sort-test2.jpg',information:'你好'},
                {img_path:'images/sort-test1.jpg',
                user_img:'images/sort-test2.jpg',information:'你好'}]         
        }
    }

    componentDidMount(){
        const user =store.getState();
        console.log(user);
        var b = this.props.location.pathname.split('/');
        var con_id = b[b.length-1]; //获取对话的编号
        console.log(con_id);
        if(user.login == 'success'){
            console.log(1);
        }else{
            console.log(2);
        }
        // fetch('')
        // .then((res)=>res.json())
        // .then((res)=>{
        //     this.setState({data:res.data});
        // })
    }

    textAdd(){
        var text = document.getElementById('letter-input');
        console.log(text.value);
        var list = document.getElementById('letter-list');
    }
    handleInput = (e)=>{
        if(e.keyCode === 13){
            console.log(e.target.value);
            e.target.value = '';
        }
    }

    render() {
        return (
            <div>
                <div style={{width:'100%',backgroundColor:'#FAA755',height:'60px'}}>
                    <Icon type="left" className='letter-left' onClick={() =>  window.history.back(-1)} 
                        style={{color:'#000',float: 'left',width: '10%',marginTop:'27px'}}/>
                    <p className='letter-title' style={{color:'#000',fontSize:'16px'}}>{this.state.other}</p>
                </div>
                <div className='letter-list' id='letter-list'>
                {
                    this.state.data.map((tag,idx)=>
                    <li key={idx} className='letter-li' style={{width:'100%',height:'66px',marginBottom:'10px'}}>
                        <div className="letter-img" style={{background:"url(" + require("../" +tag.img_path) + ")"}}></div>
                        <div className='letter-trian'></div>
                        <p className='letter-text'>{tag.information}</p>
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
