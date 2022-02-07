import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store/'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false;

Vue.use(ElementUI);
axios.baseUrl = "http://127.0.0.1:8000/"

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
