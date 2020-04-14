import React, { Component } from 'react'
import {View, Text, Button,TextInput,StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';

// const alert = Modal.alert;
// const data = [{
//     url:'../images/DLW7@W5XOHV9D2ZN3OU1DY3.png',
//     id:'2121',
// }]

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

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
                <View style={{backgroundColor:'#faa755'}}>
                <Icon style={{
                            color:'#fff',
                            marginTop:20,
                            marginLeft:10                              
                            }} size={30} name="left"
                 / >
                <Text style={styles.top}>编辑信息</Text>
                </View>
                <View>
                    <Image source={this.state.avatarSource} style={styles.img} />
                    <Text>点击更改头像</Text>
                </View>
                <View style={styles.inp}>
                    <TextInput style={styles.tinp} type="text" placeholder="做一份美食，看一场电影">签名 </TextInput>
                    <TextInput style={styles.tinp} type="text" placeholder="张三">昵称 </TextInput>
                    <TextInput style={styles.tinp} type="text" placeholder="男">性别 </TextInput>
                </View>
                <View style={styles.btw}>
                    <Button title="保存" color="#faa755" />
                </View>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    top:{
        color:'#fff',
        fontSize:20,
        marginLeft:190,
        marginTop:-10
    },
    img:{
        width: 100,
        height: 100,
        borderRadius:55
    },
    inp:{
        marginTop:20,
    },
    tinp:{
        fontSize:20
    },
    btw:{
        marginTop:20
    }
})