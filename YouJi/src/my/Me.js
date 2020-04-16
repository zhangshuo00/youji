import React, { Component } from 'react';
import {View, Text, Button,TouchableOpacity,StyleSheet,Image } from 'react-native';
import {Router,Overlay,  Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import ListCard from '../components/ListCard';


export default class Me extends Component {
    // constructor(){
    //     super();
    //     this.state = {
    //         selectedTab: 'blueTab',
    //         // data: ['e_02', 'e_02', 'e_02','e_02'],
    //         data:{uname:'张三',uemail:'11111111@qq.com',userCounts:5,chapterCounts:5,signature:'我是张三',headimg:'images/timg.jpg',usex:'男'},
    //         seximg:'images/nan.png',
    //         imgHeight: 200,
    //         datas:[
    //             // {ch_headimg:'images/sort-test1.jpg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20'},
    //             // {ch_headimg:'images/sort-test2.jpg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20'},
    //             // {ch_headimg:'images/sort-test3.jpeg',headimg:'images/timg.jpg',uname:'有纪',chdate:'12月6日',context:'今天周末不用上班，做了一直想吃的奶油面包！',likes:'60',favorites:'20'}
    //         ],
    //         dataa:[]
    //     }
    // }

    // componentDidMount(){
    //     const storage = window.localStorage;
    //     const post ={
    //         uid:storage.uid
    //     }
    //     // console.log(post);
    //     fetch('/me',{
    //         method:'POST',
    //         // mode:'cors',
    //         headers: {'Content-Type': 'application/json'},
    //         body:JSON.stringify(post)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         this.setState({
    //             data:data[0],
    //             datas:data[1]
    //         })
    //         if(data[0].usex == '男'){
    //             this.setState({
    //                 seximg:'images/nan.png'
    //             })
    //         }
    //         else{
    //             this.setState({
    //                 seximg:'images/nv.png'
    //             })
    //         }
    //         // 根据返回的消息，渲染响应的页面
    //     })
    //     fetch('/getFollowUser',{
    //         method:'POST',
    //         // mode:'cors',
    //         headers: {'Content-Type': 'application/json'},
    //         body:JSON.stringify(post)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         this.setState({
    //             dataa:data
    //         })
    //     })
    // }
    // follow(){
    //     let orange = document.getElementById('me-essay-orange')
    //     orange.style.display='none';
    //     let center = document.getElementById('find-center');
    //     center.style.display='none';
    //     let orange1 =document.getElementById('me-follow-orange');
    //     orange1.style.display='block'
    //     let center1 = document.getElementById('follow-center');
    //     center1.style.display='block';
    // }
    // essay(){
    //     let orange = document.getElementById('me-essay-orange')
    //     orange.style.display='block';
    //     let center = document.getElementById('find-center');
    //     center.style.display='block';
    //     let orange1 =document.getElementById('me-follow-orange');
    //     orange1.style.display='none';
    //     let center1 = document.getElementById('follow-center');
    //     center1.style.display='none'
    // }
    render(){
        return(
            <View>
                <View style={styles.me_top}>
                        <View style={styles.me_top_list}>
                            <Icon style={{
                            color:'#fff',
                            marginTop:20,
                            marginLeft:10                              
                            }} size={30} name="bars"
                        />
                        </View>
                        <Text style={styles.me_top_user}>张三</Text>
                        <Text style={styles.me_top_email}>zhangsan@qq.com</Text>
                </View>
                <View style={styles.me_title}>
                    <Image style={styles.me_head} source={require('../images/pic1.jpg')}/>
                    <View style={styles.me_num}>
                        <View style={styles.me_sex}>
                            {/* <Image></Image> */}
                            <Text>女</Text>
                        </View>
                        <View style={styles.me_atten}>
                            <Text>1</Text>
                            <Text>关注</Text>
                        </View>
                        <View style={styles.me_collect}>
                            <Text>20</Text>
                            <Text>收藏</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.me_btn}>
                        <Button title="编辑资料" color="#faa755" onPress={()=>Actions.edit()}/>
                </View>
                <View style={styles.me_sign}>
                    <Text>个性签名：这个人很懒，什么都没有写</Text>
                </View>
                <View style={styles.me_nav}>
                    <TouchableOpacity style={styles.me_essay}>
                        <Text>收藏列表</Text> 
                        <ListCard/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.me_follow}>
                        <Text>关注列表</Text>
                        <ListCard/>
                    </TouchableOpacity>
                </View>
                {/* <Router>
                    <Modal>
                        <screen key='myEssay' component={ListCard}>
                            <Text>收藏列表</Text> 
                            <ListCard/>
                        </screen>
                        <screen key='myFollow' component={ListCard}>
                            <Text>关注列表</Text> 
                            <ListCard/>
                        </screen>
                    </Modal>
                </Router> */}
                

                
                {/* <View style={styles.find_center}></View>
                <View style={styles.me_follow_center}></View> */}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    me_top:{
        backgroundColor:'#faa755'
    },
    me_top_user:{
        color:'#fff',
        marginLeft:220
    },
    me_top_email:{
        marginLeft:180,
    },
    me_title:{
        flex:1,
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    me_head:{
        borderRadius:55,
        width:100,
        height:100
    },
    me_num:{
        flex:1,
        flexDirection: 'row',
        width:300,
        marginLeft:40,
        marginTop:10,
        textAlign:'center',
        alignItems:'center'
    },
    me_sex:{
        width:100
    },
    me_atten:{
        width:100
    },
    me_collect:{
        width:100
    },
    me_btn:{
        width:250,
        borderRadius:30,
        marginTop:80,
        marginLeft:130
    },
    me_sign:{
        marginLeft:10,
        marginTop:30
    },
    me_nav:{
        height:75,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:120
    }
})