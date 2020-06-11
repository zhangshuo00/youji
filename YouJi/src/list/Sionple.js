import React, { Component, useState, useEffect } from 'react'
import { Text,TouchableOpacity, View,StyleSheet, Image,AsyncStorage,Dimensions,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'

const {width,scale} = Dimensions.get('window');
const s = width / 640;
console.disableYellowBox = true; //取消显示黄框

const Sionple = (props)=> {
    let [data, setData] = useState([]);
    let [uid, setUid] = useState('');
    let [chid, setChid] = useState('');
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    const Clickfavorites=()=>{
        if(data[0].isCollection==0){
            var c =data;
            c[0].isCollection = 1;
            c[0].favorites+=1;
            setData(c)

            let post={
                uid:uid,
                chid:chid
            }
            console.log(post)
            fetch('http://majia.hbsdduckhouse.club/addFavorites',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
        }else if(data[0].isCollection==1){
            var d =data;
            d[0].isCollection = 0;
            d[0].favorites-=1;
            setData(d)

            let post={
                uid:uid,
                chid:chid
            }
            console.log(post);
            fetch('http://majia.hbsdduckhouse.club/cancelCollection',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
            })
        }
    }

    const Clicklike =()=>{
        if(data[0].isLike==0){
            var b =data;
            b[0].isLike = 1;
            b[0].likes += 1;
            setData(b)

            let post={
                uid:uid,
                chid:chid
            }
            console.log(post)
            fetch('http://majia.hbsdduckhouse.club/addLike',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                Actions.refresh()
            })
        }else if(data[0].isLike==1){
            var a =data;
            a[0].isLike = 0;
            a[0].likes -= 1;
            setData(a);

            const post={
                uid:uid,
                chid:chid
            }
            console.log(post);
            fetch('http://majia.hbsdduckhouse.club/cancelLike',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
            })
        }
    }

    useEffect(() => {
        let post = {
            uid: props.uid,
            chid: props.chids
        }
        setUid(props.uid)
        setChid(props.chids);
        setTimeout(() => {
            fetch('http://majia.hbsdduckhouse.club/sionple',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                setData(data)
            })
        }, 300);
    });

    return (
            <View flexDirection='column' justifyContent='space-between'>
            <ScrollView style={{height:'93%'}}>
                 <View style={{flexDirection:'row',backgroundColor:isDarkMode?'black':'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={stylesBlack.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                    <Text style={stylesBlack.headText}>笔记内容</Text>
                </View>
                <View>
                    {
                        data.map((item)=>(
                            <View style={{backgroundColor:isDarkMode?'black':'white'}}>
                            <View>
                            <Image style={{height:300*s,width:'100%'}} source={{uri:'https://www.hbsdduckhouse.club/' + item.ch_headimg}}/>
                            </View>
                            <View style={{marginLeft:"10%",marginRight:"10%",flexDirection:'row'}}>
                                <Text style={{marginTop:40*s,fontSize:30*s,color:isDarkMode?'white':'black'}}>{item.tags}</Text>
                                <Text style={{marginLeft:"65%",marginTop:40*s,fontSize:30*s,marginBottom:20*s,color:isDarkMode?'white':'#969696'}}>By</Text>
                                <Text style={{marginLeft:"2%",marginTop:50*s,fontSize:20*s,marginBottom:20*s,color:isDarkMode?'white':'black'}}>{item.uname}</Text>
                            </View>
                            <View style={{marginLeft:"10%",marginRight:"10%",}}>
                                <Text style={{marginTop:20*s,fontSize:40*s,marginBottom:20*s,color:isDarkMode?'white':'black'}}>{item.title}</Text>
                                <Text style={{marginTop:20*s,fontSize:30*s,marginBottom:20*s,color:isDarkMode?'white':'black'}}>{item.context}</Text>
                                {
                                    item.imgPath.map(val=>(
                                        <Image style={{height:200*s,width:"100%",marginBottom:20*s}} source={{uri:'https://www.hbsdduckhouse.club/' + val.img_path}}/>
                                    ))
                                }
                            </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
            <View style={{backgroundColor:isDarkMode?'black':'#fff',width:'100%',height:'7%'}}>
                {
                    data.map((item)=>(
                        <View flexDirection='row' style={{marginTop:20*s}}>
                        <TouchableOpacity onPress={Clicklike.bind(this)}>  
                        {
                            item.isLike ==0 ? 
                                <View  style={stylesBlack.likeView}>
                                <Icon name='staro' color={'rgb(250, 167, 85)'}  size={28}/>
                                <Text style={stylesBlack.likeText}>{item.likes==null?0:item.likes}</Text>
                                </View> :
                                <View  style={stylesBlack.likeView}>
                                <Icon name='star' color={'rgb(250, 167, 85)'}  size={28}/>
                                <Text  style={stylesBlack.likeText}>{item.likes==null?1:item.likes}</Text>
                                </View>
                        }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={Clickfavorites.bind(this)}> 
                        {
                            item.isCollection==0 ?
                                <View style={stylesBlack.likeView}>
                                <Icon name='hearto' color={'rgb(250, 167, 85)'}  size={28}/>
                                <Text style={stylesBlack.likeText}>{item.favorites==null?0:item.favorites}</Text>
                                </View> :
                                <View style={stylesBlack.likeView}>
                                <Icon name='heart' color={'rgb(250, 167, 85)'}  size={28}/>
                                <Text style={stylesBlack.likeText}>{item.favorites==null?1:item.favorites}</Text>
                                </View>
                        }
                        </TouchableOpacity>
                        </View>
                    
                    ))
                }
                    
            </View>
            </View>
    )
}
export default Sionple

const dynamicStyles = new DynamicStyleSheet({
    headText:{
        marginRight:width*0.12,
        width:width*0.54,
        textAlign:'center',
        fontSize:22,
        color:new DynamicValue('black','white')
    },
    headIcon:{
        marginLeft:width*0.02,
        width:width*0.2,
    },
    msgList:{
        width: width,
    },
    likeText:{
        marginLeft:20*s,
        textAlign:'center' ,
        textAlignVertical:'center',
        color: new DynamicValue('black','white')
    },
    likeView:{
        marginLeft:50*s,
        marginRight:100*s,
        flexDirection:'row'
    }
})