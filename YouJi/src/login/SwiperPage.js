import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import Swiper from 'react-native-swiper';

export default class SwiperPage extends Component {
  start =  () => {
        AsyncStorage.setItem('isInstall','true',()=>{
            this.props.afterInstall();
        });
  };
  render() {
    return (
      <Swiper style={styles.wrapper} showsButtons={false}>
        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../images/sort-test1.jpg')}
          />

          <Text style={styles.text1}>做一份面包</Text>
          <Text style={styles.text2}>面包的制作流程和心得体会</Text>

          <TouchableOpacity style={styles.start}  onPress={this.start}>
            <Text style={{color: '#fff'}}>跳过</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../../images/sort-test2.jpg')}   
          />

          <Text style={styles.text1}>唯美的旅游胜地</Text>
          <Text style={styles.text2}>记录美好旅行回忆</Text>

          <TouchableOpacity style={styles.start}  onPress={this.start}>
            <Text style={{color: '#fff'}}>跳过</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.slide1} >
          <Image
            style={styles.img}
            source={require('../../images/2-191015104P02N.jpg')}
          />
          <Text style={styles.text1}>做最美的自己</Text>
          <Text style={styles.text2}>如何保养皮肤用合适的方法</Text>
          <TouchableOpacity style={styles.start}  onPress={this.start}>
            <Text style={{color: '#fff'}}>跳过</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.slide1}>
          <Image
            style={styles.img}
            source={require('../../images/tagsImgTest.jpg')}
          />
          <Text style={styles.text1}>视觉享受</Text>
          <Text style={styles.text2}>看，你又添加了一批想看的电影,快一睹精彩</Text>
          <TouchableOpacity style={styles.start}  onPress={this.start}>
            <Text style={{color: '#fff'}}>跳过</Text>
          </TouchableOpacity>
        </View>


      </Swiper>
    );
  }
}
const styles = StyleSheet.create({
  img: {
    width: '80%',
    height: '30%',
    marginTop:'30%'
  },
  slide1: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
  },
  start: {
      position: 'absolute',
    bottom: 150,
    width: 220,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderRadius: 20,
  },
  wrapper:{
    backgroundColor:'#0e1d2d',
  },
  text1:{
    fontSize:30,
    marginTop:'10%',
    color:'white'
  },
  text2:{
    fontSize:20,
    marginTop:'5%',
    color:'white'
  },
});
