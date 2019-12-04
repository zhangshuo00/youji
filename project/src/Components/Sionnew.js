import React, { Component } from 'react';
import { NavBar, Icon, WingBlank,InputItem,List, TextareaItem,Switch} from 'antd-mobile';
import { ImagePicker, SegmentedControl } from 'antd-mobile';
const data = [{
    url: '../images/DLW7@W5XOHV9D2ZN3OU1DY3.png',
    id: '2121',
  }]
export default class Sionnew extends Component {
    constructor(props){
      super(props);
      this.state={
        files: data,
        multiple: false,
        checked: false,
        checked1: true,
      }
    }
    // state = {
    //     files: data,
    //     multiple: false,
    //   }
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
      submitSion = () =>{
        const title = document.getElementById('title').value;
        const context = document.getElementById('context').value;
        const post = {
          title :title,
          context: context
        }
        console.log(title,context,this.state.checked)
        // fetch('',{
        //   method:'POST',
        //   mode:'cors',
        //   headers: {'Content-Type': 'application/json'},
        //   body:JSON.stringify(post)
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //   console.log(data)
        //   console.log(this.state.checked)
        // })
      }


    render() {
        const { files } = this.state;
        return (
            <div>
            <div>
                            <NavBar
                mode="light"
                onLeftClick={() => window.location='/sion'}
                // onRightClick={this.submitSion}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '1px' }} />,
                  ]}
                  rightContent={[
                    <span onClick={this.submitSion}>保存</span>
                  ]}
                >新建笔记 </NavBar>
            </div>
        
            <div>
                <InputItem
                id="title"
                clear
                placeholder="点击编辑标题"
                ref={el => this.autoFocusInst = el}
                >标题</InputItem>
                {/* <textarea id="context" cols='50' rows='5' style={{backgroundColor:'rgba(245, 245, 249,1)',color:'gray',height:'168px',width:'100%',border:'0px',lineHeight:'40px'}}>双击编辑文本</textarea> */}
                <List>
                <TextareaItem
                  id="context"
                  rows={5}
                  placeholder="点击编辑笔记内容"
                />
              </List>
            </div>
                <WingBlank>
                <ImagePicker
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 1}
                multiple={this.state.multiple}
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

