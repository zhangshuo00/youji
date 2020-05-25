import React, { Component } from 'react'
import {View, Text,Dimensions, Button,TextInput,StyleSheet,Image, TouchableOpacity,AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
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
    
export default class Edit extends Component{
    constructor(){
        super();
        this.state = {
            uid:'',
            uname:'', //昵称
            signature:'', //签名
            usex:'',
            imgData:'',
            imageUrl:require('../images/setBack.png'),
        }
    }

    changeHead=()=>{
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
    
    // handwrite = (text) => {
    //   this.setState({signature:text})
    // }
    // nickname = (text) => {
    //   this.setState({uname:text})
    // }
    // sexhandle = (text) => {
    //   this.setState({usex:text})
    // }

    save = async() => {
      const post={
          uid:await   AsyncStorage.getItem('uid').then(res=>res),
          uname:this.state.uname,
          usex:this.state.usex,
          signature:this.state.signature,
          imgData:this.state.imgData
      }
      console.log(post);
      fetch('http://majia.hbsdduckhouse.club/editPerInfo',{
            method:'POST',
            mode:'cors',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.msg === 'success' ){
                alert('保存成功~\(≥▽≤)/~','', [
                { text: '确定', onPress: () => console.log('cancel') },
                ])
            }
        })
    }
    
    render(){
        return(
            <View style={{backgroundColor:'#fff',height:'100%'}}>
                <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={22}></Icon></TouchableOpacity>
                    <Text style={styles.headText}>编辑信息</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.changeHead()}} style={styles.imag}>
                    <Image source={this.state.imageUrl}  style={styles.img} />
                    <Text style={{color:'#72777b'}}>点击更改头像</Text>
                </TouchableOpacity>
                {/* <View style={styles.inp}>
                    <TextInput onChangeText={this.handwrite} style={styles.tinp} placeholder="做一份美食，看一场电影">签名： </TextInput>
                    <TextInput onChangeText={this.nickname} style={styles.tinp} placeholder="张三">昵称： </TextInput>
                    <TextInput onChangeText={this.sexhandle} style={styles.tinp} placeholder="男">性别： </TextInput>
                </View> */}
                <View style={{flexDirection:'row',marginTop:30}}>
                    <Text style={{marginTop:5*s,marginLeft:0.05*width,marginRight:10*s,fontSize:30*s}}>签名:</Text>
                    <TextInput placeholder='做一份美食，看一场电影' placeholderTextColor='grey'
                        onChangeText={(text)=>{
                          this.setState({
                            signature:text
                          })
                        }}
                        style={{
                            fontSize:25*s,
                            width:400*s,
                            padding: 0,
                            paddingLeft: 10,
                            marginLeft:width*0.05,
                            marginTop:3,
                            borderRadius:10,
                            }}/>
                </View>
                <View style={{flexDirection:'row',marginTop:30}}>
                    <Text style={{marginTop:5*s,marginLeft:0.05*width,marginRight:10*s,fontSize:30*s}}>昵称:</Text>
                    <TextInput placeholder='张三' placeholderTextColor='grey'
                        onChangeText={(text)=>{
                          this.setState({
                            uname:text
                          })
                        }}
                        style={{
                            fontSize:25*s,
                            width:400*s,
                            padding: 0,
                            paddingLeft: 10,
                            marginLeft:width*0.05,
                            marginTop:3,
                            borderRadius:10,
                            }}/>
                </View>
                <View style={{flexDirection:'row',marginTop:30}}>
                    <Text style={{marginTop:5*s,marginLeft:0.05*width,marginRight:10*s,fontSize:30*s}}>性别:</Text>
                    <TextInput placeholder='男' placeholderTextColor='grey'
                        onChangeText={(text)=>{
                          this.setState({
                            usex:text
                          })
                        }}
                        style={{
                            fontSize:25*s,
                            width:400*s,
                            padding: 0,
                            paddingLeft: 10,
                            marginLeft:width*0.05,
                            marginTop:3,
                            borderRadius:10,
                            }}/>
                </View>
                <TouchableOpacity 
                  style={styles.btw}
                  onPress={this.save}>
                    <Text style={{color:'white',fontSize:20}}>保存</Text>
                </TouchableOpacity> 
                <TouchableOpacity 
                  style={styles.pwd}
                  onPress={()=>Actions.test()}
                  >
                  <Text style={{color:'#8a8c8e',fontSize:16}}>修改密码|д･)っ</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
  headText:{
    flex:1,
    // marginTop:20,
    textAlign:'center',
    color:'white',
    fontSize:20,
    paddingRight:'5%'
  },
  headIcon:{
      marginLeft:10,
  },
    // top:{
    //     color:'#fff',
    //     fontSize:20,
    //     marginLeft:190,
    //     marginTop:-10
    // },
    imag:{
      borderWidth:1,
      borderRadius:55,
      borderColor:'#d3d7d4',
      width:100,
      height:100,
      marginTop:20,
      marginLeft:200,
      marginBottom:10
    },
    img:{
        width: 100,
        height: 100,
        borderRadius:55
    },
    inp:{
        marginTop:30,
        marginLeft:10,
        marginRight:10
    },
    tinp:{
        fontSize:20,
        borderWidth: 1,
        borderColor:'#d3d7d4',
        borderStyle: "solid",
        marginTop:5
    },
    btw:{
        width:'50%',
        height: 50, 
        marginLeft: '25%',
        marginTop:30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"#faa755",
        borderRadius: 25,
    },
    pwd:{
      color:'#d3d7d4',
      marginLeft: '42%',
      marginTop:260
    }
})
