import React, { Component } from 'react'
import '../css/addTag.css';
import {ImagePicker,Icon} from 'antd-mobile';
//新建标签页

const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  }];

export default class AddTag extends Component {

    state = {
        files: data,
      }

    labelSave= ()=>{

    }

    getObjectURL=(file)=> {
      var url = null ;
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
      } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
      } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
      }
      return url ;
  }
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
    // instant=()=> {
    //   var f=document.getElementsByClassName('label-image');
    //   f.onClick();
    // }


    onChange = (files) => {
        var x= files;
        x.shift();
        this.setState({
          files:x
        });
      }
    render() {
        const { files } = this.state;
        return (
            <div>
                {/* <div className ='label-head'> */} {/* </div>  */}
                <Icon type="left" className='label-left' onClick={() => window.location='/sort'} 
                    style={{color:'#000',float: 'left',width: '10%',marginTop:'27px'}}/>
                <p className='label-title' style={{color:'#000',fontSize:'14px'}}>添加标签</p>
                <form className="" action="" method="POST">
                    <input type = 'submit' className = 'label-save' value='保存' onClick={() => this.labelSave()}></input>
                    <p className='label-name'>标签名称</p>
                    <input type='text' className='label-text' placeholder='  生活记录' name='text'></input>
                    <p className='label-cover'>设置生活记录封面</p>
                    {/* <input type="button" value="上传照片" οnClick={() => this.instant()} /> */}
                    <img src="https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg" id="show" className='label-show'></img>
                    <input type='file' className='label-image' name='file'
                    accept="image/png, image/jpeg, image/gif, image/jpg" 
                    onChange={() => this.changepic()}
                    ></input>
                </form>
                {/* <ImagePicker
                length = '2'
                files={files}
                onChange={this.onChange}
                // onImageClick={(index, fs) => console.log(index, fs)}
                // onImageClick={(files, type, index) => this.onChange(files, type, index)}
                selectable='false'
                disableDelete='true'
                accept="image/gif,image/jpeg,image/jpg,image/png"
                /> */}
            </div>
        )
    }
}
