import React, { Component } from 'react'
import '../css/addTag.css';
import {Icon} from 'antd-mobile';
//新建标签页


export default class AddTag extends Component {

    changepic=()=> {
      var f=document.getElementsByClassName('label-image')[0].files[0];
      if (window.createObjectURL!=undefined) { // basic
        document.getElementById('show').src = window.createObjectURL(f) ;
      } else if (window.URL!=undefined && f) { // mozilla(firefox)
        document.getElementById('show').src = window.URL.createObjectURL(f) ;
      } else if (window.webkitURL!=undefined && f) { // webkit or chrome
        document.getElementById('show').src = window.webkitURL.createObjectURL(f) ;
      } else if (window.URL!=undefined && !f){} else if (window.webkitURL!=undefined && !f){}
      else if(window.createObjectURL!=undefined && !f){}
    }

    onSubmit(e){
      e.preventDefault();
      const storage = window.localStorage;
      const labelText = document.getElementById('label-text');
      const f=document.getElementsByClassName('label-image')[0].files[0];
      if(f){
        var reader = new FileReader();
        reader.readAsDataURL(f);	
        reader.onloadend = function(e) {		
          const imgFile = e.target.result;	
          const post ={
            uid:storage.uid,
            tagName:labelText.value,
            img:imgFile
          }	
          console.log(post);
          fetch('https://majia.hbsdduckhouse.club/addTag',{
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
      }else{
        const post ={
          uid:storage.uid,
          tagName:labelText.value,
          img:'images/sort-test1.jpg'
        }	
        console.log(post);
        fetch('https://majia.hbsdduckhouse.club/addTag',{
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

    render() {
        return (
            <div style={{}}>
                {/* <div style={{width:'100%',height:'49px',position:'absolute',top:'0',backgroundColor:'#FAA755'}}></div> */}
                <Icon type="left" className='label-left' onClick={() =>  window.history.back(-1)} 
                    style={{color:'#fff',float: 'left',width: '10%',paddingTop:'20px',backgroundColor:'#FAA755'}}/>
                <p className='label-title' style={{color:'#fff',fontSize:'14px'}}>添加标签</p>
                <form className="" onSubmit={this.onSubmit.bind(this)}>
                    <input type = 'submit' className = 'label-save' value='保存' style={{}}></input>
                    <p className='label-name'>标签名称</p>
                    <input type='text' id='label-text' className='label-text' placeholder='  生活记录' name='text'></input>
                    <p className='label-cover'>设置生活记录封面</p>
                    {/* <input type="button" value="上传照片" οnClick={() => this.instant()} /> */}
                    <img src={require("../images/sort-test1.jpg")} id="show" className='label-show'></img>
                    <input type='file' className='label-image' name='file'
                    accept="image/png, image/jpeg, image/gif, image/jpg" 
                    onChange={() => this.changepic()}
                    ></input>
                </form>
            </div>
        )
    }
}
