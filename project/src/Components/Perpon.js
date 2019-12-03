import React, { Component } from 'react';
import './Person.css';
import { Icon} from 'antd-mobile';
export default class AppHome extends Component {
    //个人信息页
    constructor(props){
        super();
        this.state={
            data:[
                {url_image:'images/timg.jpg',word:'',title:'眷恋'}, //url_image用户头像，word签名，title昵称
            ],
        }
    }

    componentDidMount(){
        // const user =this.getState();
        // console.log(user);
        // fetch('')
        // .then((res)=>res.json())
        // .then((res)=>{
        //     this.setState({data:res.data});
        // })
    }
    render() {
        return (
            <div>
            <div className="picture">
                <Icon onClick={()=>{window.location='/sion'}} key="0" type="left" style={{ marginRight: '16px' }}></Icon>
                <Icon onClick={()=>{window.location='/newperpon'}} key="0" type="plus" style={{ marginLeft: '80%' }}></Icon>
            </div>
            {this.state.data.map(
                            (item,index)=>(
            <div className="p">
    <img src={require("../" +item.url_image)} style={{width: '50px',height: '50px',borderRadius: '100px'}}></img><span className="p1">{item.title}</span>
                <p style={{marginTop:'20%'}}>做一份美食，看一场电影，<br></br>
                    来一场说走就走的旅行，<br></br>
                    谈一场轰轰烈烈的恋爱。<br></br>
                    读万卷书，行万里路。<br></br>
                    最好的时光遇见最好的你，<br></br>
                    关注我，给你更多精彩。<br></br>
                </p>
            </div>)
            )}
            
           <div className="but">
                <button className="but1">关注</button>
                <button className="but2">私信</button>
           </div>
                
            </div>
        )
    }
}

