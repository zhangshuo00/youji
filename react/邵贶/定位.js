/*react native定位时请求开启位置权限

react native 在使用 Geolocation 定位获取经纬度的时候w，如果用户不开启位置信息，不打开gps,则会报错，所以一开始应该判断用户有没有开启位置信息，如果没有的话请求用户打开位置信息
我在android react-native-android-location-services-dialog-box这个组件
React Native Android Location Services Dialog Box
https://github.com/webyonet/react-native-android-location-services-dialog-box

配置：
1.yarn add react-native-android-location-services-dialog-box

2.react-native link react-native-android-location-services-dialog-box

3.android/settings.gradle

include ':react-native-android-location-services-dialog-box'
project(':react-native-android-location-services-dialog-box').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-android-location-services-dialog-box/android')
1
2
4.android/app/build.gradle

dependencies {
   ...
   compile project(':react-native-android-location-services-dialog-box')
}
*/

import LocationServicesDialogBox from "react-native-android-location-services-dialog-box"
// 如果要获取经纬度的话还需要引入Geolocation

import Geolocation from 'Geolocation'

 componentDidMount() {
        this.getLocation()
    }



  getLocation(){
          LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: "<h2>开启位置服务</h2>开启位置服务，获取精准定位<br/><a href='#'>了解更多</a>",
            ok: "去开启",
            cancel: "取消",
            enableHighAccuracy: true, 
            showDialog: true, 
            openLocationServices: true, 
            preventOutSideTouch: false, 
            preventBackClick: false, 
            providerListener: true 
        }).then(function(success) {
         
                Geolocation.getCurrentPosition((location) => {
                    let coordinate = [location.coords.longitude,location.coords.latitude]
                    this.props.saveLocation(coordinate);
                    this.setState({
                        currentLocation:coordinate
                    })
              });
            }.bind(this)
        ).catch((error) => {
            console.log(error.message);
        });
        DeviceEventEmitter.addListener('locationProviderStatusChange', function(status) { 
            console.log(status); 
        });
     }