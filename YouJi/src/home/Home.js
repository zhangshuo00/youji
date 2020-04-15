import React, { Component } from 'react'
import { Text, View, TouchableOpacity,
        StyleSheet, FlatList, TextInput, Image, Dimensions, ScrollView } from 'react-native'
import { Carousel} from '@ant-design/react-native'
import ListCard from '../components/ListCard'
import Icon from 'react-native-vector-icons/AntDesign';

const { swidth, sheight } = Dimensions.get('window');
const {width} = Dimensions.get('window');

export default class Home extends Component {

    head(){
        console.log(1)
    }

    search(){
        console.log(2)
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
                            <Image source={{uri: 'https://i.loli.net/2020/04/13/LYeRrldPFcamun7.jpg'}} style={styles.wrapperImage}/>
                        </View>
                        <View
                            style={styles.wrapper}
                        >
                            <Image source={{uri: 'https://i.loli.net/2020/04/13/2FAVtm34ND7hy8J.jpg'}} style={styles.wrapperImage}/>
                        </View>
                        <View
                            style={styles.wrapper}
                        >
                            <Image source={{uri: 'https://i.loli.net/2020/04/13/zC749iu1kr3lnJs.jpg'}} style={styles.wrapperImage}/>
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
