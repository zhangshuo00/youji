import React, { Component } from 'react'
import { Text, View,StyleSheet,Dimensions,Image, FlatList, TouchableOpacity,Alert, ScrollView,AsyncStorage} from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class Sion extends Component {
    constructor(){
        super();
        this.state={
            datas:[],
            chid:'',
        }
    }
    //长按删除
    touchStart(e){
        let that=this;
            Alert.alert('提示',
                '是否删除这篇笔记?', 
                [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => that.delTags(e)
                },
                ])
    }
     delTags= async(e)=>{
        console.log(e)
        const post ={
            uid:await AsyncStorage.getItem('uid').then(res=>res),
            chid:e.chid
        }
        console.log(post);
        fetch('http://majia.hbsdduckhouse.club/delSionple',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.componentDidMount()
        })
    }

    async componentDidMount(){
        // AsyncStorage.setItem('chid',"20")
        const post ={
            uid:await AsyncStorage.getItem('uid').then(res=>res),
            tags:this.props.tag
        }
        AsyncStorage.setItem('tags',this.props.tag)
        fetch('http://majia.hbsdduckhouse.club/Sion',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data,'返回的单页数据'),
            this.setState({
                datas:data,
            })
        })  
    }


    
    //跳转相信分类
    jumpToSionple =(item)=>{
        AsyncStorage.setItem('chid',""+item.chid+"")
        console.log('跳转到子页',item.chid)
        Actions.sionple()
     }
    

    render() {
        return (
            <ScrollView>
                <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                        <Text style={styles.headText}>{this.props.tag}</Text>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.sionnew()}><Icon name='plus' color={'white'} size={28}></Icon></TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'}}>
                        <FlatList
                        numColumns='2'
                        data={this.state.datas}
                        renderItem={({item})=>{
                            return(
                                <TouchableOpacity 
                                    onLongPress={()=>this.touchStart(item)}
                                    onPress={()=>this.jumpToSionple(item)}
                                    style={{
                                        paddingTop:40*s,
                                        width:'50%',
                                        flexDirection:'column',
                                        alignItems:'center',
                                    }}>
                                <View style={{flexDirection:'column',alignItems:'center',}}>
                                    <Image 
                                    source={{uri:'https://www.hbsdduckhouse.club/' + item.ch_headimg}}
                                    style={{height:120*s,width:150*s,borderRadius: 10*s}}/>
                                    <Text  style={{marginBottom:5*s}}>{item.title}</Text>
                                    <Text>{item.chdate}</Text>
                                </View>
                                </TouchableOpacity>
                            )
                            }}
                            />
                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create({
    headText:{
        marginRight:width*0.12,
        width:width*0.54,
        textAlign:'center',
        fontSize:22,
        color:'white'
    },
    headIcon:{
        marginLeft:width*0.02,
        width:width*0.2,
    },
    msgList:{
        width: width,
    },
})