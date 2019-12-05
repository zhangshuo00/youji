import React, { Component } from 'react';
import '../css/welcome.css';
 
export default class Welcome extends Component {
    constructor(props){
        super(props)
        this.state={
            time1:0,
            time2:0,
            times:5
        }
    }
    componentDidMount(){
        const storage = window.localStorage;
        // localStorage.removeItem("uid");
        this.setState({
            time1:setInterval(()=>{
                if(storage.uid){
                    window.location='/login'
                }else{
                    window.location='/car'
                }}
            ,5000),
            time2:setInterval(()=>{
                let a=this.state.times-1;
                this.setState({
                    times:a
                })
            },1000)
        })
    }

    skip(){
        clearInterval(this.state.time1);
        clearInterval(this.state.time2);
        const storage = window.localStorage;
        if(storage.uid){
            window.location='/login'
        }else{
            window.location='/car'
        }
    }
    
    render() {
        return (
            <div>
                <img src={require("../images/welcome.jpeg")}  className='wel-all'></img>
                <button className='wel-but' onClick={() => this.skip()}>探索「有纪」</button>
                <button className='wel-time' onClick={() => this.skip()}>{this.state.times}</button>
            </div>
        )
    }
}
