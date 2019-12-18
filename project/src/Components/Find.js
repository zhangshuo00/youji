import React, { Component } from 'react';
import { Icon,SearchBar,Carousel, WingBlank,TabBar} from 'antd-mobile';
import '../css/find.css';


export default class Find extends Component {
    constructor(){
        super();
        this.state = {
            selectedTab: 'blueTab',
            data:[{car_imgpath:"images/carousel1.jpg",car_context:''},{car_imgpath:"images/carousel2.jpg",car_context:''},{car_imgpath:"images/carousel3.jpg",car_context:''}],
            // data:['images/sort-test1.jpg','images/sort-test2.jpg','images/sort-test3.jpeg'],
            imgHeight: 200,
            datas:[
                // {ch_headimg:'images/sort-test1.jpg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',img_path:['images/sort-test1.jpg','images/sort-test2.jpg']},
                // {ch_headimg:'images/sort-test2.jpg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',img_path:['images/sort-test1.jpg','images/sort-test2.jpg']},
                // {ch_headimg:'images/sort-test3.jpeg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',img_path:['images/sort-test1.jpg','images/sort-test2.jpg']}
            ]
        }
    }
    componentDidMount(){
        const storage = window.localStorage;
        const post ={
            uid:storage.uid
        }
        // console.log(post);
        fetch('/discover',{
            method:'GET',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            // body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            for(var a=0;a<data.length;a++){
                // if("../" +data[a].ch_headimg){
                //     console.log("../" +data[a].ch_headimg)
                //     // data[a].ch_headimg='images/sort-test1.jpg';
                // }
                // if("../" +data[a].headimg){
                //     console.log("../" +data[a].headimg)
                //     // data[a].headimg='images/timg.jpg';
                // }
                for(var b=0;b<2;b++){
                    if(! data[a].img_path[b]){
                        data[a].img_path[b] = 'images/sort-test1.jpg'
                    }
                }
            }
            this.setState({
                datas:data
            })
            console.log(this.state.datas)
            // 根据返回的消息，渲染响应的页面
        });

        fetch('/getCarousel',{
            method:'GET',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            // body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            this.setState({
                data:data
            })
            console.log(this.state.data)
            // 根据返回的消息，渲染响应的页面
        })
    }

    // shouldComponentUpdate(){
    //     const storage = window.localStorage;
    //     const post ={
    //         uid:storage.uid
    //     }
    //     // console.log(post);
    //     fetch('/discover',{
    //         method:'GET',
    //         mode:'cors',
    //         headers: {'Content-Type': 'application/json'},
    //         // body:JSON.stringify(post)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         this.setState({
    //             datas:data
    //         })
    //         // 根据返回的消息，渲染响应的页面
    //     });

    //     fetch('/getCarousel',{
    //         method:'GET',
    //         mode:'cors',
    //         headers: {'Content-Type': 'application/json'},
    //         // body:JSON.stringify(post)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         this.setState({
    //             data:data
    //         })
    //         // 根据返回的消息，渲染响应的页面
    //     })
    // }

    jumpToSionple(e){
        // 跳转到笔记详情页，获取点击文章的chid
        const chid = e.target.getAttribute('data-index');
        console.log(e.target.getAttribute('data-index'))
        // window.location = '/sionple?chid=' + chid;
    }
    seach(e){
        console.log(e);
        window.location= './index.html#/seach?value='+e;
    }

    render() {
        return (
            <div>
                <div className='find-search'>
                    <div className='find-search-list'>
                        <img src={`${require('../images/category.png')}`} onClick={() => window.location='/index.html#/details'} />
                    </div>
                    <SearchBar placeholder="输入关键字搜索" maxLength={8} onSubmit={this.seach.bind(this)} style={{paddingRight:'2%'}}/>
                </div>
                <WingBlank style={{width:'100%',margin:'0',position:'relative',top:'40px',left:'0'}}>
                    <Carousel
                    autoplay={true}
                    autoplayInterval = {3000}
                    infinite={true}
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val.car_imgpath}
                        href=""
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <div className='find-car'
                            style={{zIndex:'99',backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',bottom:'0px',height:'40px',width:'100%'}}>

                        </div>
                        <p style={{color:'#fff',fontSize:'18px',zIndex:'99',margin:'0',position:'absolute',bottom:'15px',width:'100%',textAlign:'center',color:'#FFF'}}>
                            {val.car_context}</p>
                        <img
                            src={require("../" +val.car_imgpath)}
                            // src={`https://raw.githubusercontent.com/zhangwenkang6/React/master/images/${val}.jpg`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                                window.dispatchEvent(new Event('resize'));
                                // this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
                </WingBlank>
                <div className='find-center' style={{position:'relative',top:'45px'}}>
                {
                    this.state.datas.map((note,id)=>
                    <div key={id} className='find-heading'>
                        <img className='find-head' src={require("../" +note.headimg)} onClick={()=>window.location='/index.html#/perpon?uid='+note.uid}></img>
                        <p className='find-author'>{note.uname}</p>
                        <p className='find-time'>{note.chdate}</p>
                        <div className='find-essay' onClick={()=>window.location='/index.html#/sionple?chid='+note.chid}>
                            <p className='find-title'>{note.context}</p>
                            <img className='find-img1' src={require("../" +note.img_path[0])} ></img>
                            <img className='find-img2' src={require("../" +note.img_path[1])} ></img>
                            {/* <img className='find-img1' src={  require("../" +note.img_path[0] && "../images/sort-test1.jpg")} onError="showDefaultImg(this)"></img>
                            <img className='find-img2' src={require("../images/sort-test2.jpg" && "../images/sort-test1.jpg")} onError="showDefaultImg(this)"></img> */}
                        </div>
                        <div className='find-button'>
                            {/* <button className='find-button-like' 
                                style={{background:"url(" + require('../images/like1.png') + ")"}} >
                            </button> */}
                            <img className='find-img-like' id='find-img-like' src={require("../images/like1.png")}></img>
                            <p className='find-like'>{note.likes}</p>
                            <img className='find-img-collect' id='find-img-collect' src={require("../images/exe-collection1.png")}></img>
                            <p className='find-collect'>{note.favorites}</p>
                        </div>
                    </div>
                    )
                }   
                </div>
                <div style={{ 
            position: 'fixed', 
            width: '100%', 
            bottom: '0' 
        }}>
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
                    selected={this.state.selectedTab === 'blueTab'}
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