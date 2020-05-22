import React, { Component, useEffect, useState } from 'react';
import {View, Text, Button,TouchableOpacity,StyleSheet,Image,AsyncStorage} from 'react-native';
import {Router,Overlay,  Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import { TabBar } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ListCard from './ListCard';
// import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'


const Me = () => {
    const [data, setData] = useState({
        uname:'张三',
        uemail:'zhangsan@qq.com',
        userCounts:5,
        chapterCounts:5,
        signature:'我是张三',
        headimg:'images/timg.jpg',
        usex:'男',
        seximg: ''
    });
    const [selectedTab, setSelectedTab] = useState('');
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);
    
    useEffect(() => {
        const post ={
            uid: AsyncStorage.getItem('uid').then(res=>res),
        }
        // console.log(post);
        fetch('http://majia.hbsdduckhouse.club/me',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            setData(data[0])

            if(data[0].usex == '男'){
                setData({
                    seximg:'images/nan.png'
                })
            }else{
                setData({
                    seximg:'images/nv.png'
                })
            }
        })
    }, []);

    onChangeTab = (tabName) =>{
        setSelectedTab(tabName)
    };

    renderContent = (pageText) =>{
        return (
            <View style={stylesBlack.me_card}>   
              <ListCard/>
            </View>
          );
    };

    return (
        <View  style={{backgroundColor: isDarkMode ? 'black':'#fff'}}>
            <View style={stylesBlack.me_top}>
                <View style={stylesBlack.me_top_list}>
                    <Icon style={{
                    color:'#fff',
                    marginTop:20,
                    marginLeft:10                              
                    }} size={30} name="bars"
                    onPress={()=>Actions.sider()}
                    />
                </View>
                <View style={stylesBlack.me_top_user}>
                    <Text style={{color: isDarkMode ? '#fff':'black'}}>{data.uname}</Text>
                </View>
                <View style={stylesBlack.me_top_email}>
                    <Text style={{color: isDarkMode ? '#fff':'black'}}>{data.uemail}</Text>
                </View>
            </View>
            <View style={stylesBlack.me_title}>
                <Image style={stylesBlack.me_head} source={require('../images/pic1.jpg')}/>
                <View style={stylesBlack.me_num}>
                    <View style={stylesBlack.me_sex}>
                        {/* <Image style={stylesBlack.me_imgsex} source={require('./'+seximg)}/> */}
                        <Image style={stylesBlack.me_imgsex} source={{uri:'https://zhangshuo00.github.io/youji/YouJi/src/' +data.seximg}}/>
                        <Text style={{color: isDarkMode ? '#fff':'black'}}>{data.usex}</Text>
                    </View>
                    <View style={stylesBlack.me_atten}>
                        <Text style={{color: isDarkMode ? '#fff':'black'}}>{data.userCounts}</Text>
                        <Text style={{color: isDarkMode ? '#fff':'black'}}>关注</Text>
                    </View>
                    <View style={stylesBlack.me_collect}>
                        <Text>{data.chapterCounts}</Text>
                        <Text>收藏</Text>
                    </View>
                </View>
            </View>
            <View style={stylesBlack.me_btn}>
                <Button title="编辑资料" color="#faa755" onPress={()=>Actions.edit()}/>
            </View>
            <View style={stylesBlack.me_sign}>
                <Text style={{color: isDarkMode ? '#fff':'black'}}>个性签名：{data.signature?data.signature:'这个人很懒，啥都没写'}</Text>
            </View>
            <View style={stylesBlack.me_nav}>
                <TabBar style={stylesBlack.me_bar}
                unselectedTintColor="#949494"
                tintColor="#faa755"
                >
                    <TabBar.Item title="收藏列表" 
                    style={stylesBlack.me_essay}
                    selected={selectedTab === 'Tab1'}
                    onPress={() => onChangeTab('Tab1')}
                    >
                        {renderContent(<ListCard/>)}                
                    </TabBar.Item>
                    <TabBar.Item title="关注列表" 
                    style={stylesBlack.me_follow}
                    selected={selectedTab === 'Tab2'}
                    onPress={() => this.onChangeTab('Tab2')}
                    >
                        {renderContent(<ListCard/>)} 
                        {/* <Text>zhangsan</Text> */}
                    </TabBar.Item>
                </TabBar>
            </View>
        </View>
    )
}

export default Me

// const dynamicStyles = new DynamicStyleSheet({
//     me_top:{
//         backgroundColor: new DynamicValue('#faa755','black')
//     },
//     me_top_user:{
//         flex:1,
//         marginLeft:220,
//         marginBottom:20,
//         position:"absolute",
//         top:10
//     },
//     me_top_email:{
//         flex:1,
//         marginLeft:180,
//         position:"absolute",
//         top:30
//     },
//     me_title:{
//         flex:1,
//         flexDirection: 'row',
//         flexWrap:'wrap',
//         marginLeft:20,
//         marginTop:10,
//         width:width,
//         // height:300,
//         backgroundColor:'white'
//     },
//     me_head:{
//         borderRadius:55,
//         width:100,
//         height:100
//     },
//     me_num:{
//         flex:1,
//         flexDirection: 'row',
//         width:width-100,
//         marginLeft:40,
//         marginTop:-30,
//         textAlign:'center',
//         alignItems:'center'
//     },
//     me_sex:{
//         width:100
//     },
//     me_imgsex:{
//         width:20,
//         height:20
//     },
//     me_atten:{
//         width:100
//     },
//     me_collect:{
//         width:100
//     },
//     me_btn:{
//         paddingTop:5,
//         width:270,
//         borderRadius:18,
//         marginTop:70,
//         marginLeft:145,
//         color:'white',
//         backgroundColor:"#faa755",
//         height:36
//     },
//     me_sign:{
//         marginLeft:15,
//         marginTop:10,
//         fontSize:18,
//         color:'grey',
//         marginBottom:10
//     },
//     me_nav:{
//         height:150,
//         flexDirection: 'row',
//         alignItems: 'center',
        
//     },
//     me_card:{ 
//         flex: 1,  
//         backgroundColor: 'white',
//         marginTop:50
//     }
// })
