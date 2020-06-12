import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, Image,AsyncStorage,Dimensions,TouchableOpacity } from 'react-native'
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'
import {Actions} from 'react-native-router-flux';

const {width} = Dimensions.get('window');
const SaveList= () => {
    let [datas,setdatas] = useState([
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'2019-11-28',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'},
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'},
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'}
    ]);

    useEffect(()=>{
        AsyncStorage.getItem('uid').then((res)=>{
            const post = {uid:res};
            fetch('http://majia.hbsdduckhouse.club/getFollowUser',{
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                for(var a=0;a<data.length;a++){
                    data[a].headimg = 'https://www.hbsdduckhouse.club/'+data[a].headimg;
                    for(var b=0;b<2;b++){
                        if(! data[a].img_path[b]){
                            data[a].img_path[b] = 'images/sort-test1.jpg'
                        }
                    }
                    if(!data[a].favorites){
                        data[a].favorites = 0
                    }
                    if(!data[a].likes){
                        data[a].likes = 0
                    }
                }
                // console.log(data,1);
                setdatas(data);
            })
        })
    })

    return (
        <View style={styles.card}>
        {
            datas.map(card=>
                <Card>
                    <TouchableOpacity onPress={()=>Actions.person({ruid:card.uid})}>
                        <Card.Header
                            title={card.uname}
                            thumb={card.headimg}
                            thumbStyle={{width: 30,height: 30,borderRadius:15}}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>Actions.otherSionple({chid:card.chid})}>
                        <Card.Body>
                            <Text style={{position:'relative',bottom:30,left:width*0.8}}>{card.chdate}</Text>
                            <Text style={{marginLeft: 30,marginTop:-20}}>{card.context}</Text>
                            <View style={styles.cardContext}>
                                <Image source={{uri: 'https://www.hbsdduckhouse.club/'+card.img_path[0]}} style={styles.cardContextImg}/>
                                <Image source={{uri: 'https://www.hbsdduckhouse.club/'+card.img_path[1]}} style={styles.cardContextImg}/>
                            </View>
                        </Card.Body>
                    </TouchableOpacity>
                    <Card.Footer
                        content={
                            <View style={{display: 'flex',flexDirection: 'row',marginTop: 15}}>
                                <Image source={{uri: 'http://qinius.acrosstheuniverse.top/images/like1.png'}} style={styles.cardBottomImage}/>
                                <Text>  {card.favorites}</Text>
                                <Image source={{uri: 'http://qinius.acrosstheuniverse.top/images/exe-collection1.png'}} style={styles.cardBottomImage}/>
                                <Text>  {card.likes}</Text>
                            </View>
                        }
                    />
                </Card>
            )
        }
        </View>
    )
}

export default SaveList

const styles = StyleSheet.create({
    card: {
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