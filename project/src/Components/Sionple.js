import React, { Component } from 'react';
import { NavBar, Icon} from 'antd-mobile';
import '../css/Sionple.css';


export default class AppHome extends Component {
    
    constructor(props){
        super();
        this.state={
            data:[],
    }
    }
      onSubmit2(e){
        const data2 = document.getElementById('data2').innerHTML;//收藏100
        const img2 = document.getElementById('img2').src;//收藏空心
        console.log(this.state.data[0].isCollection);
        if(this.state.data[0].isCollection==1){
            const data4 = parseInt(data2)-1;//收藏100
            document.getElementById('data2').innerHTML=data4;
            var a= this.state.data;
            console.log(a)
            a[0].isCollection = 0;
            this.setState({
                data:a
                // isCollection:0
            })
            console.log(data4);
            const post ={
                uid: localStorage.getItem('uid'),
                chid: window.location.search.split('=')[1],
            }
            console.log(post);
            fetch('/cancelCollection',{
                method:'POST',
                mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
            })
        }
        else if(this.state.data[0].isCollection == 0){
            const data4 = parseInt(data2)+1;//收藏100
            document.getElementById('data2').innerHTML=data4;
            var b= this.state.data;
            console.log(b);
            b[0].isCollection = 1;
            this.setState({
                data:b
            })
            console.log(data4);
            const post ={
                uid: localStorage.getItem('uid'),
                chid: window.location.search.split('=')[1],
            }
            console.log(post);
            fetch('/addFavorites',{
                method:'POST',
                mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
            console.log(data);
            })
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
            console.log(data[0].isCollection);
            this.setState({
                data:data,
                // isCollection:data[0].isCollection
            })
            console.log(this.state.data[0].isCollection)
            // console.log(this.state.isCollection)
        })
    }



    render() {
        return (
            <div>
                <div>
                <NavBar
                style={{backgroundColor:'#FAA755',color:'white'}}
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
                        {
                            item.isCollection==1?<div>
                            <img src={require("../images/exe-collection.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit2()}  id='img2'></img><span id='data2'>{item.favorites}</span>
                        </div>:<div>
                            <img src={require("../images/exe-collection1.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit2()}  id='img2'></img><span id='data2'>{item.favorites}</span>
                        </div>
                        }
                    </div>
                ))}
            </div>
        )
    }
}

