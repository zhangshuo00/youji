import React, { Component, useEffect, useState } from 'react';
import { Text, View,Dimensions, StyleSheet,ImageBackground, ScrollView,TouchableOpacity,Alert, Image, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'

const {width,scale} = Dimensions.get('window');
const s = width / 640;

console.disableYellowBox = true; //取消显示黄框


const ListSort =(porps)=> {
    let [datas, setDatas] = useState([]);
    let [uid, setUid] = useState('');
    let [tags, setTags] = useState('');
    let [refresh, setRefresh] = useState('');
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    const getStorage = async()=>{
        setUid(await AsyncStorage.getItem('uid'));
        setTags(await AsyncStorage.getItem('tags'))
    };

    useEffect(() => {
        getStorage();
        let post = {
            uid: uid
        };
        setTimeout(() => {
            fetch('http://majia.hbsdduckhouse.club/listSort',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                // 根据返回的消息，渲染响应的页面
                setDatas(data)
                // console.log(data);
            })
        }, 300);
    })

    
    //长按删除
    const touchStart=(item)=>{
        Alert.alert('提示',
            '是否删除该分类，并删除该分类下所有笔记?', 
            [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => delTags(item)
                },
            ]
        )
    }
    //删除函数
    const delTags=(item)=>{
        let post ={
            uid:uid,
            tags:item.tags
        }
        console.log(post,"dsa");
        fetch('http://majia.hbsdduckhouse.club/delTags',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data,'重新加载');
            //重新刷新该页面
        })
    }

    //跳转详细分类，笔记页面
    const jumpToSion = (item)=>{
        // AsyncStorage.setItem('tags',item.tags)
        Actions.sion({tag:item.tags})
        // console.log(e.target.innerHTML.slice(3,-4));
        // const clickTag = e.target.innerHTML.slice(3,-4);
        // // 跳转到点击笔记标签的列表页
    }

    const head = ()=>{
        Actions.sider();
    }

    return (
            <ScrollView style={{backgroundColor:isDarkMode?'black':'white'}}>
                <View style={{flexDirection:'row',backgroundColor:isDarkMode?'black':'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={stylesBlack.headIcon} onPress={()=>{head()}}><Icon name='bars' color={'white'} size={28}></Icon></TouchableOpacity>
                    <Text style={stylesBlack.headText}>笔记列表</Text>
                    <TouchableOpacity style={stylesBlack.headIcon} onPress={()=>Actions.addtag()}><Icon name='tag' color={'white'} size={28}></Icon></TouchableOpacity>
                 </View>
                <View>
                    {
                        datas.map((item)=>(
                            <View style={{margin:15*s,borderRadius:20*s}}>
                                <TouchableOpacity
                                    onLongPress={()=>touchStart(item)}
                                    onPress={()=>jumpToSion(item)}
                                >
                                <ImageBackground 
                                    imageStyle={{borderRadius:20*s}}
                                    source={{uri:'https://www.hbsdduckhouse.club/' + item.img_path}}
                                    style={{height:180*s,borderRadius:20*s}}
                                >
                                    <Text style={{color:isDarkMode?'white':"orange",fontSize:30*s,marginLeft:20*s,marginTop:10*s}}>
                                        {item.tags}
                                    </Text>
                                </ImageBackground >
                                </TouchableOpacity>
                            </View>
                        ))
                        }
                </View>
            </ScrollView>
    )

}
export default ListSort

const dynamicStyles = new DynamicStyleSheet({
    headText:{
        marginRight:width*0.12,
        width:width*0.54,
        textAlign:'center',
        fontSize:22,
        color:'white'
    },
    headIcon:{
        marginLeft:width*0.02,
        width:width*0.2,
    },
    msgList:{
        width: width,
    },
})
