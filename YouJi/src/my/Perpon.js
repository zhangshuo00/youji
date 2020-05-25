import React, { Component, useEffect, useState } from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Image,AsyncStorage,Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { TabBar } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from 'react-native-button';
const {width} = Dimensions.get('window');

export default class Perpon extends Component {
    constructor(props){
        super();
        this.state={
            data:
                {
                    uname: "李四", 
                    headimg: "images/lisi.jpg", 
                    signature: "著名演员李四", 
                    isCol: 1
                }
            ,
        }
    }

    async componentDidMount(){
        const post ={
            uid: await AsyncStorage.getItem('uid').then(res=>res),
            // ruid:window.location.hash.split('=')[1]
            ruid:await AsyncStorage.getItem('uid').then(res=>res),
        }
        console.log(post)
        fetch('http://majia.hbsdduckhouse.club/personal',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data:data[0]})
        })
    }

    async newletter(){
        const uid=await AsyncStorage.getItem('uid').then(res=>res);
        const ruid=await AsyncStorage.getItem('uid').then(res=>res);
        if(uid !== ruid){
            // window.location='./index.html#/letter/'+ruid;
        }
    }

    async followUser(){
        const post ={
            uid: await AsyncStorage.getItem('uid').then(res=>res),
            ruid:await AsyncStorage.getItem('uid').then(res=>res),
        }
        console.log(post)
        fetch('http://majia.hbsdduckhouse.club/followUser',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.componentDidMount();
            // 根据返回的消息，渲染响应的页面
        })
    }

    async cancelFollow(){
        const post ={
            uid: await AsyncStorage.getItem('uid').then(res=>res),
            ruid:await AsyncStorage.getItem('uid').then(res=>res),
        }
        console.log(post)
        fetch('http://majia.hbsdduckhouse.club/cancelFollowUser',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.componentDidMount();
            // 根据返回的消息，渲染响应的页面
        })
    }

    render(){
        return (
            <View style={{backgroundColor:'white',height:'100%'}}>
                    <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10,paddingLeft:10}}>
                        <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={22}></Icon></TouchableOpacity>
                        <Text style={styles.per_headText}>个人信息</Text>
                    </View>
                    <View style={{height:200}}>
                        <Image source={require("../images/topimg.jpg")} style={styles.per_pic}/>
                    </View>
                    <View style={styles.per_infor}>
                        <View  style={styles.per_infor_l}>
                            <Image style={styles.per_headimg} source={require('../images/pic1.jpg')}/>
                        </View>
                        <View  style={styles.per_infor_r}>
                            <Text  style={{fontSize:24}}>{this.state.data.uname}</Text>
                        </View>
                        <View style={styles.per_infor_tex}>
                            <Text  style={{fontSize:20}}>{this.state.data.signature?this.state.data.signature:'这个人很懒，啥都没写'}</Text>
                        </View>
                        
                    </View>
                    <View style={styles.per_btw}>
                        {/* <Button style={styles.per_btw_l}>关注</Button> */}
                        {
                            this.state.data.isCol == 1 ?
                            <Button style={styles.per_btw_l} onPress={()=>this.cancelFollow()}>已关注</Button>  
                            :<Button style={styles.per_btw_ll} onPress={()=>this.followUser()}>关注</Button>
                        }
                        <Button style={styles.per_btw_r} onPress={()=>this.newletter()}>私信</Button>
                    </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    per_headText:{
        flex:1,
        fontSize:20,
        textAlign:'center',
        color:'white',
        paddingRight:'5%'
    },
    per_pic:{
        width:'100%',
        height:'100%',
        resizeMode:'stretch',
        overflow: 'hidden'
    },
    per_infor:{
        flex:1,
        flexDirection: 'row',
        flexWrap:'wrap',
        marginTop:10
    },
    per_infor_l:{
        paddingTop:5,
    },
    per_infor_r:{
        marginLeft:width*0.1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'green',
    },
    per_headimg:{
        borderRadius:55,
        width:70,
        height:70,
        marginLeft:40
    },

    per_infor_tex:{
        width:600,
        justifyContent: 'center',
        paddingLeft:45,
        marginTop:35,
        // backgroundColor:'blue'
    },
    per_btw:{
        position:'absolute',
        bottom:20,
        width:"100%",
        flexDirection:'row'
    },
    per_btw_l:{
        marginLeft:width*0.05,
        width:width*0.4,
        backgroundColor:"#faa755",
        height:40,
        color:'white',
        borderRadius:20,
        paddingTop:8
    },
    per_btw_ll:{
        marginLeft:width*0.05,
        width:width*0.4,
        backgroundColor:"grey",
        height:40,
        color:'white',
        borderRadius:20,
        paddingTop:8
    },
    per_btw_r:{
        marginLeft:width*0.075,
        width:width*0.4,
        backgroundColor:"grey",
        height:40,
        color:'white',
        borderRadius:20,
        paddingTop:8,
        opacity:0.8
    },
})