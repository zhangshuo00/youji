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
            uid:'',
            chid:'',

    }
    }
    Clickfavorites=()=>{
        if(this.state.data[0].isCollection==0){
            var c =this.state.data;
            c[0].isCollection = 1;
            c[0].favorites+=1;
            this.setState({
                data:c
            })
            const post={
                uid:this.state.uid,
                chid:this.state.chid
            }
            console.log(post)
            fetch('http://majia.hbsdduckhouse.club/addFavorites',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
            })
        }else if(this.state.data[0].isCollection==1){
            var d =this.state.data;
            d[0].isCollection = 0;
            d[0].favorites-=1;
            this.setState({
                data:d
            })
            const post={
                uid:this.state.uid,
                chid:this.state.chid
            }
            console.log(post);
            fetch('http://majia.hbsdduckhouse.club/cancelCollection',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
            })
        }
    }

     Clicklike =()=>{
        if(this.state.data[0].isLike==0){
            var b =this.state.data;
            b[0].isLike = 1;
            b[0].likes += 1;
            this.setState({
                data:b
            })
            const post={
                uid:this.state.uid,
                chid:this.state.chid
            }
            console.log(post)
            fetch('http://majia.hbsdduckhouse.club/addLike',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data);
                Actions.refresh()
            })
        }else if(this.state.data[0].isLike==1){
            var a =this.state.data;
            a[0].isLike = 0;
            a[0].likes -= 1;
            this.setState({
                data:a
            })
            const post={
                uid:this.state.uid,
                chid:this.state.chid
            }
            console.log(post);
            fetch('http://majia.hbsdduckhouse.club/cancelLike',{
                method:'POST',
                // mode:'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify(post)
            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data);
            })
        }
    }

    async componentDidMount(){
        const post ={
            uid: this.props.uid,
            chid:await   AsyncStorage.getItem('chid').then(res=>res),
        }
        this.setState({
            uid:post.uid,
            chid:post.chid
        })
        console.log(post,'上传的数据')
        console.log(this.state.uid,'看uid')
        fetch('http://majia.hbsdduckhouse.club/sionple',{
            method:'POST',
            // mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({
                data:data,
            })
        })
    }

    render() {
        return (
            <View flexDirection='column' justifyContent='space-between'>
            <ScrollView style={{height:'93%'}}>
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
            <View style={{backgroundColor:'#fff',width:'100%',height:'7%'}}>
                {
                    this.state.data.map((item)=>(
                        <View flexDirection='row' style={{marginTop:20*s}}>
                        <TouchableOpacity onPress={this.Clicklike.bind(this)}>  
                        {
                            item.isLike ==0 ? 
                                <View  style={styles.likeView}>
                                <Icon name='staro' color={'rgb(250, 167, 85)'}  size={28}/>
                                <Text style={styles.likeText}>{item.likes==null?0:item.likes}</Text>
                                </View> :
                                <View  style={styles.likeView}>
                                <Icon name='star' color={'rgb(250, 167, 85)'}  size={28}/>
                                <Text  style={styles.likeText}>{item.likes==null?1:item.likes}</Text>
                                </View>
                        }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.Clickfavorites.bind(this)}> 
                        {
                            item.isCollection==0 ?
                                <View style={styles.likeView}>
                                <Icon name='hearto' color={'rgb(250, 167, 85)'}  size={28}/>
                                <Text style={styles.likeText}>{item.favorites==null?0:item.favorites}</Text>
                                </View> :
                                <View style={styles.likeView}>
                                <Icon name='heart' color={'rgb(250, 167, 85)'}  size={28}/>
                                <Text style={styles.likeText}>{item.favorites==null?1:item.favorites}</Text>
                                </View>
                        }
                        </TouchableOpacity>
                        </View>
                    
                    ))
                }
                    
            </View>
            </View>
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
    likeText:{
        marginLeft:20*s,
        textAlign:'center' ,
        textAlignVertical:'center'
    },
    likeView:{
        marginLeft:50*s,
        marginRight:100*s,
        flexDirection:'row'
    }
})