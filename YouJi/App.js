import React,{useState,useEffect} from 'react'
import { Text, View, AsyncStorage } from 'react-native';
import {Router,Scene,Tabs,Modal,Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from './src/common/Home';
import Msg from './src/common/Msg';
import My from './src/common/My';
import List from './src/common/List';
import SplashScreen from 'react-native-splash-screen';

console.disableYellowBox = true; //取消显示黄框


const App = () => {
    
  useEffect(()=>{
    SplashScreen.hide();
  },[])

	return (
    <Router>
      <Modal hideNavBar>
        <Tabs activeTintColor='red' inactiveTintColor='grey'>
          <Scene key='home' title='首页' 
              icon={({focused})=>
                  <Icon name="home" color={focused?'red':'rgb(250, 167, 85)'} size={28} />
              }>
    
              <Scene key='home' component={Home}></Scene>

          </Scene>
          <Scene key='list' title='笔记'
                icon={({focused})=>
                  <Icon name="form" color={focused?'red':'rgb(250, 167, 85)'} size={28} />
                }>

              <Scene key='list' component={List}></Scene>

          </Scene>
          <Scene key='msg' title='消息'
                icon={({focused})=>
                  <Icon name="message1" color={focused?'red':'rgb(250, 167, 85)'} size={28} />
                } hideNavBar> 

              <Scene key='msg' component={Msg}></Scene>

          </Scene>
          <Scene key='my' title='我的' 
                icon={({focused})=>
                    <Icon name="user" color={focused?'red':'rgb(250, 167, 85)'} size={28} />
                } hideNavBar>

                <Scene key='my' component={My}></Scene>

          </Scene>
        </Tabs> 
        {/* <Scene initial={!isLogin} key='login' component={Login} hideTabBar={true} hideNavBar></Scene>  //登录页
        <Scene key='sign' component={Sign} hideTabBar={true} hideNavBar></Scene>  //注册页 */}
      </Modal>
    </Router>
	);
};

export default App;