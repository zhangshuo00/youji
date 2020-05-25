import React, { Component } from 'react'
import { Text, View, TextInput,Dimensions,StyleSheet,TouchableOpacity,Image,AsyncStorage,Alert} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
const options = {
    title: '选择来源',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'相册图片',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
export default class AddTag extends Component {
    constructor(){
        super();
        this.state = {
            datas:[],
            imageUrl:require('../images/setBack.png'),
            textInput:'',
        }
    }
    //获得本地存储的uri
    async  componentDidMount(){}
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
              const source1 = { uri: response.uri}
              const source  = 'data:image/jpeg;base64,' + response.data
              this.setState({
                  imageUrl: source1,
                  imgData:source,
              });
            }
          });
      }

      addTag=async()=>{
        // e.preventDefault();
        const post ={
          uid:await   AsyncStorage.getItem('uid').then(res=>res),
          tagName:this.state.textInput,
          imgData:this.state.imgData
        }	
        // console.log(post,'存储的数据');
        fetch('http://majia.hbsdduckhouse.club/addTag',{
          method:'POST',
          mode:'cors',
          headers: {'Content-Type': 'application/json'},
          body:JSON.stringify(post)
        })
        
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          if(data.msg == 'success' ){
            Alert.alert('保存成功','是否继续添加',
              [
                { text: '是', onPress: () => this.setState({}) },
                { text: '否', onPress: () => Actions.listSion()}
              ])
          }
        })  
      }

    render() {
        return (
            <View>
                <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.listSion()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                    <Text style={styles.headText}>添加标签</Text>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>{this.addTag()}}>
                        <Text style={{color:'white',fontSize:18}}>保存</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        marginTop:30*s
                    }}
                >
                    <Text style={styles.TextStyle}>标签名称</Text>
                    <TextInput 
                        placeholder='生活记录'
                        onChangeText={(text)=>{
                          this.setState({
                            textInput:text
                          })
                        }}
                        style={{
                            fontSize:30*s,
                            borderStyle: "solid",
                            width:400*s,height: 80*s,
                            padding: 0,
                            paddingLeft: 10,
                            borderColor:'grey',
                            borderWidth:1,
                            borderRadius:10,
                            backgroundColor:'#fff'
                            }}/>
                </View>
                <View>
                    <Text style={[styles.TextStyle,{marginLeft:'6%'}]}>设置生活封面</Text>
                    <TouchableOpacity onPress={()=>{this.takephoto()}} style={{marginLeft:110*s}}>
                    <Image   
                    source={this.state.imageUrl} 
                    style={{height:350*s,width:450*s,borderRadius:20*s,marginTop:20*s}}
                    ></Image>
                    <Button style={styles.ButtonStyle} onPress={this.addTag}>保存</Button>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles =StyleSheet.create({
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
})



