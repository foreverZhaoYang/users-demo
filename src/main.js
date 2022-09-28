import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
//倒入element-ui
import ElementUi from 'element-ui'
//倒入element-ui样式表
import 'element-ui/lib/theme-chalk/index.css';
import {Loading} from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUi)

axios.defaults.baseURL= 'http://localhost:3000'
Vue.prototype.$http=axios

let loadingInstance=null;
axios.interceptors.request.use(config=>{
  loadingInstance=Loading.service({fullscreen:true})
  return config;
})

axios.interceptors.response.use(response=>{
  loadingInstance.close()
  return response;
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
