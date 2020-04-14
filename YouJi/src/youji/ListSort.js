import React, { Component } from 'react';
import { Text, View,Dimensions, ImageBackground, ScrollView,TouchableOpacity,Alert, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;

// const datas=[
//     {img_path:require('./images/kouhong.jpg'),tags:'美食'},           
//     {img_path:require('./images/kouhong.jpg'),tags:'旅行'},
//     {img_path:require('./images/kouhong.jpg'),tags:'美食'},           
//     {img_path:require('./images/kouhong.jpg'),tags:'旅行'},
//     {img_path:require('./images/kouhong.jpg'),tags:'美食'},           
//     {img_path:require('./images/kouhong.jpg'),tags:'旅行'},
//     {img_path:require('./images/kouhong.jpg'),tags:'美食'},           
//     {img_path:require('./images/kouhong.jpg'),tags:'旅行'},
// ]
export default class ListSort extends Component {
    constructor(){
        super();
        this.state={
            datas:[],
        }
    }

    componentDidMount(){
        const post ={
            uid:'k3i297def'
        }
        // console.log(post);
        fetch('https://www.fastmock.site/mock/afe15e7a06ced2a28a4349cff024b576/HomeWork/listSort',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data,'我想yao的'),
            this.setState({
                datas:data
            })
            // 根据返回的消息，渲染响应的页面
        })
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
    //删除函数
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

    //跳转详细分类，笔记页面
    jumpToSion = (e)=>{
        console.log('跳转')
        Actions.sion()
        // console.log(e.target.innerHTML.slice(3,-4));
        // const clickTag = e.target.innerHTML.slice(3,-4);
        // // 跳转到点击笔记标签的列表页
        // window.location.href = './index.html#/Sion?tags=' + encodeURI(clickTag);
    }

    render() {
        return (
            <ScrollView>
            <View>
                {
                    this.state.datas.map((item)=>(
                        this.setState={
                            
                        },
                        <View style={{margin:15*s,borderRadius:20*s}}>
                            <TouchableOpacity
                                onLongPress={()=>this.touchStart(item)}
                                onPress={this.jumpToSion}
                            >
                            <ImageBackground 
                                imageStyle={{borderRadius:20*s}}
                                // source={item.img_path}
                                source={require('./images/kouhong.jpg')}
                                // source={item.img_path}
                                style={{height:180*s,borderRadius:20*s}}
                            >
                            <Text style={{color:"orange",fontSize:30*s,marginLeft:20*s,marginTop:10*s}}>
                                {item.tags}
                            </Text>
                            </ImageBackground >
                            </TouchableOpacity>
                        </View>
                    ))
                    }
            </View>
            
            </ScrollView>
        )
    }
}
