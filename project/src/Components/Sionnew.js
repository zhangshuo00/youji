import React, { Component } from 'react';
import { NavBar, Icon, Tabs, WingBlank, Carousel, Grid, Flex, WhiteSpace} from 'antd-mobile';
import {Link,Route} from 'react-router-dom'; 

export default class AppHome extends Component {
    render() {
        return (
            <div>
            <div>
                            <NavBar
                style={{backgroundColor:'pink',color:'white'}}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '1px' }} />,
                  ]}
                  rightContent={[
                    <span>保存</span>
                  ]}
                >新建笔记 </NavBar>
            </div>
        
            <div>
                <textarea cols='50' rows='5' style={{backgroundColor:'rgba(245, 245, 249,1)',color:'gray',height:'168px',width:'100%',border:'0px',lineHeight:'40px'}}>双击编辑文本</textarea>
            </div>
            <div><img src={require(`../images/DLW7@W5XOHV9D2ZN3OU1DY3.png`)}></img><span style={{color:'gray'}}>点击添加图片</span>
            </div>
           

            </div>
        )
    }
}

