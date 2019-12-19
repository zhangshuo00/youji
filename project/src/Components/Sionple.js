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
                chid: window.location.hash.split('=')[1],
            }
            console.log(post);
            fetch('https://majia.hbsdduckhouse.club/cancelCollection',{
                method:'POST',
                // mode:'cors',
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
                chid: window.location.hash.split('=')[1],
            }
            console.log(post);
            fetch('https://majia.hbsdduckhouse.club/addFavorites',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
        }
    }
    onSubmit3(){
        const data2 = document.getElementById('data3').innerHTML;//收藏100
        const img2 = document.getElementById('img2').src;//收藏空心
        console.log(this.state.data[0].isLike);
        if(this.state.data[0].isLike==1){
            const data4 = parseInt(data2)-1;//收藏100
            document.getElementById('data3').innerHTML=data4;
            var a= this.state.data;
            console.log(a)
            a[0].isLike = 0;
            this.setState({
                data:a
                // isCollection:0
            })
            console.log(data4);
            const post ={
                uid: localStorage.getItem('uid'),
                chid: window.location.hash.split('=')[1],
            }
            console.log(post);
            fetch('https://majia.hbsdduckhouse.club/cancelLike',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
            })
        }
        else if(this.state.data[0].isLike == 0){
            const data4 = parseInt(data2)+1;//收藏100
            document.getElementById('data3').innerHTML=data4;
            var b= this.state.data;
            console.log(b);
            b[0].isLike = 1;
            this.setState({
                data:b
            })
            console.log(data4);
            const post ={
                uid: localStorage.getItem('uid'),
                chid: window.location.hash.split('=')[1],
            }
            console.log(post);
            fetch('https://majia.hbsdduckhouse.club/addLike',{
                method:'POST',
                // mode:'cors',
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
            chid: window.location.hash.split('=')[1]
        }
        console.log(post)
        fetch('https://majia.hbsdduckhouse.club/sionple',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data:data,
                // isCollection:data[0].isCollection
            })
            // console.log(this.state.data[0].isCollection)
            // console.log(this.state.isCollection)
        })
    }



    render() {
        return (
            <div>
                <div>
                <NavBar
                style={{backgroundColor:'#FAA755',color:'white',position:'fixed',top:'0',width:'100%',zIndex:'99'}}
                onLeftClick={() => window.history.back(-1)}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '16px' }} />,
                  ]}
                >页面内容</NavBar>      
                </div>
                {this.state.data.map((item,index)=>(
                    <div style={{position:'relative',top:'45px'}}>
                        <div>
                            <img src={require("../" +item.ch_headimg)} style={{height:'196px',width:'100%'}}></img>
                        </div>
                        <div className='sion'>
                            <p>
                                <span style={{}}>{item.tags}</span> 
                                <span style={{float:'right'}}>{item.uname}</span>
                                <span style={{float:'right',marginRight:'2%',color:'gray'}}>By</span> 
                            </p>
                            <p className='p2'>{item.title}</p>
                            <p>{item.context}</p>
                            {item.imgPath.map(val => (
                                <img src={require("../" +val.img_path)} style={{width:'100%'}}></img>
                            ))}
                        </div>
                        <div style={{position:'fixed',bottom:'0',width:'90%',paddingLeft:'5%',paddingRight:'5%',backgroundColor:'#fff',zIndex:'99'}}>
                        {
                            item.isLike ==1 ? 
                            <div style={{width:'30%',margin:'0',float:'left'}}>
                                <img src={require("../images/like.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit3()}  id='img2'></img>
                                <span id='data3'>{item.likes}</span>
                                {/* <img src={require("../images/exe-collection.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit2()}  id='img2'></img>
                                <span id='data2'>{item.favorites}</span> */}
                            </div>  :
                            <div style={{width:'30%',margin:'0',float:'left'}}>
                                <img src={require("../images/like1.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit3()}  id='img2'></img>
                                <span id='data3'>{item.likes}</span>
                                {/* <img src={require("../images/exe-collection1.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit2()}  id='img2'></img>
                                <span id='data2'>{item.favorites}</span> */}
                            </div>}
                        {
                            item.isCollection==1    ?
                            <div style={{width:'30%',margin:'0',float:'left'}}>
                                {/* <img src={require("../images/like.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit3()}  id='img2'></img>
                                <span id='data3'>{item.likes}</span> */}
                                <img src={require("../images/exe-collection.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit2()}  id='img2'></img>
                                <span id='data2'>{item.favorites}</span>
                            </div>  :
                            <div style={{width:'30%',margin:'0',float:'left'}}>
                                {/* <img src={require("../images/like1.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit3()}  id='img2'></img>
                                <span id='data3'>{item.likes}</span> */}
                                <img src={require("../images/exe-collection1.png")} style={{width:'20px',height:'20px',marginLeft:'10%',marginRight:'5%'}} onClick={() => this.onSubmit2()}  id='img2'></img>
                                <span id='data2'>{item.favorites}</span>
                            </div>
                        }
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

