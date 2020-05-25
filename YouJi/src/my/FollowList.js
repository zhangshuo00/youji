import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, Image,AsyncStorage,Dimensions } from 'react-native'
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'

const {width} = Dimensions.get('window');
const SaveList= () => {
    let [datas,setdatas] = useState([
        // {headimg:'https://zhangshuo00.github.io/youji/YouJi/src/images/timg.jpg',uname:'有纪',chdate:'2019-11-28',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'},
        // {headimg:'https://zhangshuo00.github.io/youji/YouJi/src/images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'},
        // {headimg:'https://zhangshuo00.github.io/youji/YouJi/src/images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',ch_headimg:'images/sort-test1.jpg'}
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
                    data[a].headimg = 'https://zhangshuo00.github.io/youji/YouJi/src/'+data[a].headimg;
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
                    <Card.Header
                        title={card.uname}
                        thumb={card.headimg}
                        thumbStyle={{width: 30,height: 30,borderRadius:15}}
                    />
                    <Card.Body>
                        <Text style={{position:'relative',bottom:30,left:width*0.8}}>{card.chdate}</Text>
                        <Text style={{marginLeft: 30,marginTop:-20}}>{card.context}</Text>
                        <View style={styles.cardContext}>
                            <Image source={{uri: 'https://zhangshuo00.github.io/youji/YouJi/src/'+card.ch_headimg}} style={styles.cardContextImg}/>
                            <Image source={{uri: 'https://zhangshuo00.github.io/youji/YouJi/src/'+card.ch_headimg}} style={styles.cardContextImg}/>
                        </View>
                    </Card.Body>
                    <Card.Footer
                        content={
                            <View style={{display: 'flex',flexDirection: 'row',marginTop: 15}}>
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