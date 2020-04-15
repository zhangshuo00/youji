import React, { Component } from 'react'
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native';
import {Router, Scene, Tabs,Drawer, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign'
import AddIcon from 'react-native-vector-icons/Ionicons'
import SplashScreen from 'react-native-splash-screen';
import shouye from './youji/shouye'
import xiaoxi from './youji/xiaoxi'
import listSort from './youji/ListSort'
import wode from './youji/wode'
import sion from './youji/Sion';
import sionple from './youji/Sionple';
import sionnew from './youji/Sionnew';
import AddTag from './youji/AddTag';

export default class WorkAPP extends Component {
    componentDidMount(){
        SplashScreen.hide();
    }
    //跳转到新建笔记页
    jumpToSionnew = (e)=>{
        console.log('跳转')
        Actions.sionnew()
    }
    //跳转到新建分类页
    jumpToAddTag = (e)=>{
        console.log('跳转')
        Actions.addtag()
    }


    render() {
        return (
            <Router>
                	<Drawer 
						key="drawer"
						contentComponent={()=><Text>drawer</Text>}
						drawerIcon={()=><Icon name="bars" size={30} color='#fff'/>}
                        drawerWidth={400}
                        navigationBarStyle={{backgroundColor:'orange'}}
					>
                <Scene key='tabbar'>
                <Tabs 
					key='tabbar'
					hideNavBar
					tabBarStyle={{backgroundColor:'orange'}}
				>
                {/* 首页 */}
					<Scene key='home'>
						<Scene key="docs" component={shouye}/>
					</Scene>


                {/* 笔记*/}
                    <Scene key='list' 
                        initial='true'//默认显示笔记页
                        titleStyle={{flex:1,textAlign:'center',color:'#fff'}}
                        renderRightButton={()=><Icon name="tago" onPress={this.jumpToAddTag} size={30} color='#fff'/>}
                    >
						<Scene key="docs" title='笔记分类'  component={listSort}/>
                        <Scene key='sion' 
                        back='true'
                        backButtonTintColor='#fff'
                        hideTabBar
                        renderRightButton={()=><AddIcon name="md-add" onPress={this.jumpToSionnew} size={30} color='#fff'/>}  
                        component={sion}/>
                        <Scene key='sionple'
                        back='true'
                        backButtonTintColor='#fff'
                        hideTabBar
                        renderRightButton={()=><View></View>}  
                        component={sionple}
                        />
                        <Scene key='sionnew'
                        back='true'
                        backButtonTintColor='#fff'
                        hideTabBar
                        renderRightButton={()=><View><Text>保存</Text></View>}
                        component={sionnew}
                        />
                        <Scene key='addtag'
                        back='true'
                        backButtonTintColor='#fff'
                        hideTabBar
                        title='添加标签'
                        renderRightButton={()=><View><Text style={{fontSize:20,color:'#fff'}}>保存</Text></View>}
                        component={AddTag}
                        />
					</Scene>


                    
                    <Scene key='msg'>
						<Scene key="docs" component={xiaoxi}/>
					</Scene>
					<Scene key='my'>
						<Scene key="docs" component={wode}/>
					</Scene>
                </Tabs>
                </Scene>
                </Drawer>
            </Router>
        )
    }
}
