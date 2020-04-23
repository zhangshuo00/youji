import React, { Component } from 'react';
import { Text, View,Dimensions, ImageBackground, ScrollView,TouchableOpacity,Alert, Image, AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
let tags=''
console.disableYellowBox = true; //取消显示黄框


export default class ListSort extends Component {
    constructor(){
        super();
        this.state={
            datas:[],
            uid:'',
            tags:'',
            refresh:'',
        }
    }

   async componentDidMount(){
        AsyncStorage.setItem('uid',"k3i297def")
        this.setState({
            uid:await   AsyncStorage.getItem('uid').then(res=>res),
            tags:await   AsyncStorage.getItem('tags').then(res=>res),
        })
        const post ={
            uid:this.state.uid,
            tags:this.state.tags
       }
        console.log(post,"dsa"); 
       fetch('http://majia.hbsdduckhouse.club/listSort',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            // 根据返回的消息，渲染响应的页面
            this.setState({
                datas:data
            })
        })
    }

    
//长按删除
    touchStart(item){
        let that=this;
            Alert.alert('提示',
                '是否删除该分类，并删除该分类下所有笔记?', 
                [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => that.delTags(item)
                },
                ])
    }
    //删除函数
    delTags=(item)=>{
        const post ={
            uid:this.state.uid,
            tags:item.tags
       }
       console.log(post,"dsa");
        fetch('http://majia.hbsdduckhouse.club/delTags',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data,'重新加载');
            //重新刷新该页面
            this.componentDidMount()
        })
    }

    //跳转详细分类，笔记页面
    jumpToSion = (item)=>{
        AsyncStorage.setItem('tags',item.tags)
        Actions.sion()
        // console.log(e.target.innerHTML.slice(3,-4));
        // const clickTag = e.target.innerHTML.slice(3,-4);
        // // 跳转到点击笔记标签的列表页
    }

     render() {
        return (
            <ScrollView>
            <View>
                {
                    this.state.datas.map((item)=>(
                        <View style={{margin:15*s,borderRadius:20*s}}>
                            <TouchableOpacity
                                onLongPress={()=>this.touchStart(item)}
                                onPress={()=>this.jumpToSion(item)}
                            >
                            <ImageBackground 
                                imageStyle={{borderRadius:20*s}}
                                source={{uri:'https://zhangshuo00.github.io/youji/YouJi/src/' + item.img_path}}
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
