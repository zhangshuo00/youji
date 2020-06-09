// import React, { Component } from 'react'
// import { Text, View, stylesBlackheet, FlatList, TextInput, Image, Dimensions, ScrollView } from 'react-native'
// import { Carousel, Icon } from '@ant-design/react-native'
// import ListCard from '../components/ListCard'
// import { Actions } from 'react-native-router-flux'

// const { swidth, sheight } = Dimensions.get('window')

// export default class Home extends Component {
//     render() {
//         return (
//             <ScrollView>
//                 <View style={stylesBlack.head}>
//                     <TextInput placeholder="请输入您要搜索的关键字" style={stylesBlack.search} onFocus={()=>{Actions.search()}}/>
//                     <Icon style={{position:'absolute',right:45,top:12}} name="search"/>
//                 </View>
//                 <View>
//                     <Carousel 
//                         autoplay
//                         infinite
//                         selectedIndex={0}
//                         autoplayInterval={3000}
//                     >
//                         <View
//                             style={stylesBlack.wrapper}
//                         >
//                             <Image source={{uri: 'https://i.loli.net/2020/04/13/LYeRrldPFcamun7.jpg'}} style={stylesBlack.wrapperImage}/>
//                         </View>
//                         <View
//                             style={stylesBlack.wrapper}
//                         >
//                             <Image source={{uri: 'https://i.loli.net/2020/04/13/2FAVtm34ND7hy8J.jpg'}} style={stylesBlack.wrapperImage}/>
//                         </View>
//                         <View
//                             style={stylesBlack.wrapper}
//                         >
//                             <Image source={{uri: 'https://i.loli.net/2020/04/13/zC749iu1kr3lnJs.jpg'}} style={stylesBlack.wrapperImage}/>
//                         </View>
//                         <View
//                             style={stylesBlack.wrapper}
//                         >
//                             <Text style={stylesBlack.wrapperText}>广告收入不易，请您理解</Text>
//                         </View>
//                     </Carousel>
//                 </View>

//                 <View>
//                     {/* <FlatList
//                         renderItem={()=>(
//                             <ListCard/>
//                         )}
//                     /> */}
//                     <ListCard/>
//                     <ListCard/>
//                 </View>
//             </ScrollView>
//         )
//     }
// }
// const stylesBlack = stylesBlackheet.create({
//     wrapper: {
//         height: 200,
//         justifyContent:'center',
//         alignItems:'center',
//         borderRadius: 15
//     },
//     wrapperText: {
//         color:'gray'
//     },
//     wrapperImage: {
//         width: 320,
//         height: 200,
//         borderRadius: 20
//     },
//     search: {
//         width:'85%',
//         height:40,
//         marginTop:5,
//         backgroundColor:'#eeeeee',
//         borderRadius:10,
//     },
//     head: {
//         height:50,
//         justifyContent:'center',
//         flexDirection:'row',
//         flexWrap:'wrap',
//     }
// })


import React, { Component,useEffect,useState } from 'react'
import { Text, View, TouchableOpacity,ImageBackground,AsyncStorage,
        stylesBlackheet, FlatList, TextInput, Image, Dimensions, ScrollView } from 'react-native'
import { Carousel} from '@ant-design/react-native'
import { useDarkMode, DynamicStyleSheet, DynamicValue, useDynamicStyleSheet } from 'react-native-dark-mode'
import ListCard from '../components/ListCard'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
const { swidth, sheight } = Dimensions.get('window');
const {width} = Dimensions.get('window');
import ViewList from './ViewList';
import FoodList from './FoodList';
import LifeList from './LifeList';
import StudyList from './StudyList';
import InsList from './InsList';


