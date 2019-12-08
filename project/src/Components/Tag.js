import React from 'react'
import { TabBar } from 'antd-mobile';
import Find from './Find';
import ListSort from './ListSort';
import MessageList from './MessageList';
import Me from './Me';

export default class AppTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
    };
  }
  render() {
    return (
        <div style={{ 
            position: 'fixed', 
            height: '100%', 
            width: '100%', 
            top: 0 
        }}>
            <TabBar
            unselectedTintColor="#949494"
            tintColor="#FAA755"
            barTintColor="white"
            >
            <TabBar.Item
                title="首页"
                key="home"
                icon={<div style={{
                width: '22px',
                height: '22px',
                background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/home2.png") center center /  21px 21px no-repeat` }}
                />
                }
                selectedIcon={<div style={{
                width: '22px',
                height: '22px',
                background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/home3.png") center center /  21px 21px no-repeat` }}
                />
                }
                selected={this.state.selectedTab === 'blueTab'}
                onPress={() => {
                    this.setState({
                        selectedTab: 'blueTab',
                    });
                }}
            >
            <Find />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/note.png") center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/note1.png") center center /  21px 21px no-repeat` }}
              />
            }
            title="笔记"
            key="note"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
              });
            }}
          >
           <ListSort />
          </TabBar.Item>
          {/* <TabBar.Item
          icon={
            <div style={{
              width: '40px',
              height: '40px',
              background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/-.png") center center /  40px 40px no-repeat` }}
            />
          }>
          </TabBar.Item> */}
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/msg.png") center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px',
                background: `url("https://raw.githubusercontent.com/zhangwenkang6/React/master/images/msg1.png") center center /  21px 21px no-repeat` }}
              />
            }
            title="消息"
            key="msg"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
          <MessageList/>
          </TabBar.Item>
          <TabBar.Item
            icon={{ uri:`https://raw.githubusercontent.com/zhangwenkang6/React/master/images/me.png`}}
            selectedIcon={{ uri:`https://raw.githubusercontent.com/zhangwenkang6/React/master/images/me1.png` }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
           <Me/>
          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}