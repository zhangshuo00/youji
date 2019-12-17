import React, { Component } from 'react';
import { Icon,SearchBar,Carousel, WingBlank} from 'antd-mobile';
import '../css/seach.css';

export default class Seach extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
        }
    }
    componentDidMount(){
        // console.log()
        const post ={
            keywords:decodeURI(window.location.search.split('=')[1])
        }
        // console.log(post);
        fetch('http://localhost:8080/discoverSearch',{
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
            // 根据返回的消息，渲染响应的页面
        })
    }
    seach(e){
        console.log(e);
        window.location= './seach?value='+e;
    }
    render() {
        return (
            <div>
               <div className='search'>
                    <div className='search-list'>
                        <Icon type="left"  onClick={() =>  window.history.back(-1)} 
                        style={{color:'#fff',float: 'left',width: '100%',height:'35px',marginTop:'5px'}}/>
                    </div>
                    <SearchBar placeholder={decodeURI(window.location.search.split('=')[1])} maxLength={8} onSubmit={this.seach.bind(this)} style={{paddingRight:'2%'}}/>
                </div>
                <div className='search-result'>
                    搜索结果>
                </div>
                <div className='search-line'></div>
               { 
               this.state.data.map((note,id)=>
                <div key={id} className='search-heading' onClick={()=>window.location='/sionple?chid='+note.chid}>
                    <p className='search-title'>{note.title}</p>
                    <p className='search-time'>{note.chdate}</p>
                    <p className='search-text'>{'  '+note.context}</p>
                    <div className='search-button'>
                        <img className='search-img-like' id='find-img-like' src={require("../images/like1.png")}></img>
                        <p className='search-like'>{note.likes}</p>
                        <img className='search-img-collect' id='find-img-collect' src={require("../images/exe-collection1.png")}></img>
                        <p className='search-collect'>{note.favorites}</p>
                    </div>
                </div>
               )}
            </div>
        )
    }
}
