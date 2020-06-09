import React, { Component } from 'react'
import { Text, View, TextInput,Dimensions,StyleSheet,TouchableOpacity,Image,AsyncStorage,FlatList,ScrollView} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon4 from 'react-native-vector-icons/Entypo'
import Icon6 from 'react-native-vector-icons/Fontisto'
import geolocation from "@react-native-community/geolocation"

const {width,scale,height} = Dimensions.get('window');
const s = width / 640;
export default class Sionnew extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:require('../images/setBack.png'),
            uid:'',
            tags:'',
            title:'点击添加标题',
            context:'点击添加文本',
            checked: false,
            lists:[],
            uplists:[],
            dropDown_box: false,   // 下拉菜单 显隐状态
            dropDown_box_Text:[],  // 传值
            dropDownText:'',//显示
            topic_name:'',
            longitude: '',//经度
            latitude: '',//纬度
            position: undefined,//位置名称
        }
    }


///////////////////////////////////
    choosepics = ()=>{
        ImagePicker.openPicker({
            multiple: true,
            includeBase64:true
        }).then(images => {
            var lists = this.state.lists;//图片地址
            var uplists = this.state.uplists;//图片base64编码
            for(var i in images){
                lists.push(images[i].path);
                uplists.push( 'data:image/jpeg;base64,' + images[i].data);
            }
            this.setState({
                lists:lists,
                uplists:uplists
            })
            console.log(this.state.lists)
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
    }
    takepic = ()=>{
        ImagePicker.openCamera({
            width:300,
            height:400,
            cropping:true,
            includeBase64:true
        }).then(image=>{
            var lists = this.state.lists;
            var uplists = this.state.uplists;
            lists.push(image.path);
            uplists.push(image.data);
            this.setState({
                lists:lists,
                uplists:'data:image/jpeg;base64,' + images[i].data
            })
        });
        ImagePicker.clean().then(() => { 
            console.log('removed all tmp images from tmp directory');
        }).catch(e => { 
            console.log(e)
        });
    }
    rechoosepics = ()=>{
        this.setState({
            lists:[],
            uplists:[]
        })
    }

      addSion=async()=>{
        var tags=this.props.tags
        const post ={
            uid:await AsyncStorage.getItem('uid').then(res=>res),
            tags:await AsyncStorage.getItem('tags').then(res=>res),
            title:this.state.title,
            context:this.state.context,
            imgData:this.state.uplists,
            isShare: this.state.checked ? 1 : 0,
            topic:this.state.topic_name,
            location:this.state.position
          }
          console.log(post,'posi');
        fetch('http://majia.hbsdduckhouse.club/addSionple',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.msg==='success' ){
            alert('保存成功','', [
              { text: '确定', onPress: () => console.log('cancel') },
              ]) 
          }
        })
        Actions.sion({tag:this.props.tag})
      }

    // 下拉菜单 显隐状态          
    dropDown_box_Toggle() {
        fetch('http://majia.hbsdduckhouse.club/getTopics')
        .then((res)=>res.json())
        .then((res)=>{
            var dropDown_box_Text =this.state.dropDown_box_Text
            for(var i in res){
                dropDown_box_Text.push("#"+res[i].topic_name+"#");
            }
            this.setState({
                dropDown_box_Text:dropDown_box_Text,
                dropDown_box:true
            })
        })   
    }


    //点击选择话题
    dropDown_box_Fun(){
        if(this.state.dropDown_box === true) {
            return(
                <View 
                flexDirection='row'
                // justifyContent='space-between' 
                style={{borderRadius: 4,borderWidth: 1,borderColor: '#fff',marginBottom:10,backgroundColor:'#fff'}}>
                    {this.state.dropDown_box_Text.map((item)=>(
                        <TouchableOpacity
                        style={{ fontSize:30*s,height:50*s,padding: 0,paddingLeft: 10}}
                        onPress={()=>this.setState({
                                                        dropDownText:item,
                                                        topic_name:item.substr(0, item.length - 1).slice(1),
                                                        dropDown_box: false,
                                                        })}>
                            <Text style={{fontSize:30*s,color:'orange'}}>{item}</Text>
                        </TouchableOpacity>
                    ))
                    }
                </View>
            )
        }
    }

    share=()=>{
        console.log(this.state.checked)
        if(!this.state.checked){
            this.setState({
                checked:true
            })
            alert('成功分享')
        }
        if(this.state.checked){
            alert('成功分享')
        }
    }


    getPositions = () => {//定位
        return new Promise(() => {
            /** 获取当前位置信息 */
            console.log('123')
            
            navigator.geolocation = geolocation;
            navigator.geolocation.getCurrentPosition(
                location => {
                    this.setState({
                        longitude: location.coords.longitude,//经度
                        latitude: location.coords.latitude,//纬度
                    });
                    //通过调用高德地图逆地理接口，传入经纬度获取位置信息
                    fetch(`http://restapi.amap.com/v3/geocode/regeo?key=97c933e33025b3843b40016900074704&location=${this.state.longitude},${this.state.latitude}&radius=1000&extensions=all&batch=false&roadlevel=0`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: ``
                    })
                        .then((response) => response.json())
                        .then((jsonData) => {
                            // console.log(jsonData)
                                 try {
                                this.setState({
                                    //city: jsonData.regeocode.addressComponent.city,
                                    //district: jsonData.regeocode.addressComponent.district,
                                    //street: jsonData.regeocode.addressComponent.township,
                                    position: jsonData.regeocode.formatted_address,
                                });
                            } catch (e) {

                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                },
                error => {
                    console.error(error);
                }
            );

       })
    }

    render() {
        return (
            <ScrollView>
            <View>
                <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                    <Text style={styles.headText}>新建笔记</Text>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>{this.addSion()}}>
                        <Text style={{color:'white',fontSize:18}}>保存</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent:'center', marginTop:30*s }}>
                    <TextInput 
                        placeholder='点击添加标题'
                        textAlignVertical="top"
                        multiline={true}
                        onChangeText={(text)=>{
                          this.setState({
                            title:text
                          })
                        }}
                        style={{ fontSize:30*s,  borderStyle: "solid",width:"100%",height: 80*s,padding: 0,marginBottom:15,paddingLeft: 10,backgroundColor:'#fff'}}/>
                    <View>                
                        <TouchableOpacity
                        style={{ fontSize:30*s,  width:"100%",height:50*s,padding: 0,marginBottom:10,paddingLeft: 10,backgroundColor:'#fff'}}
                        onPress={()=>{this.dropDown_box_Toggle(),this.setState({dropDown_box_Text:[]})}}>
                            <Text style={{fontSize:30*s,color:'#a0a3a7'}}>选择文章所属于的话题：{this.state.dropDownText}</Text>
                        </TouchableOpacity>
                            {this.dropDown_box_Fun()}
                    </View>
                    <TextInput 
                        placeholder='点击添加内容'
                        textAlignVertical="top"
                        multiline={true}
                        onChangeText={(text)=>{
                            this.setState({
                              context:text
                            })
                          }}
                        style={{fontSize:30*s,borderStyle: "solid",width:"100%",height: 300*s,paddingLeft: 10,backgroundColor:'#fff'}}/>
                </View>
                <View style={styles.picchoose}>
                                <Text style={styles.pictext}>添加图片</Text>
                                {/* //三个图标按钮 */}
                                <TouchableOpacity onPress={this.choosepics}>
                                    <Icon2 size={45*s} style={styles.iconpic} name='image-plus'/>
                                </TouchableOpacity>
                                <Text style={{width:0.01*width,}}></Text>
                                <TouchableOpacity onPress={this.takepic}>
                                    <Icon4 size={40*s} style={styles.iconpic} name='camera'/>
                                </TouchableOpacity>
                                <Text style={{width:0.03*width,}}></Text>
                                <TouchableOpacity onPress={this.rechoosepics}>
                                    <Icon6 size={35*s} style={styles.doiconpic} name='redo'/>
                                </TouchableOpacity>
                            </View>

                            <FlatList 
                                style={styles.picbox}
                                data={this.state.lists}
                                numColumns={3}
                                ListFooterComponent={
                                    <View style={{
                                        height:0.03*width
                                    }}>
                                    </View>
                                }
                                renderItem={({item})=>(
                                    <Image
                                        style={styles.pics}
                                        resizeMode="cover"
                                        source={{uri:`${item}`}}
                                    />
                                )}
                                /> 
                    <View flexDirection='row'justifyContent='space-between' style={{backgroundColor:'#fff'}}>
                        <TouchableOpacity  onPress={this.getPositions}>
                            <Text style={styles.PositionStyle}>获取定位:</Text>
                            <Text>{this.state.position}</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity onPress={this.share}>
                            <Text  style={styles.PositionStyle}>点击分享</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            </ScrollView>
        )
    }
}
const styles =StyleSheet.create({
    PositionStyle:{
        backgroundColor:'#D3D3D3',
        borderRadius:10,
        fontSize:15,
        color:'#555',
        width:150*s,
        textAlign:'center' ,
        textAlignVertical:'center'
    },
    TextStyle:{
        marginTop:20*s,
        marginRight:30*s,
        fontSize:30*s
    },
    ButtonStyle:{
        width:300*s,
        height:50*s,
        paddingTop:8*s,
        backgroundColor:"orange",
        color:'#fff',
        marginTop:50*s,
        marginLeft:"14%",
        borderRadius:20*s
    },
    TextStyle:{
      marginTop:20*s,
      marginRight:30*s,
      fontSize:30*s
    },
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


    picchoose:{
      height:0.05*height,
      paddingTop:0.01*height,
      paddingBottom:0.01*height,
      borderRadius:10,
      flexDirection:'row',
  },
  pictext:{
      width:0.3*width,
      height:0.04*height,
      color:'#555',
      fontSize:25*s,  
      textAlign:'center' ,
      textAlignVertical:'center', 
  },
  doiconpic:{
      width:0.1*width,
      height:0.04*height,
      textAlignVertical:'center',
      textAlign:'center',
      color:'#555'
  },
  iconpic:{
      width:0.15*width,
      textAlign:'center',
      height:0.04*height,
      textAlignVertical:'center',
      color:'#888'
  },
  picbox:{
      height:0.3*height,
      backgroundColor:'#fff',
      padding:0.01*width,
      width:1*width,
      transform: [{scale:0.98}],
      marginRight:'auto',
      marginLeft:'auto',
  },
  pics:{
      width:0.275*width,
      height:0.18*height,
      margin:0.007*width,
      transform: [{scale:0.95}],
  },
})
