import React, { Component } from 'react';
import { Icon,SearchBar,Carousel, WingBlank} from 'antd-mobile';
import '../css/find.css';


export default class Find extends Component {
    constructor(){
        super();
        this.state = {
            // data: ['e_02', 'e_02', 'e_02','e_02'],
            data:['images/sort-test1.jpg','images/sort-test2.jpg','images/sort-test3.jpeg'],
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
        fetch('/discover',{
            method:'GET',
            mode:'cors',
            headers: {'Content-Type': 'application/json'},
            // body:JSON.stringify(post)
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

    onSubmit(){

    }

    // Sclick(){
    //     const search = document.getElementById('find-search');
    //     search.style.width='80%'
    // }
    // Liked(e){
    //     let like = document.getElementById('find-img-like');
    //     // console.log(e.key);
    //     // console.log(e);
    //     if(like.src==require("../images/like.png")){
    //         like.src=require("../images/like1.png")
    //     }
    //     else if(like.src==require("../images/like1.png")){
    //         like.src=require("../images/like.png")
    //     }
    //     // like.src=require("../images/like.png");
    //     // this.setState({
            
    //     // })
    // }
    // Collected(e){
    //     let collect = document.getElementById('find-img-collect');
    //     if(collect.src==require("../images/exe-collection.png")){
    //         collect.src=require("../images/exe-collection1.png")
    //     }
    //     else if(collect.src==require("../images/exe-collection1.png")){
    //         collect.src=require("../images/exe-collection.png")
    //     }
    //     // this.setState({
            
    //     // })
    // }

    render() {
        return (
            <div>
                {/* <div className='find-seach'>
                    <SearchBar placeholder="输入关键字搜索" maxLength={8} />
                </div>      */}
                {/* <form id="form" style={{paddingTop:'10px',backgroundColor:'#FAA755',width:'100%',height:'40px'}} onSubmit={this.onSubmit.bind(this)}>
                    <Icon type="search" style={{margin: '0px',width:'10%',paddingTop:'5px',color:'#fff'}} />
                    <input type='search' className='find-search' id='find-search' placeholder='  搜索' onClick={this.Sclick()}></input>
                </form> */}
                <div className='find-search'>
                    <div className='find-search-list'>
                        <img src={`${require('../images/category.png')}`} onClick={() => window.location='/details'} />
                    </div>
                    <SearchBar placeholder="输入关键字搜索" maxLength={8} />
                </div>
                <WingBlank style={{width:'100%',margin:'0',position:'relative',top:'40px',left:'0'}}>
                    <Carousel
                    autoplay={true}
                    autoplayInterval = {3000}
                    infinite={true}
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val}
                        href=""
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <p style={{color:'#fff',fontSize:'20px',zIndex:'99',margin:'0',position:'absolute',top:'100px',left:'10%'}}>
                            {val}</p>
                        <img
                            src={require("../" +val)}
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
                        <img className='find-head' src={require("../" +note.headimg)}></img>
                        <p className='find-author'>{note.uname}</p>
                        <p className='find-time'>{note.chdate}</p>
                        <div className='find-essay'>
                            <p className='find-title'>{note.context}</p>
                            <img className='find-img1' src={require("../" +note.ch_headimg)}></img>
                            <img className='find-img2' src={require("../" +note.ch_headimg)}></img>
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
            </div>
        )
    }
}