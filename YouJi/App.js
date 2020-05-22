import React,{useState,useEffect} from 'react'
import { Text, View, AsyncStorage } from 'react-native';
import {Router,Scene,Tabs,Modal,Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from './src/home/Home';
import Msg from './src/msg/Msg';
import My from './src/my/Me';
import List from './src/components/ListCard';
import Sion from './src/list/Sion';
import ListSion from './src/list/ListSort';
import Sionple from './src/list/Sionple';
import Sionnew from './src/list/Sionnew';
import SplashScreen from 'react-native-splash-screen';
import MsgDetails from './src/msg/MsgDetails';
import Login from './src/login/Login';
import Sign from './src/login/Sign';
import Password from './src/login/Password';
import Test from './src/login/Test';
import Edit from './src/my/Edit';
import AddTag from './src/list/AddTag';
import SwipePage from './src/login/SwiperPage';
import Search from './src/components/Search';
import Sider from './src/components/Sider';

console.disableYellowBox = true; //取消显示黄框


const App = () => {
    
  let [isLogin,setLogin] = useState(false);
  let [isInstall,setInstall] = useState(true);
  useEffect(()=>{
    // AsyncStorage.clear();
    AsyncStorage.getItem('isInstall')
      .then(res=>{
          if(res){
            setInstall(false);
          }
          console.log(res);
          SplashScreen.hide();
      })
    AsyncStorage.getItem('uid')
      .then(res=>{
        let user = res;
        console.log(user)
        if(!user){
          SplashScreen.hide();
        }
        if(user){
          setLogin(true);
          SplashScreen.hide();
        }
      })
  },[])


  let afterInstall=()=>{
    setInstall(false);
  }
  let afterExit=()=>{
    setLogin(false);
  }
  if(isInstall){
      return<View style={{flex:1}}>
          <SwipePage afterInstall = {afterInstall}/>
      </View>
  }
  

	return (
    <Router>
      <Modal hideNavBar>
        <Tabs activeTintColor='rgb(250, 167, 85)' inactiveTintColor='rgb(148, 148, 148)'>
          <Scene key='homePage' title='首页' 
              headerMode="none"
              icon={({focused})=>
                  <Icon name="home" color={focused?'rgb(250, 167, 85)':'rgb(148, 148, 148)'} size={28} />
              }>
    
              <Scene key='home' component={Home}></Scene>
              <Scene key='search' component={Search}></Scene>
              {/* <Scene key='sider' component={Sider}  hideTabBar={true} hideNavBar></Scene> */}
          </Scene>
          <Scene key='list' title='笔记'
                icon={({focused})=>
                  <Icon name="form" color={focused?'rgb(250, 167, 85)':'rgb(148, 148, 148)'} size={28} />
                } hideNavBar>

              <Scene key='listSion' component={ListSion}></Scene>
              <Scene key='sion' component={Sion}></Scene>
              <Scene key='sionple' component={Sionple}></Scene> 
              <Scene key='sionnew' component={Sionnew}></Scene>
              <Scene key='addtag' component={AddTag}></Scene>
          </Scene>
          <Scene key='msg' title='消息'
                icon={({focused})=>
                  <Icon name="message1" color={focused?'rgb(250, 167, 85)':'rgb(148, 148, 148)'} size={28} />
                } hideNavBar> 

              <Scene key='msg' component={Msg}></Scene>

          </Scene>
          <Scene key='my' title='我的' 
                icon={({focused})=>
                    <Icon name="user" color={focused?'rgb(250, 167, 85)':'rgb(148, 148, 148)'} size={28} />
                } hideNavBar>

                <Scene key='my' component={My}></Scene>
                <Scene key='edit' component={Edit}></Scene>
          </Scene>
        </Tabs> 
        <Scene key='msgDetails' component={MsgDetails}></Scene>
        <Scene initial={!isLogin} key='login' component={Login} hideTabBar={true} hideNavBar></Scene>
        <Scene key='sign' component={Sign} hideTabBar={true} hideNavBar></Scene>
        <Scene key='test' component={Test} hideTabBar={true} hideNavBar></Scene>
        <Scene key='Password' component={Password} hideTabBar={true} hideNavBar></Scene>
      </Modal>
    </Router>
	);
};

export default App;