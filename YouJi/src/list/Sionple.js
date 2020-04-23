import React, { Component } from 'react'
import { Text, View, Image,AsyncStorage,Dimensions,ScrollView} from 'react-native'

const {width,scale} = Dimensions.get('window');
const s = width / 640;
console.disableYellowBox = true; //取消显示黄框

export default class Sionple extends Component {
    constructor(props){
        super();
        this.state={
            data:[],
    }
    }

    async componentDidMount(){
        const post ={
            uid: await   AsyncStorage.getItem('uid ').then(res=>res),
            chid:await   AsyncStorage.getItem('chid').then(res=>res),
        }
        console.log(post)
        fetch('http://majia.hbsdduckhouse.club/sionple',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data,'获取到值');
            this.setState({
                data:data,
            })
        })
    }

    render() {
        return (
            <ScrollView>
            <View>
                {
                    this.state.data.map((item)=>(
                        <View>
                        <View>
                            <Image style={{height:196*s,width:'100%'}} source={{uri:'https://zhangshuo00.github.io/youji/YouJi/src/' + item.ch_headimg}}/>
                        </View>
                        <View style={{marginLeft:"10%",marginRight:"10%",flexDirection:'row'}}>
                            <Text style={{marginTop:40*s,fontSize:30*s}}>{item.tags}</Text>
                            <Text style={{marginLeft:"30%",marginTop:40*s,fontSize:30*s,marginBottom:20*s}}>By</Text>
                            <Text style={{marginLeft:"5%",marginTop:40*s,fontSize:30*s,marginBottom:20*s}}>{item.uname}</Text>
                        </View>
                        <View style={{marginLeft:"10%",marginRight:"10%",}}>
                            <Text style={{marginTop:40*s,fontSize:40*s,marginBottom:20*s}}>{item.title}</Text>
                            <Text style={{marginTop:40*s,fontSize:30*s,marginBottom:20*s}}>{item.context}</Text>
                            {
                                item.imgPath.map(val=>(
                                    <Image style={{height:200*s,width:"100%",marginBottom:20*s}} source={{uri:'https://zhangshuo00.github.io/youji/YouJi/src/' + val.img_path}}/>
                                ))
                            }
                        </View>
                        </View>
                    ))
                }
            </View>
            </ScrollView>
        )
    }
}
