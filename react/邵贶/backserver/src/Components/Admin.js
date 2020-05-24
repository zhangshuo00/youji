import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import GetUsers from './GetUsers'
import GetChapter from './GetChapter'
import StatisticComp from './StatisticComp'

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

    componentDidMount(){
        
    }

    getUser = ()=>{
        console.log('getuser');
        window.location = '/admin/getUsers'
    }

    getChapter = ()=>{
        window.location = '/admin/getChapter'
        console.log('getchapter');
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
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Route path="/admin" component={StatisticComp}/>
                            <Route path="/admin/getUsers" component={GetUsers}/>
                            <Route path="/admin/getChapter" component={GetChapter}/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>youji background management system ©2018 Created by youji</Footer>
                </Layout>
            </Layout>
        )
    }
}
