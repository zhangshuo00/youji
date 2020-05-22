import React, { Component, useEffect, useState } from 'react';
import {View, Text, Button,TouchableOpacity,StyleSheet,Image,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { TabBar } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';

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
            ruid:this.props.ruid
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
                data:data})
        })
    }

    async newletter(){
        // const ruid=window.location.hash.split('=')[1];
        const ruid=this.props.ruid;
        if(AsyncStorage.uid !== ruid){
            // window.location='./index.html#/letter/'+ruid;
        }
    }

    async followUser(){
        const post ={
            uid: await AsyncStorage.getItem('uid').then(res=>res),
            ruid:this.props.ruid
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
            window.location.reload();
            // 根据返回的消息，渲染响应的页面
        })
    }

    async cancelFollow(){
        const post ={
            uid: await AsyncStorage.getItem('uid').then(res=>res),
            ruid:this.props.ruid
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
            // window.location.reload();
            // 根据返回的消息，渲染响应的页面
        })
    }

    render(){
        return (
            <View style={styles.per}>
                    <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                        <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                        <Text style={styles.per_headText}>个人信息</Text>
                    </View>
                    <View style={{height:300}}>
                        <Image source={require("../images/topimg.jpg")} style={styles.per_pic}/>
                    </View>
                    <View style={styles.per_infor}>
                        <View  style={styles.per_infor_l}>
                            <Image style={styles.per_headimg} source={require('../images/pic1.jpg')}/>
                        </View>
                        <View  style={styles.per_infor_r}>
                            <Text  style={{fontSize:18}}>{this.state.data.uname}</Text>
                            {/* <Text style={{fontSize:18}}>李四</Text> */}
                        </View>
                        <View style={styles.per_infor_tex}>
                            <Text>{this.state.data.signature?this.state.data.signature:'这个人很懒，啥都没写'}</Text>
                        </View>
                        
                    </View>
                    <View style={styles.per_btw}>
                        <View style={styles.per_btw_l}>
                            <Button title="关注" color="#faa755"/>
                        </View>
                        <View style={styles.per_btw_r}>
                            <Button title="私信" color="#faa755" onPress={()=>Actions.msgDetails()}/>
                        </View>
                    </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    per_headText:{
        flex:1,
        marginTop:20,
        textAlign:'center',
        color:'white',
    },
    per_pic:{
        width:'100%',
        height:'65%',
        resizeMode:'stretch',
        overflow: 'hidden'
    },
    per_infor:{
        flex:1,
        flexDirection: 'row',
        flexWrap:'wrap',
        marginTop:'-10%'
    },
    per_infor_l:{
        width:220,
        paddingTop:5,
        // backgroundColor:'red',
    },
    per_infor_r:{
        width:60,
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
        marginTop:'65%',
        width:500,
        paddingLeft:'10%',
        paddingRight:'10%',
        // backgroundColor:'black',
    },
    per_btw_l:{
        position:'absolute',
        left:'10%',
        width:'45%',
        // backgroundColor:'black',
    },
    per_btw_r:{
        position:'absolute',
        left:'65%',
        width:'45%',
        // backgroundColor:'black',
    },
})