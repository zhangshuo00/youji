import React, { Component } from 'react'
import { Text, View, TextInput,Dimensions,StyleSheet,TouchableOpacity,Image,AsyncStorage} from 'react-native'
import ImagePicker from 'react-native-image-picker';
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
            imageUrl:""
        }
    }
    //获得本地存储的uri
    componentDidMount(){
        // AsyncStorage.clear()
        AsyncStorage.getItem('im')
        .then((res)=>{
            if(res==null){
                this.setState({
                    imageUrl: require('../images/kouhong.jpg')
                  })
            }else{
                console.log(res)
                this.setState({
                    imageUrl: { uri: res }
                  })
            }
        })
    }
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
              const source = { uri: response.uri };
              AsyncStorage.setItem('im',response.uri)
              this.setState({
                imageUrl: source
              });
            }
          });
      }

    set(){
        console.log('未实现保存该功能')
    }

    render() {
        return (
            <View>
                <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                    <Text style={styles.headText}>添加标签</Text>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>{this.set()}}>
                        <Text style={{color:'white',fontSize:18}}>保存</Text>
                    </TouchableOpacity>
                 </View>
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        marginTop:20*s
                    }}
                >
                    <Text style={styles.TextStyle}>标签名称</Text>
                    <TextInput 
                        placeholder='生活记录'
                        style={{
                            fontSize:30*s,
                            marginTop:10,
                            borderStyle: "solid",
                            width:400*s,height:50*s,
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