const Home = () =>{
    let [data, setData] = useState([
            {car_imgpath:"images/carousel1.jpg",car_context:''},
            {car_imgpath:"images/carousel2.jpg",car_context:''},
            {car_imgpath:"images/carousel3.jpg",car_context:''}
        ]);
    let [selectedTab, setSelectedTab] = useState('blueTab');
    let [topic, setTopic] = useState([
            {item:'发现',selected:1},
            {item:'风景',selected:0},
            {item:'学习',selected:0},
            {item:'美食',selected:0},
            {item:'琐碎生活',selected:0},
            {item:'心得',selected:0}
        ]);
    const isDarkMode = useDarkMode();
    const stylesBlack = useDynamicStyleSheet(dynamicStyles);

    useEffect(() => {
        const post ={
            uid: AsyncStorage.getItem('uid').then(res=>res)
        }
        // console.log(post);
        fetch('http://majia.hbsdduckhouse.club/getCarousel',{
            method:'GET',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            // body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data);
            setData(data)
        })
    });

    head=()=>{
        Actions.sider();
    }

    search=()=>{
        Actions.search();
    }

    select=(key)=>{
        // console.log(key);
        for(let i=0;i<topic.length;i++){
            let a = topic;
            a[i].selected = 0;
            setTopic(a)
        };
        let b = topic;
        b[key].selected = 1;
        setTopic(b)
    }

    return (
        <ScrollView>
            <View style={stylesBlack.head}>
                <TouchableOpacity style={stylesBlack.headIcon} onPress={()=>{head()}}>
                    <Icon name='bars' color={'white'} size={28}></Icon>
                </TouchableOpacity>
                <TextInput placeholder="请输入您要搜索的关键字" onFocus={()=>{search()}}
                    placeholderTextColor="#a5a5a5" style={stylesBlack.search}/>
                <Icon style={{position:'absolute',right:45,top:12}} name="search1" color={isDarkMode ? 'black' : 'white'} size={28}/>
            </View>
            <View style={{paddingTop:8,paddingBottom:1,width:width,paddingRight:width*0.02,paddingLeft:width*0.02,flex:1,flexDirection:'row',backgroundColor:isDarkMode ? 'black' : 'white',justifyContent:'space-between'}}>
                {
                    topic.map((topics,key)=>
                        <TouchableOpacity  onPress={()=>this.select(key)}>
                            <Text style={{textAlign:'center',color:isDarkMode ? 'white' : 'gray',fontSize:16}}>{topics.item}</Text>   
                            <View style={{height:4,width:'100%',backgroundColor:'#faa755',display:topics.selected == 1?'flex':'none'}}></View>
                        </TouchableOpacity> 
                    )
                }
            </View>
            
            <View style={{width:width,display:topic[0].selected == 1?'flex':'none'}}>
            <View style={{width:width}}>
                    <Carousel 
                        autoplay
                        infinite
                        selectedIndex={0}
                        autoplayInterval={3000}
                    >
                        <View
                            style={stylesBlack.wrapper}
                        >
                            <Image source={{uri: 'https://www.hbsdduckhouse.club/' + data[0].car_imgpath}} style={stylesBlack.wrapperImage}/>
                            <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
                            <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{data[0].car_context}</Text>
                        </View>
                        <View
                            style={stylesBlack.wrapper}
                        >
                            <Image source={{uri: 'https://www.hbsdduckhouse.club/' + data[1].car_imgpath}} style={stylesBlack.wrapperImage}/>
                            <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
                            <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{data[1].car_context}</Text>
                        </View>
                        <View
                            style={stylesBlack.wrapper}
                        >
                            <Image source={{uri: 'https://www.hbsdduckhouse.club/' + data[2].car_imgpath}} style={stylesBlack.wrapperImage}/>
                            <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
                            <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{data[2].car_context}</Text>
                        </View>
                        <View
                            style={stylesBlack.wrapper}
                        >
                            <Text style={stylesBlack.wrapperText}>广告收入不易，请您理解</Text>
                        </View>
                    </Carousel>
                </View>
                <ListCard/>
            </View>
            <View style={{width:width,display:topic[1].selected == 1?'flex':'none'}}>
                <ViewList/>
            </View>
            <View style={{width:width,display:topic[2].selected == 1?'flex':'none'}}>
                <StudyList/>
            </View>
            <View style={{width:width,display:topic[3].selected == 1?'flex':'none'}}>
                <FoodList/>
            </View>
            <View style={{width:width,display:topic[4].selected == 1?'flex':'none'}}>
                <LifeList/>
            </View>
            <View style={{width:width,display:topic[5].selected == 1?'flex':'none'}}>
                <InsList/>
            </View>
        </ScrollView>
    )
}

export default Home

const dynamicStyles = new DynamicStyleSheet({
    wrapper: {
        height: 250,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 15
    },
    wrapperText: {
        color:'gray'
    },
    wrapperImage: {
        width:width,
        height: 250,
        resizeMode:'stretch'
        // borderRadius: 20
    },
    search: {
        width:width*0.8,
        height:38,
        backgroundColor:'#eeeeee',
        borderRadius:10,
        marginTop:10,
        // opacity:0.8
    },
    headIcon:{
        marginLeft:width*0.02,
        // width:width*0.2,
        marginRight:width*0.04
    },
    head: {
        height:50,
        // justifyContent:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
        width:width,
        backgroundColor: new DynamicValue('rgb(250, 167, 85)','black')
    }
})
// export default class Home extends Component {

//     constructor(){
//         super();
//         this.state = {
//             selectedTab: 'blueTab',
//             data:[{car_imgpath:"images/carousel1.jpg",car_context:''},
//                 {car_imgpath:"images/carousel2.jpg",car_context:''},
//                 {car_imgpath:"images/carousel3.jpg",car_context:''}
//             ],
//             topic:[{item:'发现',selected:1},
//                 {item:'风景',selected:0},
//                 {item:'学习',selected:0},
//                 {item:'美食',selected:0},
//                 {item:'琐碎生活',selected:0},
//                 {item:'心得',selected:0},]
//         }
//     }

