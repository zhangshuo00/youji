import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

const Sider = () => {
    
    return (
        <>
        <View style={styles.siderTitle}>
            <Image source={require('../assets/ali_dingding.png')} style={styles.siderAvatar}/>
            <Text style={styles.siderName}>有纪</Text>
            <Text style={styles.siderEmail}>zhangsan@qq.com</Text>
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
        </>
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