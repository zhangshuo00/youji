import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'

const { Header,Content,Footer,Sider } = Layout;
const { SubMenu } = Menu;


export default class Adimn extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed : false,
            data : []
        }
    }

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    getUser = ()=>{
        console.log('getuser');
        fetch('/backGetUsers',{
            method:'GET',
            mode:'cors',
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data : data
            })
        })
    }

    getChapter = ()=>{
        console.log('getchapter');
        fetch('/backGetChapter',{
            method:'GET',
            mode:'cors',
            headers:{'Content-Type':'application/json'}
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data : data
            })
        })
    }

    render() {
        return (
            <Layout style={{minHeight:'100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item onClick={this.getUser} key="1">
                            <Icon type="user"/>
                            <span>用户列表</span>
                        </Menu.Item>
                        <Menu.Item onClick={this.getChapter} key="2">
                            <Icon type="file"/>
                            <span>文章列表</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}/>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        {/* <Breadcrumb.Item>user</Breadcrumb.Item> */}
                        {/* <Breadcrumb.Item>chapter</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.
                            {
                                
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>youji background management system ©2018 Created by youji</Footer>
                </Layout>
            </Layout>
        )
    }
}
