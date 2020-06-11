import React, { Component } from 'react'
import { Text, View,StyleSheet,ScrollView,ImageBackground,AsyncStorage,
    Dimensions,TouchableOpacity,TextInput, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Button from 'react-native-button';
import Emoji from 'react-native-emoji';

const {height,width} = Dimensions.get('window');

export default class MsgDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            uid:'',
            // other:'有纪团队',
            data:{msg:[],ruidInfo:{uname:''}},    
            text:'',
            x1:'你好',
            x2:'smile',
            x3:'',
            display:0
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
        // console.log(post)
        fetch('http://majia.hbsdduckhouse.club/getMsg',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data.msg[0]);
            for(var i=0;i<data.msg.length;i++){
                var message = data.msg[i].context;
                message = message.split('[')
                for(var a=0;a<message.length;a++){
                    message[a]=message[a].split(']')
                }
                message= [].concat.apply([], message);
                var len = message.length -1;
                if(len < 10){
                    for(var b=len;b<10;b++){
                        message.push('');
                    }
                }
                data.msg[i].context = message;
                // console.log(message);
            }
            // console.log(data.msg[0]);
            // var message = data.msg[0].context;
            // message = message.split('[')
            // for(var a=0;a<message.length;a++){
            //     message[a]=message[a].split(']')
            // }
            // // console.log(message[0].split(']'))
            // // message[1]=message[1].split(']');
            // // message[2]=message[2].split(']');
            // // message[3]=message[3].split(']');
            // message= [].concat.apply([], message);
            // console.log(message);
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
            console.log(post);
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
        // console.log(text)
        this.setState({text:text});
    }
    toEnd = ()=>{
        // AsyncStorage.clear();
        this.scrollview.scrollToEnd({animated:false});
    }

    emojiHide = ()=>{
        this.setState({display:1})
        // var newText = this.state.text + '[smile]';
        // console.log(newText);
        // this.setState({text:newText});
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
                                {/* <View style={styles.letterLi1}>
                                        <View style={styles.letterImg1} 
                                        style={{background:"url(" + require("../" +this.state.data.uidInfo.headimg) + ")"}}></View>
                                        <Image style={styles.letterImg1}  source={{uri:'https://www.hbsdduckhouse.club/images/k3mimknra杰尼龟.jpg'}}></Image>
                                        <View style={styles.letterTrian1}></View>
                                        <Text style = {styles.letterText1}>
                                            {this.state.x1}
                                            <Emoji name ={this.state.x2} style = {{fontSize:20}} />
                                            {this.state.x1}
                                            <Emoji name ={this.state.x2} style = {{fontSize:20}} />
                                            {this.state.x1}
                                            <Emoji name ='angry' style = {{fontSize:20}} />
                                        </Text>
                                        <Emoji name ='smile' style = {styles.letterText1}/>
                                </View> */}
                            {
                                this.state.data.msg.map((tag,idx)=>
                                tag.sender == 'me'?
                                (<View key={idx} style={styles.letterLi1}>
                                    {/* <View style={styles.letterImg1} 
                                    style={{background:"url(" + require("../" +this.state.data.uidInfo.headimg) + ")"}}></View> */}
                                    <Image style={styles.letterImg1}  source={{uri:'https://www.hbsdduckhouse.club/' + this.state.data.uidInfo.headimg}}></Image>
                                    <View style={styles.letterTrian1}></View>
                                    <Text style={styles.letterText1}>
                                        {tag.context[0]}
                                        <Emoji name ={tag.context[1]} style = {{fontSize:20}} />
                                        {tag.context[2]}
                                        <Emoji name ={tag.context[3]} style = {{fontSize:20}} />
                                        {tag.context[4]}
                                        <Emoji name ={tag.context[5]} style = {{fontSize:20}} />
                                        {tag.context[6]}
                                        <Emoji name ={tag.context[7]} style = {{fontSize:20}} />
                                        {tag.context[8]}
                                        <Emoji name ={tag.context[9]} style = {{fontSize:20}} />
                                    </Text>
                                </View>)
                                :
                                (<View key={idx} style={styles.letterLi}>
                                    {/* <View style={styles.letterImg} style={{background:"url(" + require("../" +this.state.data.ruidInfo.headimg) + ")"}}></View> */}
                                    <Image style={styles.letterImg}  source={{uri:'https://www.hbsdduckhouse.club/' + this.state.data.ruidInfo.headimg}}></Image>
                                    <View style={styles.letterTrian}></View>
                                    <Text style={styles.letterText}>
                                        {tag.context[0]}
                                        <Emoji name ={tag.context[1]} style = {{fontSize:20}} />
                                        {tag.context[2]}
                                        <Emoji name ={tag.context[3]} style = {{fontSize:20}} />
                                        {tag.context[4]}
                                        <Emoji name ={tag.context[5]} style = {{fontSize:20}} />
                                        {tag.context[6]}
                                        <Emoji name ={tag.context[7]} style = {{fontSize:20}} />
                                        {tag.context[8]}
                                        <Emoji name ={tag.context[9]} style = {{fontSize:20}} />
                                    </Text>
                                </View>))
                                // <Link to={'/topics/'+item.id}>{item.title}</Link>
                            }
                        </View>
                    </ScrollView>
                </ImageBackground>
                <View 
                    style={{
                        flexDirection:'row',
                        position:'absolute',
                        bottom:35,
                        left:5,
                        display:'flex'
                    }}
                >
                    <View style={{
                         height:80,
                         width:width*0.4,
                         backgroundColor:'white',
                         borderRadius:10,
                         padding:4,
                         flexWrap:'wrap',
                         flexDirection:'row',
                         display:this.state.display==1?'flex':'none'
                    }}>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[smile]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'smile'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[angry]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'angry'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[coffee]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'coffee'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[cry]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'cry'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[dog]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'dog'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[cat]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'cat'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[brid]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'bird'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[blush]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'blush'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[scream]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'scream'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[beer]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'beer'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[basketball]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'basketball'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:2}} onPress={()=>{var newText = this.state.text + '[rice]';this.setState({text:newText,display:0});}}>
                            <Emoji name ={'rice'} style = {{fontSize:20}} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.emojiTrian}></View>
                </View>
                <View style={styles.letterBoxs}>
                    <TouchableOpacity onPress={() => this.emojiHide()} style={{marginLeft:5}}>
                        <Emoji name ='smile' style = {{fontSize:27}} />
                    </TouchableOpacity>
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
        left:0,
    },
    // hideBox:{
    //     flexDirection:'row',
    //     // marginTop:80,
    //     position:'absolute',
    //     // top:'50%',
    //     bottom:35,
    //     left:5,
    // },
    emojiBox:{
        height:80,
        width:width*0.4,
        backgroundColor:'white',
        borderRadius:10,
        padding:4,
        flexWrap:'wrap',
        flexDirection:'row',
    },
    emojiTrian:{
        marginLeft: -width*0.38,
        marginTop: 80,
        width: 0,
        height: 0,
        borderTopWidth: 15,
        borderTopColor: 'white',
        borderRightWidth: 15,
        borderRightColor: 'transparent',
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        borderBottomWidth: 15,
        borderBottomColor: 'transparent',
    },
    letterButton:{
        height: 30,
        width: width*0.16,
        marginLeft:width*0.02,
        borderRadius: 15,
        backgroundColor: '#FAA755',
        color:'#fff',
        paddingTop:2,
        marginTop:2,
    },
    letterInput:{
        marginLeft:width*0.01,
        width: width*0.71,
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
