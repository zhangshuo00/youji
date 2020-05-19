import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'

Vue.use(VueAxios,axios);

axios.defaults.withCredentials = true;
axios.defaults.timeout = 1000 * 10; 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://majia.hbsdduckhouse.club/'

axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) =>{
  return Promise.reject(error);
});

export default axios;