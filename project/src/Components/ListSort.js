import React, {Component} from 'react';
import '../css/ListSort.css';
import { NavBar,TabBar} from 'antd-mobile';
//笔记分类页

export default class ListSort extends Component {
    constructor(props){
        super(props)
        this.state={
            selectedTab: 'blueTab',
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
        fetch('http://localhost:8080/listSort',{
            method:'POST',
            // mode:'cors',
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
    
    // shouldComponentUpdate(){
    //     const storage = window.localStorage;
    //     const post ={
    //         uid:storage.uid
    //     }
    //     // console.log(post);
    //     fetch('/listSort',{
    //         method:'POST',
    //         mode:'cors',
    //         headers: {'Content-Type': 'application/json'},
    //         body:JSON.stringify(post)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         this.setState({
    //             datas:data
    //         })
    //         // 根据返回的消息，渲染响应的页面
    //     })
    // }
    
    jumpToSion = (e)=>{
        console.log(e.target.innerHTML.slice(3,-4));
        const clickTag = e.target.innerHTML.slice(3,-4);
        // 跳转到点击笔记标签的列表页
        window.location.href = './index.html#/Sion?tags=' + encodeURI(clickTag);
    }

    render() {
        return (
            <div>
                <NavBar
                mode="light"
                onLeftClick={() => window.location='./index.html#/details'}
                leftContent={[
                    <img key='0' className='sort-header-person'></img>
                ]}
                rightContent={[
                    <img key='0' className='sort-header-add' onClick={() => window.location='./index.html#/addTag'}></img>
                ]}  style={{paddingTop:'10px',width:'100%',backgroundColor:'#FAA755',color:'#fff',position:'fixed',top:'0',zIndex:'99'}}
                >笔记分类</NavBar>
                <div className='sort-center' style={{position:'relative',top:'55px'}}>
                {
                    this.state.datas.map((tag,idx)=>
                    <li key={idx} className="sort-li" style={{background:"url(" + require("../" +tag.img_path) + ")"}} onClick={this.jumpToSion}>
                    {/* <li key={idx} className="sort-li" style={{background:"url(" + require('../images/sort-test1.jpg') + ")"}} 
                    onClick={() => window.location='/'} >  */}
                        <p>{tag.tags}</p>
                    </li>)
                }
                </div>
                <div style={{position:'fixed',bottom:'0',width:'100%'}}>
                    <TabBar
                unselectedTintColor="#949494"
                tintColor="#FAA755"
                barTintColor="white"
                // style={{position:'fixed !important',bottom:'0'}}
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
                            window.location='./index.html#/find'          
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
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                        window.location='./index.html#/sort'   
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
                    onPress={() => {
                        window.location='./index.html#/msg'   
                    }}
                >
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri:`https://raw.githubusercontent.com/zhangwenkang6/React/master/images/me.png`}}
                    selectedIcon={{ uri:`https://raw.githubusercontent.com/zhangwenkang6/React/master/images/me1.png` }}
                    title="我的"
                    key="my"
                    onPress={() => {
                        window.location='./index.html#/me'
                    }}
                >
                </TabBar.Item>
                </TabBar>
            </div>
            </div>
        )
    }
}
