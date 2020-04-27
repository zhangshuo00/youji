import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';

const Sider = () => {

    let [datas,setdatas] = useState(
        {headimg:'https://zhangshuo00.github.io/youji/YouJi/src/images/timg.jpg',uname:'未登录',uemail:'未登录'}
    );

    useEffect(()=>{
        const uid = 'k3i297def';
        const post = {uid:uid};
        // console.log(post);
        fetch('http://majia.hbsdduckhouse.club/userDetail',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            // if(data[0]){
            //     this.setState({
            //         data: {
            //             headimg:data[0].headimg,
            //             uname:data[0].uname,
            //             uemail:data[0].uemail
            //         }
            //     })
            // }
            setdatas(data[0])
        })
    })
    return (
        <View>
            <Icon name='left' size={24}  style={{marginBottom:80,marginTop:10,marginLeft:10}} onPress={()=>Actions.pop()}></Icon>
            <View style={styles.siderTitle}>
                <Image source={{uri: 'https://zhangshuo00.github.io/youji/YouJi/src/'+datas.headimg}} style={styles.siderAvatar}/>
                <Text style={styles.siderName}>{datas.uname}</Text>
                <Text style={styles.siderEmail}>{datas.uemail}</Text>
            </View>
            <View style={styles.siderTabs}>
                <View style={styles.siderTabItem}>
                    <Image source={require('../assets/personx.png')} style={styles.siderTabsIcon}/>
                    <Text onPress={()=>Actions.my()} style={styles.siderTabsText}>主页</Text>
                </View>
                <View style={styles.siderTabItem}>
                    <Image source={require('../assets/infor.png')} style={styles.siderTabsIcon}/>
                    <Text  onPress={()=>Actions.msg()} style={styles.siderTabsText}>消息</Text>
                </View>
                <View style={styles.siderTabItem}>
                    <Image source={require('../assets/lingdang_2f.png')} style={styles.siderTabsIcon}/>
                    <Text onPress={()=>Actions.home()} style={styles.siderTabsText}>发现</Text>
                </View>
                <View style={styles.siderTabItem}>
                    <Image source={require('../assets/shezhi.png')} style={styles.siderTabsIcon}/>
                    <Text style={styles.siderTabsText}>设置</Text>
                </View>
            </View>
        </View>
    )
}

export default Sider

const styles = StyleSheet.create({
    siderTitle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    siderAvatar:{
        width: 80,
        height: 80,
        marginTop: 80
    },
    siderName: {
        fontSize: 18,
        marginTop: 10
    },
    siderEmail: {
        color: '#909399',
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
        fontSize: 16,
        marginLeft: 10
    }
})