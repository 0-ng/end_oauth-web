import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

// Vue.config.productionTip = false;

Vue.use(ElementUI);

// 使用axios
axios.defaults.baseURL = '/api' // 默认每次请求都会自动在前面加上/api
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// Vue.use(axios)
// // 这里申明一个全局，接下来配置/config/index.js设置下请求地址和跨域等
Vue.prototype.$axios = axios
// // axios.defaults.withCredentials = true // 设置axios每次请求带上cookies

new Vue({
	el: '#app',
	router,
	// store,
	template: '<App/>',
	components: { App }
})
