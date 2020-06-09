import React,{useState,useEffect} from 'react'
import { View, Text, stylesBlackheet, Image,Dimensions } from 'react-native'
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native'
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'

const {width} = Dimensions.get('window');

const ViewList = () => {

    let [datas,setdatas] = useState([
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'2019-11-28',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',img_path:['images/sort-test1.jpg','images/sort-test2.jpg']},
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',img_path:['images/sort-test1.jpg','images/sort-test2.jpg']},
        // {headimg:'https://www.hbsdduckhouse.club/images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20',img_path:['images/sort-test1.jpg','images/sort-test2.jpg']}
    ]);
    let [dataList,setdataList] = useState([]);
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    useEffect(()=>{
        fetch('http://majia.hbsdduckhouse.club/getViewList',{
            method:'GET',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            // body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data[0]);
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
                // if(data[a].topic_id == '风景'){
                //     var b = dataList;
                //     b.push(data[a]);
                //     setdataList(b);
                // }
            }
            // console.log(b.length);
            // if(b.length)
            //     setdatas(b);
            setdatas(data);
        });
    },[])

    return (
        <View style={stylesBlack.card}>
        <Image source={require('../images/viewList.jpg')} style={{width:width,height:260}}></Image>
        {
            datas.map(card=>
                <Card>
                    <Card.Header
                        title={card.uname}
                        thumb={card.headimg}
                        thumbStyle={{width: 30,height: 30,borderRadius:15}}
                        style={{backgroundColor:isDarkMode ? 'black' : 'white'}}
                    />
                    <Card.Body style={{backgroundColor:isDarkMode ? 'black' : 'white'}}>
                        <Text style={{position:'relative',bottom:30,left:width*0.8,color:isDarkMode ? 'white' : 'balck'}}>{card.chdate}</Text>
                        <Text style={{marginLeft: 30,marginTop:-20,color:isDarkMode ? 'white' : 'black'}}>{card.context}</Text>
                        <View style={stylesBlack.cardContext}>
                            <Image source={{uri: 'https://www.hbsdduckhouse.club/'+card.img_path[0]}} style={stylesBlack.cardContextImg}/>
                            <Image source={{uri: 'https://www.hbsdduckhouse.club/'+card.img_path[1]}} style={stylesBlack.cardContextImg}/>
                        </View>
                    </Card.Body>
                    <Card.Footer
                        content={
                            <View style={{display: 'flex',flexDirection: 'row',marginTop: 15}}>
                                <Image source={{uri: 'https://i.loli.net/2020/04/13/cWKiSzxOIo8fhtv.png'}} style={stylesBlack.cardBottomImage}/>
                                <Text>  {card.favorites}</Text>
                                <Image source={{uri: 'https://i.loli.net/2020/04/13/kbr2KtWGMfvl51E.png'}} style={stylesBlack.cardBottomImage}/>
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

export default ViewList

const dynamicStyles = new DynamicStyleSheet({
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