//     componentDidMount(){
//         const post ={
//             uid: AsyncStorage.getItem('uid').then(res=>res)
//         }
//         // console.log(post);
//         fetch('http://majia.hbsdduckhouse.club/getCarousel',{
//             method:'GET',
//             // mode:'cors',
//             headers: {'Content-Type': 'application/json'},
//             // body:JSON.stringify(post)
//         })
//         .then(res=>res.json())
//         .then(data=>{
//             // console.log(data);
//             this.setState({
//                 data:data
//             })
//             console.log(data)
//         })
//     }

//     head(){
//         Actions.sider();
//     }

//     search(){
//         Actions.search();
//     }

//     select(key){
//         console.log(key);
//         for(let i=0;i<topic.length;i++){
//             let a = topic;
//             a[i].selected = 0;
//             this.setState({
//                 topic:a
//             })
//         };
//         let b = topic;
//         b[key].selected = 1;
//         this.setState({
//             topic:b
//         })
//     }

//     render() {
//         return (
//             <ScrollView>
//                 <View style={stylesBlack.head}>
//                     <TouchableOpacity style={stylesBlack.headIcon} onPress={()=>{this.head()}}>
//                         <Icon name='bars' color={'white'} size={28}></Icon>
//                     </TouchableOpacity>
//                     <TextInput placeholder="请输入您要搜索的关键字" onFocus={()=>{this.search()}}
//                         placeholderTextColor="#a5a5a5" style={stylesBlack.search}/>
//                     <Icon style={{position:'absolute',right:45,top:12}} name="search1" color={'white'} size={28}/>
//                 </View>
//                 <View style={{paddingTop:5,paddingBottom:1,width:width,paddingRight:width*0.02,paddingLeft:width*0.02,flex:1,flexDirection:'row',backgroundColor:'white',justifyContent:'space-between'}}>
//                     {
//                         topic.map((topics,key)=>
//                             <TouchableOpacity  onPress={()=>this.select(key)}>
//                                 <Text style={{textAlign:'center',color:'grey',fontSize:20}}>{topics.item}</Text>   
//                                 <View style={{height:4,width:'100%',backgroundColor:'#faa755',display:topics.selected == 1?'flex':'none'}}></View>
//                             </TouchableOpacity> 
//                         )
//                     }
//                 </View>
                
//                 <View style={{width:width,display:topic[0].selected == 1?'flex':'none'}}>
//                 <View style={{width:width}}>
//                         <Carousel 
//                             autoplay
//                             infinite
//                             selectedIndex={0}
//                             autoplayInterval={3000}
//                         >
//                             <View
//                                 style={stylesBlack.wrapper}
//                             >
//                                 <Image source={{uri: 'https://www.hbsdduckhouse.club/' + data[0].car_imgpath}} style={stylesBlack.wrapperImage}/>
//                                 <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
//                                 <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{data[0].car_context}</Text>
//                             </View>
//                             <View
//                                 style={stylesBlack.wrapper}
//                             >
//                                 <Image source={{uri: 'https://www.hbsdduckhouse.club/' + data[1].car_imgpath}} style={stylesBlack.wrapperImage}/>
//                                 <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
//                                 <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{data[1].car_context}</Text>
//                             </View>
//                             <View
//                                 style={stylesBlack.wrapper}
//                             >
//                                 <Image source={{uri: 'https://www.hbsdduckhouse.club/' + data[2].car_imgpath}} style={stylesBlack.wrapperImage}/>
//                                 <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
//                                 <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{data[2].car_context}</Text>
//                             </View>
//                             <View
//                                 style={stylesBlack.wrapper}
//                             >
//                                 <Text style={stylesBlack.wrapperText}>广告收入不易，请您理解</Text>
//                             </View>
//                         </Carousel>
//                     </View>
//                     <ListCard/>
//                 </View>
//                 <View style={{width:width,display:topic[1].selected == 1?'flex':'none'}}>
//                     <ViewList/>
//                 </View>
//                 <View style={{width:width,display:topic[2].selected == 1?'flex':'none'}}>
//                     <StudyList/>
//                 </View>
//                 <View style={{width:width,display:topic[3].selected == 1?'flex':'none'}}>
//                     <FoodList/>
//                 </View>
//                 <View style={{width:width,display:topic[4].selected == 1?'flex':'none'}}>
//                     <LifeList/>
//                 </View>
//                 <View style={{width:width,display:topic[5].selected == 1?'flex':'none'}}>
//                     <InsList/>
//                 </View>
//             </ScrollView>
//         )
//     }
// }