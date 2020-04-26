import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity,ImageBackground,ToastAndroid,response,StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';
import { regExp } from "../network/RegExp";
export default class Sign extends Component {
  //修改密码页
    constructor(props){
        super(props);
        this.state = {
            username:'',//密码
            uemail:props.uemail,//邮箱
            // uemail:'1062208122@qq.com',
            upassword:'',//密码
            issigning:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({upassword:text})
    }
    checkPassword1 = ()=>{
      if (regExp.Reg_PassWord.test(this.state.username)) {
        console.log('ok')
        //ToastAndroid.show('ok',100);

      }
      else {
        ToastAndroid.show('密码在8-14位',100);
      }
    }
    checkPassword2 = ()=>{
      if (regExp.Reg_PassWord.test(this.state.upassword)) {
        console.log('ok')
        //ToastAndroid.show('ok',100);

      }
      else {
        ToastAndroid.show('密码在8-14位',100);
      }
    }
    sign = ()=>{
        if(this.state.username!=this.state.upassword){
          ToastAndroid.show('密码不一致',100);
        }else{
          this.setState({issigning:true})

          const post ={
            uemail:this.state.uemail,
            upassword:this.state.upassword
          }
          console.log(post);

          fetch('http://majia.hbsdduckhouse.club/modifyPwd',{
            method:'POST',// 发起post请求
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(post)
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data);
            this.setState({issigning:false})
            Actions.login();
          })
        }
        
    } 
  render() {
    return (
      <ImageBackground 
      source={require("../../images/sign.jpg")} 
      style={{width: '100%', height: '100%'}}
  >
 
      <View style={{flex: 1,justifyContent: 'center'}}>
        <View
          style={{ alignItems: 'center'}}>
            
            <View
            style={styles.email}>

            <TextInput 
                onChangeText={this.userhandle}
                onBlur={this.checkPassword1}
                placeholder="新密码" 
                secureTextEntry={true}
            />
          </View>

          <View
            style={styles.email}>

            <TextInput placeholder="再次输入密码" 
                onChangeText={this.pwdhandle}
                onBlur={this.checkPassword2}
                secureTextEntry={true}
            />
          </View>


            <TouchableOpacity 
                style={styles.signp}
                onPress={this.sign}>
                <Text>修改密码</Text>
            </TouchableOpacity>

            
        </View>
        {
            this.state.issigning
            ?<View><Text>正在修改密码。。。</Text></View>
            :null
        }
      </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  email:{
    width: '70%',
    height: '10%',
    marginLeft: '5%',
    marginTop:'5%',
    lineHeight: 20,
    opacity: 0.5,
    borderRadius: 20,
    textAlign:'left',
    fontSize: 20,
    marginBottom: 10,
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
  },
  signp:{
    width: '65%',
    height: '9%',       
    marginLeft: '5%',
    backgroundColor: '#ccc',
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: "green",
    borderStyle: "solid",
    borderWidth: 1,
  }
  
});

