import React, { Component } from 'react';
import '../css/me.css';
import { Icon,SearchBar,Carousel, WingBlank,TabBar} from 'antd-mobile';

export default class Me extends Component {
    constructor(){
        super();
        this.state = {
            selectedTab: 'blueTab',
            // data: ['e_02', 'e_02', 'e_02','e_02'],
            data:{uname:'张三',uemail:'11111111@qq.com',userCounts:5,chapterCounts:5,signature:'我是张三',headimg:'images/timg.jpg',usex:'男'},
            seximg:'images/nan.png',
            imgHeight: 200,
            datas:[
                // {ch_headimg:'images/sort-test1.jpg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20'},
                // {ch_headimg:'images/sort-test2.jpg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20'},
                // {ch_headimg:'images/sort-test3.jpeg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20'}
            ]
        }
    }

    componentDidMount(){
        const storage = window.localStorage;
        const post ={
            uid:storage.uid
        }
        // console.log(post);
        fetch('https://majia.hbsdduckhouse.club/me',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data:data[0],
                datas:data[1]
            })
            if(data[0].usex == '男'){
                this.setState({
                    seximg:'images/nan.png'
                })
            }
            else{
                this.setState({
                    seximg:'images/nv.png'
                })
            }
            // 根据返回的消息，渲染响应的页面
        })
    }
    follow(){
        let orange = document.getElementById('me-essay-orange')
        orange.style.display='none';
        let center = document.getElementById('find-center');
        center.style.display='none';
        let orange1 =document.getElementById('me-follow-orange');
        orange1.style.display='block'
        let center1 = document.getElementById('follow-center');
        center1.style.display='block'
    }
    essay(){
        let orange = document.getElementById('me-essay-orange')
        orange.style.display='block';
        let center = document.getElementById('find-center');
        center.style.display='block';
        let orange1 =document.getElementById('me-follow-orange');
        orange1.style.display='none';
        let center1 = document.getElementById('follow-center');
        center1.style.display='none'
    }

    render() {
        return (
            <div>
                <div className='me-top'>
                    <div className='me-top-list'>
                        <img src={`${require('../images/category.png')}`}  onClick={() => window.location='/index.html#/details'} />
                    </div>
                    <p className='me-top-user'>{this.state.data.uname}</p>
                    <p className='me-top-email'>{this.state.data.uemail}</p>
                    {/* <div className='me-top-line'></div> */}
                </div>
                <div className='me-title'>
                    <img className='me-head' src={require("../" +this.state.data.headimg)} onClick={()=>window.location='/index.html#/perpon?uid='+localStorage.getItem('uid')}></img>
                    <div className='me-num'>
                        <div className='me-sex'>
                            <img src={require("../"+this.state.seximg)}></img>
                            <p>{this.state.data.usex}</p>
                        </div>
                        <div className='me-atten'>
                            <p>{this.state.data.userCounts}</p>
                            <p>关注</p>
                        </div>
                        <div className='me-collect'>
                            <p>{this.state.data.chapterCounts}</p>
                            <p>收藏</p>
                        </div>

                        {/* <button className='me-set'>
                            <img src={require("../images/set.png")}></img>
                        </button> */}
                    </div>
                    <div className='me-edit' onClick={()=>window.location='./index.html#/newperpon'}>
                        编辑资料
                    </div>
                </div>
                <div className='me-sign'>
                    个性签名：{this.state.data.signature?this.state.data.signature:'你还没有个性签名'}
                </div>
                <div className='me-line'></div>
                <div className='me-essay' onClick={()=>this.essay()}>收藏列表
                    <div className='me-essay-orange' id='me-essay-orange'></div>
                </div>
                <div className='me-follow' onClick={()=>this.follow()}>关注列表
                    <div className='me-follow-orange' id='me-follow-orange'></div>
                </div>
                <div className='me-line'></div>
                <div className='find-center' id='find-center' style={{position:'relative',top:'55px',float:'left'}}>
                {
                    this.state.datas.map((note,id)=>
                    <div key={id} className='find-heading' >
                        <img className='find-head' src={require("../" +note.headimg)} onClick={()=>window.location='/index.html#/perpon?uid='+note.uid}></img>
                        <p className='find-author'>{note.uname}</p>
                        <p className='find-time'>{note.chdate}</p>
                        <div className='find-essay' onClick={()=>window.location='/index.html#/sionple?chid='+note.chid}>
                            <p className='find-title'>{note.context}</p>
                            <img className='find-img1' src={require("../" +note.ch_headimg)}></img>
                            <img className='find-img2' src={require("../" +note.ch_headimg)}></img>
                        </div>
                        <div className='find-button'>
                            <img className='find-img-like' id='find-img-like'src={require("../images/like1.png")}></img>
                            <p className='find-like'>{note.likes}</p>
                            <img className='find-img-collect' id='find-img-collect' src={require("../images/exe-collection1.png")}></img>
                            <p className='find-collect'>{note.favorites}</p>
                        </div>
                    </div>
                    )
                }   
                </div>
                <div className='me-follow-center' id='follow-center' style={{position:'relative',top:'55px',float:'left',display:'none'}}>
                    sss
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
                        background:"url(" + require("../images/home2.png") + ") center center /  21px 21px no-repeat " ,
                        // background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/home2.png") center center /  21px 21px no-repeat` 
                    }} />
                    }
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background:"url(" + require("../images/home3.png") + ") center center /  21px 21px no-repeat" ,
                        // background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/home3.png") center center /  21px 21px no-repeat` 
                    }}/>
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
                        background:"url(" + require("../images/note.png") + ") center center /  21px 21px no-repeat " ,
                        // background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/note.png") center center /  21px 21px no-repeat` 
                    }}/>
                    }
                    selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background:"url(" + require("../images/note1.png") + ") center center /  21px 21px no-repeat " ,
                        // background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/note1.png") center center /  21px 21px no-repeat` }}
                    }}/>
                    }
                    title="笔记"
                    key="note"
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
                        background:"url(" + require("../images/msg.png") + ") center center /  21px 21px no-repeat " ,
                        // background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/msg.png") center center /  21px 21px no-repeat` }}
                    }}/>
                    }
                    selectedIcon={
                    <div style={{
                        width: '22px',
                        height: '22px',
                        background:"url(" + require("../images/msg1.png") + ") center center /  21px 21px no-repeat " ,
                        // background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/msg1.png") center center /  21px 21px no-repeat` }}
                    }}/>
                    }
                    title="消息"
                    key="msg"
                    onPress={() => {
                        window.location='./index.html#/msg'   
                    }}
                >
                </TabBar.Item>
                    <TabBar.Item
                        icon={{uri:require("../images/me.png")}}
                        selectedIcon={{ uri:require("../images/me1.png")}}
                        title="我的"
                        key="my"
                        selected={this.state.selectedTab === 'blueTab'}
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
