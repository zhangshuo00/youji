import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity,Image,Dimensions } from 'react-native'
import { Card } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');

const Search = () => {
    let [datas,setdatas] = useState([]);
    const [history, setHistory] = useState(['安安']);
    const [display,setDisplay] = useState(true);
    useEffect(() => {
        // console.log(history)
    })

    var texthandle=(event)=>{
        setHistory([...history,event.nativeEvent.text])
        // console.log(event.nativeEvent.text);
        const post ={
            keywords:event.nativeEvent.text
        }
        setDisplay(false)
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
                data[a].ch_headimg = 'https://zhangshuo00.github.io/youji/YouJi/src/'+data[a].ch_headimg;
                if(!data[a].favorites){
                    data[a].favorites = 0
                }
                if(!data[a].likes){
                    data[a].likes = 0
                }
            }
            console.log(data);
            setdatas(data);
            // 根据返回的消息，渲染响应的页面
        })
    }
    if(display){
        return(
            <View>
                <View style={styles.head}>
                    <TextInput 
                        placeholder="请输入您要搜索的关键字"
                        style={styles.search} 
                        autoFocus={true}
                        onSubmitEditing={(event)=>{texthandle(event)}}
                    />
                    <Icon size={24} style={{position:'absolute',right:45,top:12}} name="search1"/>
                </View>
                <Text style={{fontSize:16,marginLeft:20,marginTop:10}}>搜索历史</Text>
                <View style={styles.history}>
                    <TouchableOpacity style={styles.historyBtn}>
                        <Button color='#909399' title="美食"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.historyBtn}>
                        <Button color='#909399' title="旅行"/>
                    </TouchableOpacity>
                    {
                        history.map((item)=>(
                            <TouchableOpacity style={styles.historyBtn}>
                                <Button color='#909399' title={item}/>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }
    else{
        return(
            <View>
                <View style={styles.head}>
                            <TextInput 
                                placeholder="请输入您要搜索的关键字"
                                style={styles.search} 
                                autoFocus={true}
                                onSubmitEditing={(event)=>{texthandle(event)}}
                            />
                            <Icon size={24} style={{position:'absolute',right:45,top:12}} name="search1"/>
                        </View>
                <View style={styles.card}>
                {
                    datas.map(card=>
                        <Card>
                            {/* <Card.Header
                                title={card.uname}
                                thumb={card.ch_headimg}
                                thumbStyle={{width: 30,height: 30,borderRadius:15}}
                            /> */}
                            <Card.Body>
                                <View style={{width:width,flexDirection:'row',alignItems:'center',marginBottom:10}}>
                                    <Image style={{width:width*0.3,marginLeft:10,width: 30,height: 30,borderRadius:15}} source={{uri:card.ch_headimg}}></Image>
                                    <Text style={{width:width*0.5,marginLeft: 10,fontSize:28}}>{card.title}</Text>
                                </View>
                                <Text style={{marginLeft: 30}}>{card.context}</Text>
                                <Text style={{position:'relative',left:width*0.8,bottom:10}}>{card.chdate}</Text>
                            </Card.Body>
                            <Card.Footer
                                content={
                                    <View style={{display: 'flex',flexDirection: 'row',marginTop: -18}}>
                                        <Image source={{uri: 'https://i.loli.net/2020/04/13/cWKiSzxOIo8fhtv.png'}} style={styles.cardBottomImage}/>
                                        <Text>  {card.favorites}</Text>
                                        <Image source={{uri: 'https://i.loli.net/2020/04/13/kbr2KtWGMfvl51E.png'}} style={styles.cardBottomImage}/>
                                        <Text>  {card.likes}</Text>
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

const styles = StyleSheet.create({
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
        backgroundColor:'rgb(250, 167, 85)'
    },
    history: {
        display:'flex',
        flexDirection:'row'
    },
    historyBtn: {
        width: 50,
        marginLeft:20,
        marginTop:10
    },
    card: {
        paddingTop: 3,
        margin:0
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