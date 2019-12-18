import React, { Component } from 'react';
import { NavBar, Icon, WingBlank,List,Switch} from 'antd-mobile';
import { ImagePicker} from 'antd-mobile';
const data = [{
    url: '../images/DLW7@W5XOHV9D2ZN3OU1DY3.png',
    id: '2121',
  }]
export default class SionNew extends Component {

  constructor(props){
    super(props);
    this.state = {
      uid:'',
            tags:'',
            title:'点击添加标题',
            context:'点击添加文本',
            files:[],
            checked: false,
    }
  }
  onChange1(e){// 当input内改变时，将value值写入state
    this.setState({
      // title:document.getElementById('title').innerHTML
      title:e.target.value
    })
  }
  onChange2(e){// 当input内改变时，将value值写入state
    this.setState({
      // context:document.getElementById('context').innerHTML
      context:e.target.value
    })
  }
      onSubmit(e){
        // const labelTitle = document.getElementById('title').innerHTML;
        //   const labelContext = document.getElementById('context').innerHTML;
      //     const f=document.getElementsByClassName('path')[0].files[0];
      // var reader = new FileReader();
      // const fs = reader.readAsDataURL(f);	
        //   console.log(labelContext,labelTitle);
        var filelist = [];
        this.state.files.map((item)=>{
          filelist.push(item.url);
        })
        console.log(filelist);
          const post ={
            uid:localStorage.getItem('uid'),
            tags:localStorage.getItem('tags'),
            title:this.state.title,
            context:this.state.context,
            files:filelist,
            isShare: this.state.checked ? 1 : 0
          }
        console.log(post);
        fetch('http://majia.hbsdduckhouse.club/addSionple/',{
          method:'POST',
          // mode:'cors',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(post)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log(data.msg);
        var storage = window.localStorage;
        
          })
          // 根据返回的消息，渲染响应的页面
      }
      state = {
        files: data,
      }
      onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
          files,
        });
      }
      onSegChange = (e) => {
        const index = e.nativeEvent.selectedSegmentIndex;
        this.setState({
          multiple: index === 1,
        });
      }


    render() {
        const { files } = this.state;
        return (
            <div>
            <div>
              <NavBar
                style={{backgroundColor:'#faa755',color:'white',width:'100%'}}
                onLeftClick={() => window.history.back(-1)}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '1px' }} />,
                  ]}
                  rightContent={[
                    // <span>保存</span>
                    <span onClick={() => this.onSubmit()} >保存</span>

                  ]}
                >新建笔记 </NavBar>
            </div>
            <div>
                <textarea cols='20' rows='2' style={{backgroundColor:'#fff',marginBottom:'3px',color:'gray',padding:'0',height:'40px',width:'96%',paddingLeft:'2%',paddingRight:'2%',border:'0px',lineHeight:'40px'}} id="title" value={this.state.title} onChange={(e) => this.onChange1(e)}>双击编辑标题</textarea>
            </div>
            <div>
                <textarea cols='50' rows='5' style={{backgroundColor:'#fff',marginBottom:'3px',color:'gray',height:'168px',padding:'0',width:'96%',paddingLeft:'2%',paddingRight:'2%',border:'0px',lineHeight:'40px'}} id="context" value={this.state.context} onChange={(e) => this.onChange2(e)}>双击编辑文本</textarea>
            </div>
            <WingBlank style={{backgroundColor:'#fff',width:'96%',paddingLeft:'2%',paddingRight:'2%',margin:'0'}}>
                <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                // selectable={files.length < 1}
                multiple={this.state.multiple}
                // id="path"
                /><span style={{color:'gray'}}>点击添加图片</span>
            </WingBlank>
            <List.Item
            extra={<Switch
            checked={this.state.checked}
            onChange={() => {
              this.setState({
                checked: !this.state.checked,
              });
            }}
            />}
            >是否分享</List.Item>
            </div>
        )
    }
}

