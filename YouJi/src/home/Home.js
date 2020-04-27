// import React, { Component } from 'react'
// import { Text, View, StyleSheet, FlatList, TextInput, Image, Dimensions, ScrollView } from 'react-native'
// import { Carousel, Icon } from '@ant-design/react-native'
// import ListCard from '../components/ListCard'
// import { Actions } from 'react-native-router-flux'

// const { swidth, sheight } = Dimensions.get('window')

// export default class Home extends Component {
//     render() {
//         return (
//             <ScrollView>
//                 <View style={styles.head}>
//                     <TextInput placeholder="请输入您要搜索的关键字" style={styles.search} onFocus={()=>{Actions.search()}}/>
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
//                             style={styles.wrapper}
//                         >
//                             <Image source={{uri: 'https://i.loli.net/2020/04/13/LYeRrldPFcamun7.jpg'}} style={styles.wrapperImage}/>
//                         </View>
//                         <View
//                             style={styles.wrapper}
//                         >
//                             <Image source={{uri: 'https://i.loli.net/2020/04/13/2FAVtm34ND7hy8J.jpg'}} style={styles.wrapperImage}/>
//                         </View>
//                         <View
//                             style={styles.wrapper}
//                         >
//                             <Image source={{uri: 'https://i.loli.net/2020/04/13/zC749iu1kr3lnJs.jpg'}} style={styles.wrapperImage}/>
//                         </View>
//                         <View
//                             style={styles.wrapper}
//                         >
//                             <Text style={styles.wrapperText}>广告收入不易，请您理解</Text>
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
// const styles = StyleSheet.create({
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


import React, { Component } from 'react'
import { Text, View, TouchableOpacity,ImageBackground,
        StyleSheet, FlatList, TextInput, Image, Dimensions, ScrollView } from 'react-native'
import { Carousel} from '@ant-design/react-native'
import ListCard from '../components/ListCard'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';

const { swidth, sheight } = Dimensions.get('window');
const {width} = Dimensions.get('window');

export default class Home extends Component {

    constructor(){
        super();
        this.state = {
            selectedTab: 'blueTab',
            data:[{car_imgpath:"images/carousel1.jpg",car_context:''},
                {car_imgpath:"images/carousel2.jpg",car_context:''},
                {car_imgpath:"images/carousel3.jpg",car_context:''}],
        }
    }

    componentDidMount(){
        const post ={
            uid:'k3i297def'
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
            this.setState({
                data:data
            })
            console.log(this.state.data)
        })
    }

    head(){
        Actions.sider();
    }

    search(){
        Actions.search();
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.head}>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>{this.head()}}>
                        <Icon name='bars' color={'white'} size={28}></Icon>
                    </TouchableOpacity>
                    <TextInput placeholder="请输入您要搜索的关键字" onFocus={()=>{this.search()}}
                        placeholderTextColor="#a5a5a5" style={styles.search}/>
                    <Icon style={{position:'absolute',right:45,top:12}} name="search1" color={'white'} size={28}/>
                </View>
                <View style={{width:width}}>
                    <Carousel 
                        autoplay
                        infinite
                        selectedIndex={0}
                        autoplayInterval={3000}
                    >
                        <View
                            style={styles.wrapper}
                        >
                            <Image source={{uri: 'https://zhangshuo00.github.io/youji/YouJi/src/' + this.state.data[0].car_imgpath}} style={styles.wrapperImage}/>
                            <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
                            <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{this.state.data[0].car_context}</Text>
                        </View>
                        <View
                            style={styles.wrapper}
                        >
                            <Image source={{uri: 'https://zhangshuo00.github.io/youji/YouJi/src/' + this.state.data[1].car_imgpath}} style={styles.wrapperImage}/>
                            <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
                            <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{this.state.data[1].car_context}</Text>
                        </View>
                        <View
                            style={styles.wrapper}
                        >
                            <Image source={{uri: 'https://zhangshuo00.github.io/youji/YouJi/src/' + this.state.data[2].car_imgpath}} style={styles.wrapperImage}/>
                            <View style={{backgroundColor:'rgba(165,162,162,0.3)',position:'absolute',top:200,width:width,height:65}}></View>
                            <Text style={{color:'black',position:'absolute',top:200,fontSize:24,opacity:0.8}}>{this.state.data[2].car_context}</Text>
                        </View>
                        <View
                            style={styles.wrapper}
                        >
                            <Text style={styles.wrapperText}>广告收入不易，请您理解</Text>
                        </View>
                    </Carousel>
                </View>

                <View style={{width:width}}>
                    {/* <FlatList
                        renderItem={()=>(
                            <ListCard/>
                        )}
                    /> */}
                    <ListCard/>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
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
        backgroundColor:'rgb(250, 167, 85)'
    }
})
