import React, { Component } from 'react';
import {View, Text,TouchableOpacity,StyleSheet,Image,AsyncStorage,Dimensions} from 'react-native';
import {Router,Overlay,  Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import { TabBar } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from 'react-native-button';
import SaveList from './SaveList';

const {width} = Dimensions.get('window');

export default class Me extends Component {
    constructor(props) {
        super(props);
        this.state = {
          selectedTab: 'redTab',
          display:1,
          data:{uname:'张三',uemail:'zhangsan@qq.com',userCounts:5,chapterCounts:5,signature:'我是张三',headimg:'images/timg.jpg',usex:'男'},
          datas:''
        };
      }
    
    async componentDidMount(){
        const post ={
            uid:await AsyncStorage.getItem('uid').then(res=>res),
        }
        // console.log(post);
        fetch('http://majia.hbsdduckhouse.club/me',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data[0]);
            this.setState({
                data:data[0],
                datas:data[1]
            })
            if(data[0].usex == '男'){
                this.setState({
                    seximg:'images/nan.png'
                })
            }
            else{
                this.setState({
                    seximg:'images/nv.png'
                })
            }
        })
    }

    // onChangeTab(tabName) {
    //     this.setState({
    //       selectedTab: tabName,
    //     });
    // }
    // renderContent(pageText) {
    //     return (
    //       <View style={styles.me_card}>   
    //         <ListCard/>
    //       </View>
    //     );
    //   }

    saveList=()=>{
        this.setState({
            display:1
        })
    }

    followList=()=>{
        this.setState({
            display:0
        })
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
                            onPress={()=>Actions.sider()}
                        />
                        </View>
                        <View style={styles.me_top_user}>
                            <Text style={{color:'#fff'}}>{this.state.data.uname}</Text>
                        </View>
                        <View style={styles.me_top_email}>
                            <Text>{this.state.data.uemail}</Text>
                        </View>
                </View>
                <View style={{backgroundColor:'white'}}>
                    <View style={styles.me_title}>
                        <Image style={styles.me_head} source={{uri:'https://zhangshuo00.github.io/youji/YouJi/src/' +this.state.data.headimg}}/>
                        <View style={styles.me_num}>
                            <View style={styles.me_sex}>
                                {/* <Image style={styles.me_imgsex} source={require('./'+this.state.seximg)}/> */}
                                <Image style={styles.me_imgsex} source={{uri:'https://zhangshuo00.github.io/youji/YouJi/src/' +this.state.seximg}}/>
                                <Text style={{fontSize:18}}>{this.state.data.usex}</Text>
                            </View>
                            <View style={styles.me_atten}>
                                <Text style={{fontSize:18}}>   {this.state.data.userCounts}</Text>
                                <Text style={{fontSize:18}}>关注</Text>
                            </View>
                            <View style={styles.me_collect}>
                                <Text style={{fontSize:18}}>   {this.state.data.chapterCounts}</Text>
                                <Text style={{fontSize:18}}>收藏</Text>
                            </View>
                        </View>
                    </View>
                    <Button style={styles.me_btn} onPress={()=>Actions.edit()}>编辑资料</Button>
                    <Text style={styles.me_sign}>个性签名：{this.state.data.signature?this.state.data.signature:'这个人很懒，啥都没写'}</Text>
                </View>
                <View style={{backgroundColor:'grey',width:width,height:1}}></View>
                <View style={{backgroundColor:'white',paddingBottom:10}}>
                    <View style={{width:width*0.6,marginLeft:width*0.2,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={()=>this.saveList()}>
                            <Text style={{fontSize:22,marginTop:12}} >收藏列表</Text>
                            <View style={{height:4,width:'100%',backgroundColor:'#faa755',display:this.state.display==1?'flex':'none'}}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.followList()}>
                            <Text style={{fontSize:22,marginTop:12}}>关注列表</Text>
                            <View style={{height:4,width:'100%',backgroundColor:'#faa755',display:this.state.display==0?'flex':'none'}}></View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor:'black',width:width,height:1}}></View>
                <View>
                {
                    this.state.display == 1 ?
                        <SaveList/>
                    :
                    <View></View>
                }
                </View>
                {/* <View style={styles.me_nav}>
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
                        </TabBar.Item>
                    </TabBar>
                </View> */}

            </View>
        )
    }
}
const styles = StyleSheet.create({
    me_top:{
        backgroundColor:'#faa755'
    },
    me_top_user:{
        flex:1,
        marginLeft:220,
        marginBottom:20,
        position:"absolute",
        top:10
    },
    me_top_email:{
        flex:1,
        marginLeft:180,
        position:"absolute",
        top:30
    },
    me_title:{
        flex:1,
        flexDirection: 'row',
        flexWrap:'wrap',
        marginLeft:20,
        marginTop:10,
        width:width,
        // height:300,
        backgroundColor:'white'
    },
    me_head:{
        borderRadius:55,
        width:100,
        height:100
    },
    me_num:{
        flex:1,
        flexDirection: 'row',
        width:width-100,
        marginLeft:40,
        marginTop:-30,
        textAlign:'center',
        alignItems:'center'
    },
    me_sex:{
        width:100
    },
    me_imgsex:{
        width:20,
        height:20
    },
    me_atten:{
        width:100
    },
    me_collect:{
        width:100
    },
    me_btn:{
        paddingTop:5,
        width:270,
        borderRadius:18,
        marginTop:70,
        marginLeft:145,
        color:'white',
        backgroundColor:"#faa755",
        height:36
    },
    me_sign:{
        marginLeft:15,
        marginTop:10,
        fontSize:18,
        color:'grey',
        marginBottom:10
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
