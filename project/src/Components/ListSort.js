import React, {Component} from 'react';
import '../css/listSort.css';
import { NavBar } from 'antd-mobile';
//笔记分类页

export default class ListSort extends Component {
    constructor(props){
        super(props)
        this.state={
            datas:[
                // {img_path:'images/sort-test1.jpg',tags:'美食'},           
                // {img_path:'images/sort-test2.jpg',tags:'旅行'},
            ],
        }
    }

    componentDidMount(){
        const storage = window.localStorage;
        const post ={
            uid:storage.uid
        }
        // console.log(post);
        fetch('/listSort',{
            method:'POST',
            mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                datas:data
            })
            // 根据返回的消息，渲染响应的页面
        })
    }
    
    jumpToSion = (e)=>{
        console.log(e.target.innerHTML.slice(3,-4));
        const clickTag = e.target.innerHTML.slice(3,-4);
        // 跳转到点击笔记标签的列表页
        window.location.href = '/Sion?tags=' + encodeURI(clickTag);
    }

    render() {
        return (
            <div>
                <NavBar
                mode="light"
                onLeftClick={() => window.location='/details'}
                leftContent={[
                    <img key='0' className='sort-header-person'></img>
                ]}
                rightContent={[
                    <img key='0' className='sort-header-add' onClick={() => window.location='/addTag'}></img>
                ]}  style={{paddingTop:'10px'}}
                >笔记分类</NavBar>
                <div className='sort-center'>
                {
                    this.state.datas.map((tag,idx)=>
                    <li key={idx} className="sort-li" style={{background:"url(" + require("../" +tag.img_path) + ")"}} onClick={this.jumpToSion}>
                    {/* <li key={idx} className="sort-li" style={{background:"url(" + require('../images/sort-test1.jpg') + ")"}} 
                    onClick={() => window.location='/'} >  */}
                        <p>{tag.tags}</p>
                    </li>)
                }
                </div>
            </div>
        )
    }
}
