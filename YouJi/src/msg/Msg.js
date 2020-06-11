import React, {useState,useEffect} from 'react';
import { Text, View,ScrollView,StyleSheet,Dimensions,TouchableOpacity,AsyncStorage,Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'
import { ThemeProvider } from '@ant-design/react-native/lib/style';

const {width} = Dimensions.get('window');

const Msg =(porps)=>{

    let [data,setdata] = useState([
        {img_path:require('../images/sort-test1.jpg'),other:'有纪团队',con_id:'001',time:'12:21',last:'你好'},           
        {img_path:require('../images/sort-test2.jpg'),other:'tangtang',con_id:'002',time:'5:06',last:'hello world'},
    ]);
    let [uid, setUid] = useState('');
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    const getUid = async()=>{
        setUid(await AsyncStorage.getItem('uid'));
    }
    useEffect(()=>{
        getUid();
        let post ={
            uid: uid
        };
        setTimeout(() => {
            fetch('http://majia.hbsdduckhouse.club/getMsgList',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data);
                for(var a=0;a<data.length;a++){
                    if(! data[a].headimg){
                        data[a].headimg = 'images/zhangsan.jpg'
                    }
                    data[a].sm_date=data[a].sm_date.slice(11,16);
                    // console.log(data[a].sm_date)
                    let c = data[a].sm_date.slice(0,2)*1;
                    // console.log(c);
                    let b = data[a].sm_date.slice(2,5);
                    if(c<16){
                        c=c+8;
                        data[a].sm_date=c+b;
                    }else if(c>16 || c==16){
                        c=c-16;
                        data[a].sm_date=c+b;
                    }
                    if(data[a].context.length>10){
                        data[a].context=data[a].context.slice(0,9)+'...';
                        // console.log(data[a].context.length)
                    }
                }
                // console.log(data);
                setdata(data);
                // 根据返回的消息，渲染响应的页面
            })
        }, 200);
    })

    const head=()=>{
        Actions.sider();
    }

    return (
        <ScrollView style={{width:width,height:'100%',backgroundColor:isDarkMode?'black':'white'}}>
            <View style={{flexDirection:'row',backgroundColor:isDarkMode?'black':'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                <TouchableOpacity style={stylesBlack.headIcon} onPress={()=>head()}><Icon name='bars' color={'white'} size={28}></Icon></TouchableOpacity>
                <Text style={stylesBlack.headText}>消息列表</Text>
            </View>
            {/* <Image style={{width:width,height:50}} source={{uri:'https://www.hbsdduckhouse.club/' + this.state.pic}}/> */}
            <View style={stylesBlack.msgList}>
            {
                
                data.map((tag,idx)=>(
                <TouchableOpacity key={idx} style={stylesBlack.msgLi} onPress={() =>  Actions.msgDetails({rname:tag.uname,ruid:tag.uid,isDark:isDarkMode})}>
                    {/* <View className="msg-img" style={{background:"url(" + require("../" +tag.headimg) + ")"}}></View> */}
                    <Image source={{uri:'https://www.hbsdduckhouse.club/' + tag.headimg}} 
                        style={stylesBlack.msgImg} ></Image>
                    <View style={stylesBlack.msgBox}>
                        <Text style={stylesBlack.msgText}>{tag.uname}</Text>
                        <Text style={stylesBlack.msgTime}>{tag.sm_date}</Text>  
                        <Text style={stylesBlack.msgLast}>{tag.context}</Text>      
                    </View>   
                </TouchableOpacity>))
            }
            </View>
        </ScrollView>
    )
}

export default Msg

const dynamicStyles = new DynamicStyleSheet({
    headText:{
        marginRight:width*0.22,
        width:width*0.56,
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
        height: '100%',
        backgroundColor: new DynamicValue('white','black')
    },
    msgLi:{
        backgroundColor: new DynamicValue('#fff','black'),
        width:width,
        marginBottom:1,
        height:66,
        // justifyContent:'center',
        // alignItems:'center',
        flexDirection:'row',
        // flexWrap:'wrap',
    },
    // msgLi:hover{
    //     background-color: #f8f8f8;
    // },
    msgImg:{
        marginTop: 10,
        height: 46,
        width: 46,
        borderRadius: 23,
        marginLeft: width*0.05,
        resizeMode:'cover'
    },
    msgBox:{
        marginTop: 5,
        flexDirection:'row',
        flexWrap:'wrap',
    },
    msgText:{
        fontSize: 20,
        marginLeft: width*0.05,
        width: width*0.68,
        color: new DynamicValue('black','white')
    },
    msgLast:{
        fontSize: 16,
        marginTop: 5,
        marginLeft: width*0.05,
        color: '#928f8f',
        width: width*0.5
    },
    msgTime:{
        fontSize: 14,
        marginTop: 5,
        color: '#bbb6b6'
        /* width: 50%; */
    },
})