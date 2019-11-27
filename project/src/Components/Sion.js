import React, { Component } from 'react';
import { NavBar, Icon, Tabs, WingBlank, Carousel, Grid, Flex, WhiteSpace} from 'antd-mobile';
import {Link,Route} from 'react-router-dom'; 

// const data = Array.from(new Array(3)).map((_val, i) => ({
//     icon:require(`../img/images/住吧首页_02.jpg`),
//   }));
// const PlaceHolder = ({ className = '', ...restProps }) => (
//     <div className={`${className} placeholder`} {...restProps}><img src={require(`../img/images/住吧首页_02.jpg`)} style={{float:'left'}}></img></div>
//   );

export default class AppHome extends Component {
    render() {
        return (
            <div>
            <div>
                {/* <Link className="back">></Link> */}
                
                            <NavBar
                style={{backgroundColor:'pink',color:'white'}}
                leftContent={[
                    <Icon key="0" type="left" style={{ marginLeft: '16px' }} />,
                  ]}
                rightContent={[
                    <Icon key="0" type="plus" style={{ marginRight: '16px' }} />,
                  ]}
                >美食记录</NavBar>
                {/* <img src=''></img> */}
                {/* <link clsaaName='add'>+</link> */}
                
            </div>
            {/* <div>
                <Grid data={data} columnNum={3} />
            </div> */}
            <div style={{marginTop:'3%'}}>
            <WingBlank> <Flex>
                <Flex.Item> 
                    <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%'}}></img>
                    <p>11月22号</p>
                    <p>做一份美味面包</p>
                    </div></Flex.Item>
                <Flex.Item><div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%'}}></img>
                <p>11月22号</p>
                    <p>做一份美味炒菜</p>
                </div></Flex.Item>
                </Flex>
                <Flex>
                <Flex.Item> <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%'}}></img><p>11月22号</p>
                    <p>做一份美味面包</p></div></Flex.Item>
                <Flex.Item><div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%'}}></img><p>11月22号</p>
                    <p>做一份美味炒菜</p></div></Flex.Item>
                </Flex>
                <Flex>
                <Flex.Item> <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%'}}></img><p>11月22号</p>
                    <p>做一份美味面包</p></div></Flex.Item>
                <Flex.Item><div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%'}}></img><p>11月22号</p>
                    <p>做一份美味炒菜</p></div></Flex.Item>
                </Flex>
                <Flex>
                <Flex.Item> <div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%'}}></img><p>11月22号</p>
                    <p>做一份美味面包</p></div></Flex.Item>
                <Flex.Item><div><img src={require(`../images/20180805121533_tjjgs.jpeg`)} style={{height:'30%',width:'100%'}}></img><p>11月22号</p>
                    <p>做一份美味炒菜</p></div></Flex.Item>
                </Flex></WingBlank>
            </div>

            </div>
        )
    }
}

