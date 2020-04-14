import React, { Component } from 'react'
import { Text, View,Dimensions,Image, FlatList, TouchableOpacity,Alert, ScrollView} from 'react-native'
import { Actions } from 'react-native-router-flux'
const {width,scale} = Dimensions.get('window');
const s = width / 640;

export default class Sion extends Component {
    constructor(){
        super();
        this.state={
            datas:[]
        }
    }
    //长按删除
    touchStart(e){
        let that=this;
            Alert.alert('提示',
                '是否删除该分类，并删除该分类下所有笔记?', 
                [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => that.delTags(e)
                },
                ])
    }
    delTags=(e)=>{
        console.log(e)
        //本次用户用李四来做实现 uid是：k3mimknra
        // const post ={
        //     uid:k3mimknra,
        //     tags:e
        // }
        // console.log(post);
        // fetch('/delTags',{
        //     method:'POST',
        //     // mode:'cors',
        //     headers: {'Content-Type': 'application/json'},
        //     body:JSON.stringify(post)
        // })
        // .then(res=>res.json())
        // .then(data=>{
        //     console.log(data);
        //     window.location.reload(); //重新刷新该页面
        //     // this.setState({
        //     //     datas:data
        //     // })
        //     // 根据返回的消息，渲染响应的页面
        // })
    }

    //跳转相信分类
    jumpToSionple = (e)=>{
        console.log('跳转到子夜')
        Actions.sionple()
    }

    componentDidMount(){
        const post ={
            // uid:localStorage.getItem('uid'),
            uid:'k3i297def'
        }
        fetch('https://www.fastmock.site/mock/afe15e7a06ced2a28a4349cff024b576/HomeWork/sion',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data,'返回的分类数据'),
            this.setState({
                datas:data
            })
        })  
    }
    render() {
        return (
            <ScrollView>
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
                                onPress={this.jumpToSionple}
                            style={{
                                paddingTop:40*s,
                                width:'50%',
                                flexDirection:'column',
                                alignItems:'center',
                                }}>
                            <View style={{flexDirection:'column',alignItems:'center',}}>
                                <Image 
                                    // 从服务器获取图片 source={require("\'/"+item.ch_headimg+"\'")}
                                  source={require('./images/dangao.jpg')} 
                                  style={{height:120*s,width:150*s,borderRadius: 10*s}}/>
                                <Text  style={{marginBottom:5*s}}>{item.title}</Text>
                                <Text>{item.chdate}</Text>
                            </View>
                            </TouchableOpacity>
                           )
                        }}
                        />
                {/* {
                   this.state.datas.map((item)=>(
                       
                   ))
                } */}
            </View>
            </ScrollView>
        )
    }
}
