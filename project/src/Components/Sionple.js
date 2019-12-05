import React, { Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import '../css/Sionple.css';


export default class AppHome extends Component {
    
    constructor(props){
        super();
        this.state={
            data:[]
    }
    }
    componentDidMount(){
        // var storage = window.localStorage;
        const post ={
            uid: localStorage.getItem('uid'),
            chid: window.location.search.split('=')[1]
        }
        fetch('/sionple',{
            method:'POST',
            mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data:data
            })
            // 根据返回的消息，渲染响应的页面
        })
    }



    render() {
        return (
            <div>
                <div>
                <NavBar
                style={{backgroundColor:'pink',color:'white'}}
                onLeftClick={() => window.history.back(-1)}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '16px' }} />,
                  ]}
                >页面内容</NavBar>      
                </div>
                {this.state.data.map((item,index)=>(
                    <div>
                        <div>
                            <img src={require("../" +item.ch_headimg)} style={{height:'196px',width:'100%'}}></img>
                        </div>
                        <div className='sion'>
                            <p><span style={{marginRight:'60%'}}>测试</span> <span style={{marginRight:'2%',color:'gray'}}>By</span> <span>yangfan</span></p>
                            <p className='p2'>{item.title}</p>
                            <p>{item.context}</p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

