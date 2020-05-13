import React, { useEffect, useState ,Component} from 'react'
import { View, Text, Image, StyleSheet, AsyncStorage,TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';


// const Sider = () => {

//     let [datas,setdatas] = useState(
//         {headimg:'images/timg.jpg',uname:'未登录',uemail:'未登录'}
//     );

//     useEffect(()=>{
//         // const post = {uid:AsyncStorage.getItem('uid').then(res=>res)}
//         AsyncStorage.getItem('uid').then(res=>{
//             const post = {uid:res}
//             console.log(post);
//             fetch('http://majia.hbsdduckhouse.club/userDetail',{
//                 method:'POST',
//                 // mode:'cors',
//                 headers: {'Content-Type': 'application/json'},
//                 body:JSON.stringify(post)
//             })
//             .then(res=>res.json())
//             .then(data=>{
//                 console.log(data);
//                 setdatas(data[0])
//             })
//         })
//         // const post = {uid:'k3i297def'}
//         // console.log(post);
//     },[])

//     toExit=()=>{
//         // console.log(1);
//         AsyncStorage.removeItem('uid')
//           .then(()=>{
//             Actions.home();
//           })
//     }

//     return (
//         <View>
//             <Icon name='left' size={24}  style={{marginBottom:80,marginTop:10,marginLeft:10}} onPress={()=>Actions.pop()}></Icon>
//             <View style={styles.siderTitle}>
//                 <Image source={{uri: 'https://zhangshuo00.github.io/youji/YouJi/src/'+datas.headimg}} style={styles.siderAvatar}/>
//                 <Text style={styles.siderName}>{datas.uname}</Text>
//                 <Text style={styles.siderEmail}>{datas.uemail}</Text>
//             </View>
//             <View style={styles.siderTabs}>
//                 <View style={styles.siderTabItem}>
//                     <Image source={require('../assets/personx.png')} style={styles.siderTabsIcon}/>
//                     <Text onPress={()=>Actions.my()} style={styles.siderTabsText}>主页</Text>
//                 </View>
//                 <View style={styles.siderTabItem}>
//                     <Image source={require('../assets/infor.png')} style={styles.siderTabsIcon}/>
//                     <Text  onPress={()=>Actions.msg()} style={styles.siderTabsText}>消息</Text>
//                 </View>
//                 <View style={styles.siderTabItem}>
//                     <Image source={require('../assets/lingdang_2f.png')} style={styles.siderTabsIcon}/>
//                     <Text onPress={()=>Actions.home()} style={styles.siderTabsText}>发现</Text>
//                 </View>
//                 <View style={styles.siderTabItem}>
//                     <Image source={require('../assets/shezhi.png')} style={styles.siderTabsIcon}/>
//                     <Text style={styles.siderTabsText}>设置</Text>
//                 </View>
//             </View>
//             <TouchableOpacity style={{width:'100%',alignItems:'center',marginTop:150}} onPress={()=>toExit()}>
//                 <Text style={{fontSize:18,color:'#4B4B4B',opacity:0.8}}>
//                     退出登录
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default Sider
export default class Sider extends Component {

    constructor(props){
        super(props)
        this.state={
            datas:{headimg:'images/timg.jpg',uname:'未登录',uemail:'未登录'}
        }
    }

    componentDidMount(){
        AsyncStorage.getItem('uid').then(res=>{
            const post = {uid:res}
            console.log(post);
            fetch('http://majia.hbsdduckhouse.club/userDetail',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                this.setState({
                    datas:data[0]
                })
            })
        })
    }


    toExit=()=>{
        // console.log(1);
        AsyncStorage.removeItem('uid')
          .then(()=>{
            Actions.home();
          })
    }

    render() {
        return (
            <View>
                <Icon name='left' size={24}  style={{marginBottom:80,marginTop:10,marginLeft:10}} onPress={()=>Actions.pop()}></Icon>
                <View style={styles.siderTitle}>
                    <Image source={{uri: 'https://zhangshuo00.github.io/youji/YouJi/src/'+this.state.datas.headimg}} style={styles.siderAvatar}/>
                    <Text style={styles.siderName}>{this.state.datas.uname}</Text>
                    <Text style={styles.siderEmail}>{this.state.datas.uemail}</Text>
                </View>
                <View style={styles.siderTabs}>
                    <View style={styles.siderTabItem}>
                        <Image source={require('../assets/personx.png')} style={styles.siderTabsIcon}/>
                        <Text onPress={()=>Actions.my()} style={styles.siderTabsText}>主页</Text>
                    </View>
                    <View style={styles.siderTabItem}>
                        <Image source={require('../assets/infor.png')} style={styles.siderTabsIcon}/>
                        <Text  onPress={()=>Actions.msg()} style={styles.siderTabsText}>消息</Text>
                    </View>
                    <View style={styles.siderTabItem}>
                        <Image source={require('../assets/lingdang_2f.png')} style={styles.siderTabsIcon}/>
                        <Text onPress={()=>Actions.home()} style={styles.siderTabsText}>发现</Text>
                    </View>
                    <View style={styles.siderTabItem}>
                        <Image source={require('../assets/shezhi.png')} style={styles.siderTabsIcon}/>
                        <Text style={styles.siderTabsText}>设置</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width:'100%',alignItems:'center',marginTop:150}} onPress={()=>this.toExit()}>
                    <Text style={{fontSize:18,color:'#4B4B4B',opacity:0.8}}>
                        退出登录
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    siderTitle:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    siderAvatar:{
        width: 80,
        height: 80,
        marginTop: 80,
        borderRadius:40 ,
    },
    siderName: {
        fontSize: 18,
        marginTop: 10
    },
    siderEmail: {
        color: '#909399',
        marginTop: 5
    },
    siderTabs: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    siderTabItem: {
        display:'flex',
        flexDirection: 'row',
        marginTop: 25
    },
    siderTabsIcon: {
        width: 20,
        height: 20
    },
    siderTabsText: {
        fontSize: 16,
        marginLeft: 10
    }
})

