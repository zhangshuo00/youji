import React, { Component } from 'react'
import {View, Text,Dimensions, Button,TextInput,StyleSheet,Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import { Actions } from 'react-native-router-flux';

const {height,width} = Dimensions.get('window');

// const alert = Modal.alert;
// const data = [{
//     url:'../images/DLW7@W5XOHV9D2ZN3OU1DY3.png',
//     id:'2121',
// }]

// const options = {
//     title: 'Select Avatar',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//       skipBackup: true,
//       path: 'images',
//     },
//   };
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
            email:'',
            usex:'',
            files:[],
            upassword:'',
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
            
          const source = { uri: response.uri };
          this.setState({
            avatarSource: source,
          });
        }
      });
    }

    // onSubmit(e){
    //     var filelist = [];
    //     this.state.files.map((item)=>{
    //         filelist.push(item.url);
    //     })
    //     console.log(filelist);
    //     const post={
    //         uid:localStorage.getItem('uid'),
    //         uname:document.getElementById('2').value,
    //         usex:document.getElementById('3').value,
    //         signature:document.getElementById('1').value,
    //         imgData:filelist[0],
    //     }
    //     console.log(post);
    //     fetch('/editPerInfo',{
    //         method:'POST',
    //         mode:'cors',
    //         headers: {'Content-Type': 'application/json'},
    //         body:JSON.stringify(post)
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         console.log(data);
    //         if(data.msg==='success' ){
    //             alert('保存成功','', [
    //             { text: '确定', onPress: () => console.log('cancel') },
    //             ])
    //         }
    //     })
    // }
    // state = {
    //     files: data,
    // }
    // onChange = (files, type, index) => {
    //     console.log(files, type, index);
    //     this.setState({
    //       files,
    //     });
    // }
    // onSegChange = (e) => {
    //     const index = e.nativeEvent.selectedSegmentIndex;
    //     this.setState({
    //       multiple: index === 1,
    //     });
    // }
    render(){
        const { files } = this.state;
        return(
            <View>
                <View style={{flexDirection:'row',backgroundColor:'rgb(250, 167, 85)',paddingTop:10,paddingBottom:10}}>
                    <TouchableOpacity style={styles.headIcon} onPress={()=>Actions.pop()}><Icon name='left' color={'white'} size={28}></Icon></TouchableOpacity>
                    <Text style={styles.headText}>编辑信息</Text>
                </View>
                <TouchableOpacity onPress={()=>{this.changeHead()}} style={styles.imag}>
                    <Image source={this.state.avatarSource} style={styles.img} />
                    <Text style={{color:'#72777b'}}>点击更改头像</Text>
                </TouchableOpacity>
                <View style={styles.inp}>
                    <TextInput style={styles.tinp} placeholder="做一份美食，看一场电影">签名 </TextInput>
                    <TextInput style={styles.tinp} placeholder="张三">昵称 </TextInput>
                    <TextInput style={styles.tinp} placeholder="男">性别 </TextInput>
                </View>
                <View style={styles.btw}>
                    <Button title="保存" color="#faa755" />
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
  headText:{
    flex:1,
    marginTop:20,
    textAlign:'center',
    color:'white'
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
      marginLeft:200
    },
    img:{
        width: 100,
        height: 100,
        borderRadius:55
    },
    inp:{
        marginTop:30,
        marginLeft:10
    },
    tinp:{
        fontSize:20
    },
    btw:{
        marginTop:30,
    }
})