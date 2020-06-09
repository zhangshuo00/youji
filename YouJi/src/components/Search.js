import React, { Component} from 'react'
import { View, Text, StyleSheet, TextInput, Button,Alert, TouchableOpacity,Image,Dimensions,AsyncStorage } from 'react-native'
import { Card,Tag } from '@ant-design/react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('window');

export default class Search extends Component {

    // let [datas,setdatas] = useState([]);
    // const [history, setHistory] = useState(['安安']);
    // const [value,setValue] = useState('');
    // const [display,setDisplay] = useState(true);

    constructor(){
        super();
        this.state = {
            datas:[],
            history:['无'],
            value:'',
            display:true
        }
    }

    async componentDidMount(){
        const post ={
            uid: await AsyncStorage.getItem('uid').then(res=>res),
        }
        fetch('http://majia.hbsdduckhouse.club/getSearchHistory',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.keyword);
            this.setState({
                history:data.keyword
            })
        })
    }

    texthandle=async (event)=>{
        // setHistory([...history,event.nativeEvent.text])
        // setValue(event.nativeEvent.text);
        await this.setState({
            value:event.nativeEvent.text,
            display:false
        })
        // console.log(this.state.value)

         //添加搜索记录
         //检测搜索记录是否重复
         for(var i=0,a=0;i<this.state.history.length;i++){
             if(this.state.value == this.state.history[i]){
                 console.log('已进行过相关搜索');
                 a++;
             }
             if(i==this.state.history.length-1 && a==0){
                const posts ={
                    uid: await AsyncStorage.getItem('uid').then(res=>res),
                    keyword:this.state.value
                }
                fetch('http://majia.hbsdduckhouse.club/addSearchHistory',{
                    method:'POST',
                    // mode:'cors',
                    headers: {'Content-Type': 'application/json'},
                    body:JSON.stringify(posts)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
                })        
             }
         }
        
        const post ={
            keywords:this.state.value
        }
        // setDisplay(false)
        console.log(post);
        fetch('http://majia.hbsdduckhouse.club/discoverSearch',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            for(var a=0;a<data.length;a++){
                data[a].ch_headimg = 'https://www.hbsdduckhouse.club/'+data[a].ch_headimg;
                if(!data[a].favorites){
                    data[a].favorites = 0
                }
                if(!data[a].likes){
                    data[a].likes = 0
                }
            }
            console.log(data);
            // setdatas(data);
            if(data != []){
                this.setState({
                    datas:data
                })
            }
            else{
                this.setState({
                    datas:false
                }) 
            }
            // 根据返回的消息，渲染响应的页面
        })
    }

    searchAgain=async (item)=>{
        // console.log(item);
        await this.setState({
            value:item,
            display:false
        })
        const post ={
            keywords:this.state.value
        }
        // setDisplay(false)
        console.log(post);
        fetch('http://majia.hbsdduckhouse.club/discoverSearch',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            for(var a=0;a<data.length;a++){
                data[a].ch_headimg = 'https://www.hbsdduckhouse.club/'+data[a].ch_headimg;
                if(!data[a].favorites){
                    data[a].favorites = 0
                }
                if(!data[a].likes){
                    data[a].likes = 0
                }
            }
            console.log(data);
            // setdatas(data);
            this.setState({
                datas:data
            })
            // console.log(this.state.datas?1:2);
            // 根据返回的消息，渲染响应的页面
        })
    }

    delSearchHistory=async (item)=>{
        let that=this;
        Alert.alert('提示',
        '是否删除该搜索历史?', 
        [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () =>{
                that.delHistory(item)
            }},
        ])
    }
    delHistory= async(item)=>{
        // console.log(item);
        await this.setState({
            value:item
        })
        const post ={
            uid: await AsyncStorage.getItem('uid').then(res=>res),
            keyword:this.state.value
        }
        // setDisplay(false)
        console.log(post);
        fetch('http://majia.hbsdduckhouse.club/delSearchHistory',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.componentDidMount()
        })
    }

    render(){
        if(this.state.display){
            return(
                <View>
                    <View style={styles.head}>
                        <TextInput 
                            placeholder="请输入您要搜索的关键字"
                            style={styles.search} 
                            autoFocus={true}
                            onSubmitEditing={(event)=>{this.texthandle(event)}}
                        />
                        <Icon size={24} style={{position:'absolute',right:45,top:12}} name="search1"/>
                    </View>
                    <Text style={{fontSize:16,marginLeft:20,marginTop:10}}>搜索历史</Text>
                    <View style={styles.history}>
                        {
                            this.state.history.map((item)=>(
                                <TouchableOpacity style={styles.historyBtn}>
                                    <TouchableOpacity  onPress={()=>{this.searchAgain(item)}}><Text style={{margin:0,color:'white'}}>{item} </Text></TouchableOpacity>
                                    <Icon name='close' color={'white'} size={10} style={{marginTop:-2}}  onPress={()=>{this.delSearchHistory(item)}}></Icon>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    {/* <View style={styles.history}>
                        {
                            this.state.history.map((item)=>(
                                <View style={{ padding: 10,marginLeft:10 }}>
                                    <Tag closable onClose={() => {this.delSearchHistory(item)}} afterClose={() => {console.log('afterClose');}}>
                                        {item}
                                    </Tag>
                                </View>
                            ))
                        }
                    </View> */}
                </View>
            )
        }
        else{
            return(
                <View>
                    <View style={styles.head}>
                                <TextInput 
                                    placeholder="请输入您要搜索的关键字"
                                    style={styles.search} 
                                    autoFocus={true}
                                    onSubmitEditing={(event)=>{this.texthandle(event)}}
                                />
                                <Icon size={24} style={{position:'absolute',right:45,top:12}} name="search1"/>
                            </View>
                    <View style={styles.card}>
                    {
                        this.state.datas == false ?
                        (<View style={{width:width,justifyContent:'center', flexDirection:'row',flexWrap:'wrap',}}> 
                            <Text style={{fontSize:20,marginTop:50}}>未查询到相关内容</Text> 
                        </View>)
                        :
                        this.state.datas.map(card=>
                            <Card>
                                {/* <Card.Header
                                    title={card.uname}
                                    thumb={card.ch_headimg}
                                    thumbStyle={{width: 30,height: 30,borderRadius:15}}
                                /> */}
                                <Card.Body>
                                    <View style={{width:width,flexDirection:'row',alignItems:'center',marginBottom:10}}>
                                        <Image style={{width:width*0.3,marginLeft:10,width: 30,height: 30,borderRadius:15}} source={{uri:card.ch_headimg}}></Image>
                                        <Text style={{width:width*0.5,marginLeft: 10,fontSize:28}}>{card.title}</Text>
                                    </View>
                                    <Text style={{marginLeft: 30}}>{card.context}</Text>
                                    <Text style={{position:'relative',left:width*0.8,bottom:10}}>{card.chdate}</Text>
                                </Card.Body>
                                <Card.Footer
                                    content={
                                        <View style={{display: 'flex',flexDirection: 'row',marginTop: -18}}>
                                            <Image source={{uri: 'https://i.loli.net/2020/04/13/cWKiSzxOIo8fhtv.png'}} style={styles.cardBottomImage}/>
                                            <Text>  {card.favorites}</Text>
                                            <Image source={{uri: 'https://i.loli.net/2020/04/13/kbr2KtWGMfvl51E.png'}} style={styles.cardBottomImage}/>
                                            <Text>  {card.likes}</Text>
                                        </View>
                                    }
                                />
                            </Card>
                        )
                    }
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    search: {
        width:'85%',
        height:40,
        marginTop:5,
        backgroundColor:'#eeeeee',
        borderRadius:10,
    },
    head: {
        height:50,
        justifyContent:'center',
        flexDirection:'row',
        flexWrap:'wrap',
        backgroundColor:'rgb(250, 167, 85)'
    },
    history: {
        display:'flex',
        flexDirection:'row',
        flexWrap:'wrap'
    },
    historyBtn: {
        display:'flex',
        flexDirection:'row',
        paddingBottom:5,
        paddingTop:5,
        minWidth: 20,
        marginLeft:20,
        marginTop:10,
        backgroundColor:'#909399',
        paddingLeft:5,
        paddingRight:3,
        borderRadius:5,
        marginRight:0
    },
    card: {
        paddingTop: 3,
        margin:0
    },
    cardTitle: {

    },
    cardContext: {
        display:'flex',
        height: 100,
        flexDirection: 'row',
        marginLeft: 30
    },
    cardContextImg: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginRight: 10
    },
    cardBottomImage: {
        width: 20,
        height: 20,
        marginLeft: 20
    }
})