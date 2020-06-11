import React, { Component, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button,Alert, TouchableOpacity,Image,Dimensions,AsyncStorage, ScrollView } from 'react-native'
import { Card,Tag } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'

const {width} = Dimensions.get('window');

const Search = (props)=> {
    let [datas, setDatas] = useState([]);
    let [history, setHistory] = useState(['无']);
    let [value, setValue] = useState('');
    let [uid, setUid] = useState('');
    let [display, setDisplay] = useState(true);
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    const getUid = async ()=>{
        setUid(await AsyncStorage.getItem('uid'));
    }
    useEffect(() => {
        getUid();
        let post = {
            uid: uid
        };
        setTimeout(() => {
            fetch('http://majia.hbsdduckhouse.club/getSearchHistory',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                // console.log(data.keyword);
                setHistory(data.keyword)
            })
        }, 300);
    })

    const texthandle = (event)=>{
        // setHistory([...history,event.nativeEvent.text])
        // setValue(event.nativeEvent.text);
        setValue(event.nativeEvent.text);
        setDisplay(false);

        // console.log(value)

         //添加搜索记录
         //检测搜索记录是否重复
         for(var i=0,a=0;i<history.length;i++){
             if(value == history[i]){
                 console.log('已进行过相关搜索');
                 a++;
             }
             if(i==history.length-1 && a==0){
                let posts ={
                    uid: uid,
                    keyword: value
                }
                setTimeout(() => {
                    fetch('http://majia.hbsdduckhouse.club/addSearchHistory',{
                        method:'POST',
                        // mode:'cors',
                        headers: {'Content-Type': 'application/json'},
                        body:JSON.stringify(posts)
                    })
                    .then(res=>res.json())
                    .then(data=>{
                        console.log(data);
                    })  
                }, 300);      
             }
         }
        
        let post ={
            keywords: value
        }
        // setDisplay(false)
        console.log(post);
        fetch('http://majia.hbsdduckhouse.club/discoverSearch',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            for(var a=0;a<data.length;a++){
                data[a].ch_headimg = 'https://www.hbsdduckhouse.club/'+data[a].ch_headimg;
                if(!data[a].favorites){
                    data[a].favorites = 0
                }
                if(!data[a].likes){
                    data[a].likes = 0
                }
            }
            console.log(data);
            // setdatas(data);
            if(data != []){
                setDatas(data);
            }
            else{
                setDatas(false)
            }
            // 根据返回的消息，渲染响应的页面
        })
    }

    const searchAgain = (item)=>{
        setDisplay(false);

        let post ={
            keywords: item
        }
        // console.log(post);
        setTimeout(() => {
            fetch('http://majia.hbsdduckhouse.club/discoverSearch',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                for(var a=0;a<data.length;a++){
                    data[a].ch_headimg = 'https://www.hbsdduckhouse.club/'+data[a].ch_headimg;
                    if(!data[a].favorites){
                        data[a].favorites = 0
                    }
                    if(!data[a].likes){
                        data[a].likes = 0
                    }
                }
                setDatas(data);
        })
        }, 300);        
    }

    const delSearchHistory = (item)=>{
        Alert.alert('提示',
        '是否删除该搜索历史?', 
        [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () =>{
                delHistory(item)
            }},
        ])
    }
    const delHistory = (item)=>{
        // console.log(item);
        setValue(item);
        let post ={
            uid: uid,
            keyword: value
        }
        // setDisplay(false)
        console.log(post);
        setTimeout(() => {
            fetch('http://majia.hbsdduckhouse.club/delSearchHistory',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
        }, 200);
    }

        if(display){
            return(
                <ScrollView style={{backgroundColor:isDarkMode?'black':'white',height:'100%'}}>
                    <View style={stylesBlack.head}>
                        <TextInput 
                            placeholder="请输入您要搜索的关键字"
                            style={stylesBlack.search} 
                            autoFocus={true}
                            onSubmitEditing={(event)=>{texthandle(event)}}
                        />
                        <Icon size={24} style={{position:'absolute',right:45,top:12}} name="search1"/>
                    </View>
                    <Text style={{fontSize:16,marginLeft:20,marginTop:10}}>搜索历史</Text>
                    <View style={stylesBlack.history}>
                        {
                            history.map((item)=>(
                                <TouchableOpacity style={stylesBlack.historyBtn}>
                                    <TouchableOpacity  onPress={()=>{searchAgain(item)}}><Text style={{margin:0,color:'white'}}>{item} </Text></TouchableOpacity>
                                    <Icon name='close' color={'white'} size={10} style={{marginTop:-2}}  onPress={()=>{delSearchHistory(item)}}></Icon>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ScrollView>
            )
        }
        else{
            return(
                <View style={{backgroundColor:isDarkMode?'black':'white'}}>
                    <View style={stylesBlack.head}>
                                <TextInput 
                                    placeholder="请输入您要搜索的关键字"
                                    style={stylesBlack.search} 
                                    autoFocus={true}
                                    onSubmitEditing={(event)=>{texthandle(event)}}
                                />
                                <Icon size={24} style={{position:'absolute',right:45,top:12}} name="search1"/>
                            </View>
                    <View style={stylesBlack.card}>
                    {
                        datas == false ?
                        (<View style={{width:width,height:'100%',justifyContent:'center', flexDirection:'row',flexWrap:'wrap',backgroundColor:isDarkMode?'black':'white'}}> 
                            <Text style={{fontSize:20,marginTop:50,color:isDarkMode?'white':'black'}}>未查询到相关内容</Text> 
                        </View>)
                        :
                        datas.map(card=>
                            <Card style={{backgroundColor:isDarkMode?'black':'white'}}>
                                {/* <Card.Header
                                    title={card.uname}
                                    thumb={card.ch_headimg}
                                    thumbStyle={{width: 30,height: 30,borderRadius:15}}
                                /> */}
                                <Card.Body style={{backgroundColor:isDarkMode?'black':'white'}}>
                                    <View style={{width:width,flexDirection:'row',alignItems:'center',marginBottom:10}}>
                                        <Image style={{width:width*0.3,marginLeft:10,width: 30,height: 30,borderRadius:15}} source={{uri:card.ch_headimg}}></Image>
                                        <Text style={{width:width*0.5,marginLeft: 10,fontSize:18,color:isDarkMode?'white':'black'}}>{card.title}</Text>
                                    </View>
                                    <Text style={{marginLeft: 30,color:isDarkMode?'white':'black',marginBottom: 20}}>{card.context}</Text>
                                    {/* <Text style={{position:'relative',left:width*0.8,bottom:10}}>{card.chdate}</Text> */}
                                </Card.Body>
                                <Card.Footer
                                    content={
                                        <View style={{display: 'flex',flexDirection: 'row',marginTop: -18}}>
                                            <Image source={{uri: 'https://i.loli.net/2020/04/13/cWKiSzxOIo8fhtv.png'}} style={stylesBlack.cardBottomImage}/>
                                            <Text style={{color:isDarkMode?'white':'black'}}>  {card.favorites}</Text>
                                            <Image source={{uri: 'https://i.loli.net/2020/04/13/kbr2KtWGMfvl51E.png'}} style={stylesBlack.cardBottomImage}/>
                                            <Text style={{color:isDarkMode?'white':'black'}}>  {card.likes}</Text>
                                        </View>
                                    }
                                />
                            </Card>
                        )
                    }
                    </View>
                </View>
            )
        }
}
export default Search

const dynamicStyles = new DynamicStyleSheet({
    search: {
        width:'85%',
        height:40,
        marginTop:5,
        backgroundColor:'#eeeeee',
        borderRadius:10,
    },
    head: {
        height:50,
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor: new DynamicValue('rgb(250, 167, 85)','black')
    },
    history: {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    historyBtn: {
        display:'flex',
        flexDirection:'row',
        paddingBottom:5,
        paddingTop:5,
        minWidth: 20,
        marginLeft:20,
        marginTop:10,
        backgroundColor:'#909399',
        paddingLeft:5,
        paddingRight:3,
        borderRadius:5,
        marginRight:0
    },
    card: {
        paddingTop: 3,
        margin:0,
        backgroundColor: new DynamicValue('white','black')
    },
    cardTitle: {

    },
    cardContext: {
        display:'flex',
        height: 100,
        flexDirection: 'row',
        marginLeft: 30
    },
    cardContextImg: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginRight: 10
    },
    cardBottomImage: {
        width: 20,
        height: 20,
        marginLeft: 20
    }
})