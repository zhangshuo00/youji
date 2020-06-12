import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, Image,AsyncStorage,Dimensions,TouchableOpacity } from 'react-native'
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'
import {Actions} from 'react-native-router-flux';
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'

const {width} = Dimensions.get('window');
const SaveList= () => {
    let [datas,setdatas] = useState([
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'2019-11-28',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'},
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'},
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'}
    ]);
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    useEffect(()=>{
        AsyncStorage.getItem('uid').then((res)=>{
            const post = {uid:res};
            fetch('http://majia.hbsdduckhouse.club/me',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                data = data[1];
                for(var a=0;a<data.length;a++){
                    data[a].headimg = 'https://www.hbsdduckhouse.club/'+data[a].headimg;
                    if(!data[a].favorites){
                        data[a].favorites = 0
                    }
                    if(!data[a].likes){
                        data[a].likes = 0
                    }
                }
                console.log(data);
                setdatas(data);
            })
        })
    },[])

    return (
        <View style={stylesBlack.card}>
        {
            datas.map(card=>
                <View style={stylesBlack.cardItem}>
                    <TouchableOpacity onPress={()=>Actions.person({ruid:card.uid})}>
                        {/* <Card.Header
                            title={card.uname}
                            thumb={card.headimg}
                            thumbStyle={{width: 30,height: 30,borderRadius:15}}
                        /> */}
                        <View style={stylesBlack.cardHead}>
                            <Image style={stylesBlack.cardHeadImg} source={{uri: card.headimg}}/>
                            <Text style={stylesBlack.cardHeadName}>{card.uname}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.otherSionple({chid:card.chid})}>
                        <View style={stylesBlack.cardBody}>
                            <Text style={{position:'relative',bottom:30,left:width*0.8}}>{card.chdate}</Text>
                            <Text style={{marginLeft: 30,marginTop:-20,color:isDarkMode?'white':'black'}}>{card.context}</Text>
                            <View style={stylesBlack.cardContext}>
                                <Image source={{uri: 'https://www.hbsdduckhouse.club/'+card.ch_headimg}} style={stylesBlack.cardContextImg}/>
                                <Image source={{uri: 'https://www.hbsdduckhouse.club/'+card.ch_headimg}} style={stylesBlack.cardContextImg}/>
                            </View>
                        </View>
                        {/* <Card.Body>
                            <Text style={{position:'relative',bottom:30,left:width*0.8}}>{card.chdate}</Text>
                            <Text style={{marginLeft: 30,marginTop:-20}}>{card.context}</Text>
                            <View style={stylesBlack.cardContext}>
                                <Image source={{uri: 'https://www.hbsdduckhouse.club/'+card.ch_headimg}} style={stylesBlack.cardContextImg}/>
                                <Image source={{uri: 'https://www.hbsdduckhouse.club/'+card.ch_headimg}} style={stylesBlack.cardContextImg}/>
                            </View>
                        </Card.Body> */}
                    </TouchableOpacity>
                    <View style={stylesBlack.cardFooter}>
                        <View style={{display: 'flex',flexDirection: 'row',marginTop: 15}}>
                            <Image source={{uri: 'http://qinius.acrosstheuniverse.top/images/like1.png'}} style={stylesBlack.cardBottomImage}/>
                            <Text style={{color:isDarkMode?'white':'black'}}>  {card.favorites}</Text>
                            <Image source={{uri: 'http://qinius.acrosstheuniverse.top/images/exe-collection1.png'}} style={stylesBlack.cardBottomImage}/>
                            <Text style={{color:isDarkMode?'white':'black'}}>  {card.likes}</Text>
                        </View>
                    </View>
                    {/* <Card.Footer
                        content={
                            <View style={{display: 'flex',flexDirection: 'row',marginTop: 15}}>
                                <Image source={{uri: 'http://qinius.acrosstheuniverse.top/images/like1.png'}} style={stylesBlack.cardBottomImage}/>
                                <Text>  {card.favorites}</Text>
                                <Image source={{uri: 'http://qinius.acrosstheuniverse.top/images/exe-collection1.png'}} style={stylesBlack.cardBottomImage}/>
                                <Text>  {card.likes}</Text>
                            </View>
                        }
                    /> */}
                </View>
            )
        }
        </View>
    )
}

export default SaveList

const dynamicStyles = new DynamicStyleSheet({
    card: {
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
    },
    cardItem: {
        width: '100%',
        display: 'flex',
        backgroundColor: new DynamicValue('white','black'),
        marginBottom: 10
    },
    cardHead: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardHeadImg: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 10
    },
    cardHeadName: {
        marginLeft: 15,
        color: new DynamicValue('black','white')
    },
    cardBody: {
        marginTop: 10,
        color: new DynamicValue('black','white')
    },
    cardFooter: {
        marginTop: 10
    }
})