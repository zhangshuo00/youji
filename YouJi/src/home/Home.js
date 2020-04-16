import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TextInput, Image, Dimensions, ScrollView } from 'react-native'
import { Carousel, Icon } from '@ant-design/react-native'
import ListCard from '../components/ListCard'
import { Actions } from 'react-native-router-flux'

const { swidth, sheight } = Dimensions.get('window')

export default class Home extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.head}>
                    <TextInput placeholder="请输入您要搜索的关键字" style={styles.search} onFocus={()=>{Actions.search()}}/>
                    <Icon style={{position:'absolute',right:45,top:12}} name="search"/>
                </View>
                <View>
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

                <View>
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
        height: 200,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 15
    },
    wrapperText: {
        color:'gray'
    },
    wrapperImage: {
        width: 320,
        height: 200,
        borderRadius: 20
    },
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
    }
})
