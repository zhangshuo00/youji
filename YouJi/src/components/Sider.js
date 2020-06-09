import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, AsyncStorage,TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign'
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'

const Sider = () => {

    let [datas,setdatas] = useState({
        headimg:'images/timg.jpg',
        uname:'未登录',
        uemail:'未登录'
    });
    const [diffDate, setDiffDate] = useState('1');
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    useEffect(()=>{
        // const post = {uid:AsyncStorage.getItem('uid').then(res=>res)}
        AsyncStorage.getItem('uid').then(res=>{
            if(res){
                const post = {uid:res}
                console.log(post);
                fetch('http://majia.hbsdduckhouse.club/userDetail',{
                    method:'POST',
                    // mode:'cors',
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify(post)
                })
                .then(res=>res.json())
                .then(data=>{
                    // console.log(data);
                    setdatas(data[0])
                    forwardTiming(data[0].registration_date)
                })
            }
        })

        
        
        // const post = {uid:'k3i297def'}
        // console.log(post);
        console.log(isDarkMode)
    },[])


    const toExit=()=>{
        // console.log(1);
        AsyncStorage.removeItem('uid').then(()=>Actions.pop())
    }

    const forwardTiming = (fordate) =>{
        var forward = new Date(fordate);
        var now = new Date();
        var year = now.getFullYear()
        var month = now.getMonth()+1
        var day = now.getDate()+1  
        now = new Date(year+'/'+month+'/'+day)
        console.log(now);
        var diff = (now.getTime() - forward.getTime())/1000/60/60/24;
        setDiffDate(diff)
    }

    return (
        <View style={{ backgroundColor: isDarkMode ? 'black' : 'white',height:'100%'}}>
            <Icon name='left' size={24}  style={{marginBottom:80,marginTop:10,marginLeft:10}} onPress={()=>Actions.pop()}></Icon>
            <View style={stylesBlack.siderTitle}>
                <Image source={{uri: 'https://www.hbsdduckhouse.club/'+datas.headimg}} style={stylesBlack.siderAvatar}/>
                <Text style={stylesBlack.siderName}>{datas.uname}</Text>
                <Text style={stylesBlack.siderEmail}>{datas.uemail}</Text>
            </View>
            <View style={stylesBlack.siderTabs}>
                <View style={stylesBlack.siderTabItem}>
                    <Image source={require('../assets/personx.png')} style={stylesBlack.siderTabsIcon}/>
                    <Text onPress={()=>Actions.my()} style={stylesBlack.siderTabsText}>主页</Text>
                </View>
                <View style={stylesBlack.siderTabItem}>
                    <Image source={require('../assets/infor.png')} style={stylesBlack.siderTabsIcon}/>
                    <Text  onPress={()=>Actions.msg()} style={stylesBlack.siderTabsText}>消息</Text>
                </View>
                <View style={stylesBlack.siderTabItem}>
                    <Image source={require('../assets/lingdang_2f.png')} style={stylesBlack.siderTabsIcon}/>
                    <Text onPress={()=>Actions.home()} style={stylesBlack.siderTabsText}>发现</Text>
                </View>
                <View style={stylesBlack.siderTabItem}>
                    <Image source={require('../assets/shezhi.png')} style={stylesBlack.siderTabsIcon}/>
                    <Text style={stylesBlack.siderTabsText}>设置</Text>
                </View>
                <View style={stylesBlack.siderTabItem}>
                    <Text style={stylesBlack.siderTabsText}>你已经来到有纪{diffDate}天了！</Text>
                </View>
            </View>
            <TouchableOpacity style={{width:'100%',alignItems:'center',position:'absolute',bottom:30}} onPress={()=>toExit()}>
                <Text style={{fontSize:18,color:'#4B4B4B',opacity:0.8}}>
                    退出登录
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Sider

const dynamicStyles = new DynamicStyleSheet({
    container: {
        backgroundColor: new DynamicValue('white', 'black')
    },
    siderTitle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    siderAvatar:{
        width: 80,
        height: 80,
        marginTop: 10,
        borderRadius:40 ,
    },
    siderName: {
        color: new DynamicValue('black', 'white'),
        fontSize: 18,
        marginTop: 10
    },
    siderEmail: {
        color: new DynamicValue('#909399', 'white'),
        marginTop: 5
    },
    siderTabs: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    siderTabItem: {
        display:'flex',
        flexDirection: 'row',
        marginTop: 25
    },
    siderTabsIcon: {
        width: 20,
        height: 20
    },
    siderTabsText: {
        color: new DynamicValue('black', 'white'),
        fontSize: 16,
        marginLeft: 10
    }
});