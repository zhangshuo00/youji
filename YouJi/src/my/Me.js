import React, { Component } from 'react';
import {View, Text, Button,TouchableOpacity,StyleSheet,Image } from 'react-native';
import {Router,Overlay,  Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import { TabBar } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ListCard from '../components/ListCard';


export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'redTab',
          data:{uname:'张三',uemail:'zhangsan@qq.com',userCounts:5,chapterCounts:5,signature:'我是张三',headimg:'images/timg.jpg',usex:'男'},
        };
      }
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

    onChangeTab(tabName) {
        this.setState({
          selectedTab: tabName,
        });
    }
    renderContent(pageText) {
        return (
          <View style={styles.me_card}>   
            <ListCard/>
          </View>
        );
      }
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
                        <Text style={styles.me_top_user}>{this.state.data.uname}</Text>
                        <Text style={styles.me_top_email}>{this.state.data.uemail}</Text>
                </View>
                <View style={styles.me_title}>
                    <Image style={styles.me_head} source={require('../images/pic1.jpg')}/>
                    <View style={styles.me_num}>
                        <View style={styles.me_sex}>
                            {/* <Image></Image> */}
                            <Text>{this.state.data.usex}</Text>
                        </View>
                        <View style={styles.me_atten}>
                            <Text>{this.state.data.userCounts}</Text>
                            <Text>关注</Text>
                        </View>
                        <View style={styles.me_collect}>
                            <Text>{this.state.data.chapterCounts}</Text>
                            <Text>收藏</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.me_btn}>
                        <Button title="编辑资料" color="#faa755" onPress={()=>Actions.edit()}/>
                </View>
                <View style={styles.me_sign}>
                    <Text>个性签名：{this.state.data.signature?this.state.data.signature:'这个人很懒，啥都没写'}</Text>
                </View>
                <View style={styles.me_nav}>
                    <TabBar style={styles.me_bar}
                        unselectedTintColor="#949494"
                        tintColor="#faa755"
                >
                        <TabBar.Item title="收藏列表" 
                                    style={styles.me_essay}
                                    selected={this.state.selectedTab === 'Tab1'}
                                    onPress={() => this.onChangeTab('Tab1')}
                        >
                            {this.renderContent(<ListCard/>)}                
                        </TabBar.Item>

                        <TabBar.Item title="关注列表" 
                                    style={styles.me_follow}
                                    selected={this.state.selectedTab === 'Tab2'}
                                    onPress={() => this.onChangeTab('Tab2')}
                        >
                            {this.renderContent(<ListCard/>)} 
                            {/* <Text>zhangsan</Text> */}
                        </TabBar.Item>
                    </TabBar>
                </View>

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
        height:150,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    me_card:{ 
        flex: 1,  
        backgroundColor: 'white',
        marginTop:50
    }
})
