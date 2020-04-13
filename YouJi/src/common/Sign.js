import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity,ImageBackground,StyleSheet } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils'
export default class Sign extends Component {
  //注册页
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            issigning:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    sign = ()=>{
        this.setState({issigning:true})
        myFetch.post('/sign',{
            username:this.state.username,
            pwd:this.state.pwd}
        ).then(res=>{
            AsyncStorage.setItem('usersign',JSON.stringify(res.data))
                .then(()=>{
                    console.log(JSON.stringify(res.data))
                    this.setState({issigning:false})
                    Actions.login();
                })
        })
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
                onChangeText={this.pwdhandle}
                placeholder="昵称" 
                secureTextEntry={true}
            />
          </View>

          <View
            style={styles.email}>

            <TextInput placeholder="Email" 
                onChangeText={this.userhandle}
            />
          </View>
          <View
            style={styles.email}>

            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="密码" 
                secureTextEntry={true}
            />
          </View>


            <TouchableOpacity 
                style={styles.signp}
                onPress={this.sign}>
                <Text>注册</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{

                    marginTop: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={()=>Actions.login()}>
                <Text>已有账户，点击登陆</Text>
            </TouchableOpacity>
        </View>
        {
            this.state.issigning
            ?<View><Text>正在注册。。。</Text></View>
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