import React, { Component } from 'react'
import { Text, View,StyleSheet,ScrollView,ImageBackground,AsyncStorage,
    Dimensions,TouchableOpacity,TextInput, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from 'react-native-button';

const {height,width} = Dimensions.get('window');

export default class MsgDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            uid:'',
            // other:'有纪团队',
            data:{msg:[],ruidInfo:{uname:''}},    
            text:'',
            // data:{
            //     ruidInfo:{headimg:require("../images/lisi.jpg"), uid:"k3mimknra",uname:"李四"},
            //     uidInfo:{headimg:require("../images/k3i297defyouji.jpg"), uid:"k3i297def",uname:"有纪"},
            //     msg:[{bid: 1, context: "你好，三哥", aid: 2, sender: "he"},
            //         {bid: 2, context: "你好，四弟", aid: 1, sender: "me"},
            //         {bid: 3, context: "好喜欢你写的那篇文章呀啊啊啊啊啊啊啊啊啊啊啊", aid: 2, sender: "he"},
            //         {bid: 4, context: "是吗，谢谢夸奖，哈哈", aid: 1, sender: "me"},
            //         {bid: 10, context: "wdnmd", aid: 1, sender: "me"},
            //         {bid: 11, context: "wdnmd,too", aid: 2, sender: "he"},
            //         {bid: 19, context: "欧拉欧拉欧拉欧拉欧拉欧拉欧拉欧拉", aid: 1, sender: "me"},
            //         {bid: 20, context: "木大木大木大木大木大木大木大木大", aid: 2, sender: "he"},
            //         {bid: 21, context: "死吧你", aid: 1, sender: "me"},
            //         {bid: 22, context: "w(ﾟДﾟ)w", aid: 1, sender: "me"},
            //         {bid: 23, context: "这个气泡样式要改一下，有点太靠下", aid: 1, sender: "me"},
            //         {bid: 24, context: "看看输入框的字体大小能不能调大点，有点费眼", aid: 1, sender: "me"},
            //         {bid: 28, context: "产品经理来催了", aid: 2, sender: "he"},
            //         {bid: 29, context: "你好", aid: 2, sender: "he"},
            //         {bid: 30, context: "你也好", aid: 1, sender: "me"},
            //         {bid: 31, context: "西巴", aid: 2, sender: "he"},
            //         {bid: 32, context: "阿西吧", aid: 1, sender: "me"},
            //         {bid: 33, context: "？？？？？？？", aid: 2, sender: "he"},
            //         {bid: 34, context: "3r2ew", aid: 1, sender: "me"},
            //         {bid: 35, context: "dsadas", aid: 1, sender: "me"},
            //         {bid: 36, context: "dasda", aid: 1, sender: "me"}
            //     ]
            // }
        }
    }

    head(){
        console.log(1)
    }

    async componentDidMount(){
        // this.scrollview.scrollToEnd({animated: true});
        // this.toEnd()
        // await AsyncStorage.getItem('uid')
        // .then((res)=>{
        //     this.setState({ uid:res.uid })
        //     console.log(res)
        // })
        const post={
            uid:await AsyncStorage.getItem('uid').then(res=>res),
            ruid:this.props.ruid
        }
        console.log(post)
        fetch('http://majia.hbsdduckhouse.club/getMsg',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                data:data})
        })
    }

    async textAdd(){
        console.log(this.state.text);
        // var list = this.state.data;
        // console.log(list.msg)
        // var a = list.msg.lenght;
        // list.msg[a] = {bid: a, context: this.state.text, aid: 1, sender: "me"};
        // this.setState({data:list});
        // console.log(this.state.data.msg[a]);

        if(this.state.text != ''){
            const post={
                uid:await AsyncStorage.getItem('uid').then(res=>res),
                ruid:this.props.ruid,
                msg:this.state.text
            }
            await fetch('http://majia.hbsdduckhouse.club/sendMsg',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                // this.reset();
                // 根据返回的消息，渲染响应的页面
                this.componentDidMount();
            })
        }
        this.setState({text:''});
        this.toEnd()
    }

    texthandle = (text)=>{
        console.log(text)
        this.setState({text:text});
    }
    toEnd = ()=>{
        // AsyncStorage.clear();
        this.scrollview.scrollToEnd({animated:false});
    }

    render() {
        return (
            <View style={{flex:1}}>
                <ImageBackground style={{flex:1}} resizeMode={"cover"} source={require('../images/pl.jpg')}>
                    <ScrollView ref={(c) => this.scrollview = c} style={{marginBottom:50}}
                        onScroll={(event)=>{
                            // console.log(event.nativeEvent.contentOffset.x);//水平滚动距离
                            // console.log(event.nativeEvent.contentOffset.y);//垂直滚动距离            
                        }}
                        // onContentSizeChange={(event) => {
                        //     console.log(event.nativeEvent.height);
                        //   }}
                        >
                        {/* <TouchableOpacity
                            onPress={() => this.toEnd()}>
                            <Text>到底部</Text>
                        </TouchableOpacity> */}
                        <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                            <TouchableOpacity style={styles.headIcon} onPress={()=>{this.head()}}><Icon name='bars' color={'white'} size={28}></Icon></TouchableOpacity>
                            <Text style={styles.headText}>{this.props.rname}</Text>
                        </View>
                            <View style={{paddingBottom:50}}>
                            {
                                this.state.data.msg.map((tag,idx)=>
                                tag.sender == 'me'?
                                <View key={idx} style={styles.letterLi1}>
                                    {/* <View style={styles.letterImg1} 
                                    style={{background:"url(" + require("../" +this.state.data.uidInfo.headimg) + ")"}}></View> */}
                                    <Image style={styles.letterImg1}  source={{uri:'https://zhangshuo00.github.io/youji/YouJi/src/' + this.state.data.uidInfo.headimg}}></Image>
                                    <View style={styles.letterTrian1}></View>
                                    <Text style={styles.letterText1}>{tag.context}</Text>
                                </View>:<View key={idx} style={styles.letterLi}>
                                    {/* <View style={styles.letterImg} style={{background:"url(" + require("../" +this.state.data.ruidInfo.headimg) + ")"}}></View> */}
                                    <Image style={styles.letterImg}  source={{uri:'https://zhangshuo00.github.io/youji/YouJi/src/' + this.state.data.ruidInfo.headimg}}></Image>
                                    <View style={styles.letterTrian}></View>
                                    <Text style={styles.letterText}>{tag.context}</Text>
                                </View>)
                                // <Link to={'/topics/'+item.id}>{item.title}</Link>
                            }
                        </View>
                    </ScrollView>
                </ImageBackground>
                <View style={styles.letterBoxs}>
                    <TextInput style={styles.letterInput} multiline={true} value = {this.state.text}
                        keyboardType = 'default' onChangeText={this.texthandle}></TextInput>
                        <Button style={styles.letterButton} onPress={() => this.textAdd()}>发送</Button>
                </View> 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headText:{
        marginRight:width*0.22,
        width:width*0.56,
        textAlign:'center',
        fontSize:22,
        color:'white'
    },
    headIcon:{
        marginLeft:width*0.02,
        width:width*0.2,
    },
    letterBoxs:{
        flexDirection:'row',
        // marginTop:80,
        position:'absolute',
        // top:'50%',
        bottom:10,
        left:0
    },
    letterButton:{
        height: 30,
        width: width*0.17,
        marginLeft:width*0.02,
        borderRadius: 15,
        backgroundColor: '#FAA755',
        color:'#fff',
        paddingTop:2,
        marginTop:2,
    },
    letterInput:{
        marginLeft:width*0.02,
        width: width*0.77,
        // height: 38,
        minHeight:30,
        // maxHeight:38,
        borderRadius: 15,
        paddingTop:2,
        paddingBottom:2,
        paddingLeft:10,
        paddingRight:12,
        flexDirection:'row',
        borderColor:'rgb(250, 167, 85)',
        borderWidth:1,
        backgroundColor:'white',
    },
    letterLi:{
        flexDirection:'row',
        width:width,
        minHeight:46,
        marginBottom:10,
    },
    letterLi1:{
        flexDirection:'row-reverse',
        width:width,
        minHeight:46,
        marginBottom:10,
    },
    letterImg:{
        marginTop: 10,
        height: 46,
        width: 46,
        borderRadius: 23,
        marginLeft: width*0.05
    },
    letterImg1:{
        marginTop: 10,
        height: 46,
        width: 46,
        borderRadius: 23,
        marginRight: width*0.05
    },
    letterTrian:{
        marginLeft: -3,
        marginTop: 21,
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderTopColor: 'transparent',
        borderRightWidth: 10,
        borderRightColor: 'white',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent',
    },
    // letterITrian1:{
    //     margin-right: 1%;
    //     margin-top: 23,
    //     width: 0;
    //     height: 0;
    //     float: right;
    //     border-top: 10px solid transparent;
    //     border-left: 10px solid white;
    //     border-bottom: 10px solid transparent;
        
    // },
    letterTrian1:{
        marginRight: -4,
        marginTop: 21,
        width: 0,
        height: 0,
        borderTopWidth: 10,
        borderTopColor: 'transparent',
        borderLeftWidth: 10,
        borderLeftColor: 'white',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderBottomWidth: 10,
        borderBottomColor: 'transparent',
    },
    letterText:{
        margin: 0,
        fontSize: 20,
        marginTop: 18,
        // marginLeft:5,
        maxWidth: width*0.58,
        /* height: 40, */
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    letterText1:{
        // textAlign: 'left',
        margin: 0,
        fontSize: 20,
        marginTop: 18,
        maxWidth: width*0.58,
        /* height: 40, */
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 5,
    }
})
