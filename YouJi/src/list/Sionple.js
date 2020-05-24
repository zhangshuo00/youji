// import React, { Component } from 'react'
// import { Text,TouchableOpacity, View,StyleSheet, Image,AsyncStorage,Dimensions,ScrollView} from 'react-native'
// import Icon from 'react-native-vector-icons/AntDesign';
// import { Actions } from 'react-native-router-flux';
// const {width,scale} = Dimensions.get('window');
// const s = width / 640;
// console.disableYellowBox = true; //取消显示黄框

// export default class Sionple extends Component {
//     constructor(props){
//         super();
//         this.state={
//             data:[],
//     }
//     }

//     async componentDidMount(){
//         const post ={
//             uid: await   AsyncStorage.getItem('uid ').then(res=>res),
//             chid:await   AsyncStorage.getItem('chid').then(res=>res),
//         }
//         console.log(post)
//         fetch('http://majia.hbsdduckhouse.club/sionple',{
//             method:'POST',
//             // mode:'cors',
//             headers: {'Content-Type': 'application/json'},
//             body:JSON.stringify(post)
//         })
//         .then(res=>res.json())
//         .then(data=>{
//             console.log(data,'获取到值');
//             this.setState({
//                 data:data,
//             })
//         })
//     }

//     render() {
//         return (
//             <ScrollView>
//                  <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
//                     <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
//                     <Text style={styles.headText}>笔记内容</Text>
//                 </View>
//                 <View>
//                     {
//                         this.state.data.map((item)=>(
//                             <View>
//                             <View>
//                                 <Image style={{height:300*s,width:'100%'}} source={{uri:'https://www.hbsdduckhouse.club/' + item.ch_headimg}}/>
//                             </View>
//                             <View style={{marginLeft:"10%",marginRight:"10%",flexDirection:'row'}}>
//                                 <Text style={{marginTop:40*s,fontSize:30*s}}>{item.tags}</Text>
//                                 <Text style={{marginLeft:"65%",marginTop:40*s,fontSize:30*s,marginBottom:20*s,color:'#969696'}}>By</Text>
//                                 <Text style={{marginLeft:"2%",marginTop:50*s,fontSize:20*s,marginBottom:20*s}}>{item.uname}</Text>
//                             </View>
//                             <View style={{marginLeft:"10%",marginRight:"10%",}}>
//                                 <Text style={{marginTop:20*s,fontSize:40*s,marginBottom:20*s}}>{item.title}</Text>
//                                 <Text style={{marginTop:20*s,fontSize:30*s,marginBottom:20*s}}>{item.context}</Text>
//                                 {
//                                     item.imgPath.map(val=>(
//                                         <Image style={{height:200*s,width:"100%",marginBottom:20*s}} source={{uri:'https://www.hbsdduckhouse.club/' + val.img_path}}/>
//                                     ))
//                                 }
//                             </View>
//                             </View>
//                         ))
//                     }
//                 </View>
//             </ScrollView>
//         )
//     }
// }


// const styles = StyleSheet.create({
//     headText:{
//         marginRight:width*0.12,
//         width:width*0.54,
//         textAlign:'center',
//         fontSize:22,
//         color:'white'
//     },
//     headIcon:{
//         marginLeft:width*0.02,
//         width:width*0.2,
//     },
//     msgList:{
//         width: width,
//     },
// })

import React, { Component } from 'react'
import { Text,TouchableOpacity, View,StyleSheet, Image,AsyncStorage,Dimensions,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
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
                 <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                    <Text style={styles.headText}>笔记内容</Text>
                </View>
                <View>
                    {
                        this.state.data.map((item)=>(
                            <View>
                            <View>
                                <Image style={{height:300*s,width:'100%'}} source={{uri:'https://www.hbsdduckhouse.club/' + item.ch_headimg}}/>
                            </View>
                            <View style={{marginLeft:"10%",marginRight:"10%",flexDirection:'row'}}>
                                <Text style={{marginTop:40*s,fontSize:30*s}}>{item.tags}</Text>
                                <Text style={{marginLeft:"65%",marginTop:40*s,fontSize:30*s,marginBottom:20*s,color:'#969696'}}>By</Text>
                                <Text style={{marginLeft:"2%",marginTop:50*s,fontSize:20*s,marginBottom:20*s}}>{item.uname}</Text>
                            </View>
                            <View style={{marginLeft:"10%",marginRight:"10%",}}>
                                <Text style={{marginTop:20*s,fontSize:40*s,marginBottom:20*s}}>{item.title}</Text>
                                <Text style={{marginTop:20*s,fontSize:30*s,marginBottom:20*s}}>{item.context}</Text>
                                {
                                    item.imgPath.map(val=>(
                                        <Image style={{height:200*s,width:"100%",marginBottom:20*s}} source={{uri:'https://www.hbsdduckhouse.club/' + val.img_path}}/>
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