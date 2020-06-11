import React, { Component, useState, useEffect } from 'react'
import { Text, View,StyleSheet,Dimensions,Image, FlatList, TouchableOpacity,Alert, ScrollView,AsyncStorage} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'

const {width,scale} = Dimensions.get('window');
const s = width / 640;

const Sion = (props)=> {
    let [datas, setDatas] = useState([]);
    let [chid, setChid] = useState('');
    let [uid, setUid] = useState('');
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    //长按删除
    const touchStart=(e)=>{
        Alert.alert('提示',
            '是否删除这篇笔记?', 
            [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => delTags(e) },
            ])
    }
    const delTags= async(e)=>{
        console.log(e)
        const post ={
            uid:await AsyncStorage.getItem('uid').then(res=>res),
            chid:e.chid
        }
        console.log(post);
        fetch('http://majia.hbsdduckhouse.club/delSionple',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            // componentDidMount()
        })
    }
    const getUid = async()=>{
        setUid(await AsyncStorage.getItem('uid'));
    }
    useEffect(() => {
        getUid();
        let post = {
            uid: uid,
            tags: props.tag
        }
        // console.log(post)
        AsyncStorage.setItem('tags',props.tag);
        setTimeout(() => {
            fetch('http://majia.hbsdduckhouse.club/Sion',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data,'返回的单页数据');
                setDatas(data)
            })
        }, 300);

    })


    
    //跳转相信分类
    const jumpToSionple =(item)=>{
        // var uid = uid
        // AsyncStorage.setItem('chid',""+item.chid+"")
        // console.log('跳转到子页',item.chid)
        // console.log(uid)
        let chids = item.chid;
        Actions.sionple({uid,chids});
    }
    
    return (
            <ScrollView style={{backgroundColor:isDarkMode?'black':'white'}}>
                <View style={{flexDirection:'row',backgroundColor:isDarkMode?'black':'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={stylesBlack.headIcon} onPress={()=>Actions.listSion()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                        <Text style={stylesBlack.headText}>{props.tag}</Text>
                    <TouchableOpacity style={stylesBlack.headIcon} onPress={()=>Actions.sionnew({tag:props.tag})}><Icon name='plus' color={'white'} size={28}></Icon></TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor:isDarkMode?'black':'white'}}>
                        <FlatList
                        numColumns='2'
                        data={datas}
                        renderItem={({item})=>{
                            return(
                                <TouchableOpacity 
                                    onLongPress={()=>touchStart(item)}
                                    onPress={()=>jumpToSionple(item)}
                                    style={{
                                        paddingTop:40*s,
                                        width:'50%',
                                        flexDirection:'column',
                                        alignItems:'center',
                                    }}>
                                <View style={{flexDirection:'column',alignItems:'center',}}>
                                    <Image 
                                    source={{uri:'https://www.hbsdduckhouse.club/' + item.ch_headimg}}
                                    style={{height:120*s,width:150*s,borderRadius: 10*s}}/>
                                    <Text  style={{marginBottom:5*s,color:isDarkMode?'white':'black'}}>{item.title}</Text>
                                    <Text style={{color:isDarkMode?'white':'black'}}>{item.chdate}</Text>
                                </View>
                                </TouchableOpacity>
                            )
                            }}
                            />
                </View>
            </ScrollView>
    )
}
export default Sion

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