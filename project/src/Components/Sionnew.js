import React, { Component } from 'react';
import { NavBar, Icon, WingBlank} from 'antd-mobile';
import { ImagePicker, SegmentedControl } from 'antd-mobile';
const data = [{
    url: '../images/DLW7@W5XOHV9D2ZN3OU1DY3.png',
    id: '2121',
  }]
export default class AppHome extends Component {

    state = {
        files: data,
        multiple: false,
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
                style={{backgroundColor:'pink',color:'white'}}
                onLeftClick={() => window.location='/sion'}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '1px' }} />,
                  ]}
                  rightContent={[
                    <span>保存</span>
                  ]}
                >新建笔记 </NavBar>
            </div>
            <div>
                <textarea cols='20' rows='2' style={{backgroundColor:'rgba(245, 245, 249,1)',color:'gray',height:'38px',width:'100%',border:'0px',lineHeight:'40px'}}>双击编辑标题</textarea>
            </div>
            <div>
                <textarea cols='50' rows='5' style={{backgroundColor:'rgba(245, 245, 249,1)',color:'gray',height:'168px',width:'100%',border:'0px',lineHeight:'40px'}}>双击编辑文本</textarea>
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
           

            </div>
        )
    }
}

